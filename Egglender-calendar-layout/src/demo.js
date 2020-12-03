import * as React from 'react';
import moment from 'moment';
import timeZoneUtils from "devextreme/time_zone_utils";
import SelectBox from 'devextreme-react/select-box';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  DayView,
  WeekView,
  MonthView,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  AllDayPanel,
  Toolbar,
  TodayButton,
  ViewSwitcher,
  EditRecurrenceMenu,
  DragDropProvider,} from '@devexpress/dx-react-scheduler';
import { data, resourcesData, Design, locations} from './data';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
  },
});
const TimeTableCellBase = ({ classes, ...restProps }) => {
  const { startDate } = restProps;
  const date = new Date(startDate);
  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
  } 
  if (date.getDay() === 0 || date.getDay() === 6) {
    return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
  } 
  return <WeekView.TimeTableCell {...restProps} />;
};
const DayScaleCellBase = ({ classes, ...restProps }) => {
  const { startDate } = restProps;
  const date = new Date(startDate);
  if (date.getDate() === new Date().getDate()) {
    return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
  } 
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
  }
  return <WeekView.DayScaleCell {...restProps} />;
};
const AllDayCellBase = ({ classes, ...restProps }) => {
  const { startDate } = restProps;
  const date = new Date(startDate);
  if (date.getDate() === new Date().getDate()) {
    return <AllDayPanel.Cell {...restProps} className={classes.today} />;
  } 
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <AllDayPanel.Cell {...restProps} className={classes.weekend} />;
  } 
  return <AllDayPanel.Cell {...restProps} />;
};
const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);
const DayScaleCell = withStyles(style, { name: 'DayScaleCell' })(DayScaleCellBase);
const AllDayCell = withStyles(style, { name: 'AllDayCell'})(AllDayCellBase);

// var dateDisplay = moment().format("[【]dddd[,] MMM Do[】]").toString();

const currentDate = new Date(
  moment().format("YYYY"),
  moment().format("MM")-1,
  moment().format("DD")
);

function getLocations(date) {
  const timeZones = timeZoneUtils.getTimeZones(date);
  return timeZones.filter((timeZone) => {
    return locations.indexOf(timeZone.id) !== -1;
  });
}

const demoLocations = getLocations(currentDate);




export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      resources: [
        {
          fieldName: 'roomId',
          title: 'Room',
          instances: resourcesData,
        },
      ],
      timeZone: demoLocations[0].id,
      demoLocations: demoLocations
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.onValueChanged = this.onValueChanged.bind(this);
    this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
    this.onOptionChanged = this.onOptionChanged.bind(this);
  }

  onValueChanged(e) {
    this.setState({
      timeZone: e.value
    });
  }

  onAppointmentFormOpening(e) {
    const form = e.form;

    const startDateTimezoneEditor = form.getEditor('startDateTimeZone');
    const endDateTimezoneEditor = form.getEditor('endDateTimeZone');
    const startDateDataSource = startDateTimezoneEditor.option('dataSource');
    const endDateDataSource = endDateTimezoneEditor.option('dataSource');

    startDateDataSource.filter(['id', 'contains', 'Europe']);
    endDateDataSource.filter(['id', 'contains', 'Europe']);

    startDateDataSource.load();
    endDateDataSource.load();
  }

  onOptionChanged(e) {
    if(e.name === 'currentDate') {
      this.setState({
        demoLocations: getLocations(e.value)
      });
    }
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { timeZone, data, resources } = this.state;

    return (
      <React.Fragment>
          <div className="option">
            <span>「 Current Time Zone 」</span>
            <SelectBox
              items={demoLocations}
              displayExpr="title"
              valueExpr="id"
              width={240}
              value={timeZone}
              onValueChanged={this.onValueChanged}
            />
          </div>

        <Paper>
        <Scheduler
          data={data}
          height={600}
          timeZone={timeZone}
          onAppointmentFormOpening={this.onAppointmentFormOpening}
          onOptionChanged={this.onOptionChanged}
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <EditRecurrenceMenu />

          <WeekView
            startDayHour={7}
            endDayHour={19}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />

          <MonthView />
          
          <DayView
            startDayHour={7}
            endDayHour={19}
            intervalCount={1}
          />
          <Appointments 
            appointmentComponent={ Design }
          />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <AppointmentForm />

          <Resources
            data={resources}
            mainResourceName="roomId"
          />
          <AllDayPanel 
            cellComponent={AllDayCell}
          />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <TodayButton />
          <DragDropProvider />

        </Scheduler>
        </Paper>

      </React.Fragment>


      
    );
  }
}
