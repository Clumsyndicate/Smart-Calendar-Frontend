import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AllDayPanel,
  Toolbar,
  DragDropProvider,
  EditRecurrenceMenu,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import appointments from './demo-data/today-appointments';


const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      // backgroundColor: '#FF7043',
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      borderRadius: '16px',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }}
  >
    {children}
  </Appointments.Appointment>
);

// const style = theme => ({
//   todayCell: {
//     backgroundColor: fade(theme.palette.primary.main, 0.1),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.primary.main, 0.14),
//     },
//     '&:focus': {
//       backgroundColor: fade(theme.palette.primary.main, 0.16),
//     },
//   },
//   weekendCell: {
//     backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
//     },
//     '&:focus': {
//       backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
//     },
//   },
//   today: {
//     backgroundColor: fade(theme.palette.primary.main, 0.16),
//   },
//   weekend: {
//     backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
//   },
// });

// const TimeTableCellBase = ({ classes, ...restProps }) => {
//   const { startDate } = restProps;
//   const date = new Date(startDate);
//   if (date.getDate() === new Date().getDate()) {
//     return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
//   } if (date.getDay() === 0 || date.getDay() === 6) {
//     return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
//   } return <WeekView.TimeTableCell {...restProps} />;
// };

// const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);

// const DayScaleCellBase = ({ classes, ...restProps }) => {
//   const { startDate, today } = restProps;
//   if (today) {
//     return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
//   } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
//     return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
//   } return <WeekView.DayScaleCell {...restProps} />;
// };

// const DayScaleCell = withStyles(style, { name: 'DayScaleCell' })(DayScaleCellBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      // data: appointment,
      // currentDate: '2018-05-25',
    };

    this.commitChanges = this.commitChanges.bind(this);
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
    const { currentDate, data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={1660}
        >
          <ViewState 
            currentDate={currentDate}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            // timeTableCellComponent={TimeTableCell} // the cell of the verti-timetable
            // dayScaleCellComponent={DayScaleCell} // the headline cell
          />
          <DayView
            startDayHour={7}
            endDayHour={19}
            intervalCount={1}
          />
          <MonthView />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments
            appointmentComponent={Appointment}
          />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <AppointmentForm />
          <AllDayPanel />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <TodayButton />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
