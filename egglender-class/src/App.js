import React from 'react';
import moment from "moment";
import Scheduler, { Editing } from 'devextreme-react/scheduler';
import SelectBox from 'devextreme-react/select-box';

import { data, locations } from './data.js';
import timeZoneUtils from 'devextreme/time_zone_utils';

const currentDate = new Date(moment().format("YYYY"), parseInt(moment().format("MM")) -1,  moment().format('DD'));
var txt = new String(moment().format("ddd MMM DD"));

const views = ['week', 'month', 'day'];


function getLocations(date) {
  const timeZones = timeZoneUtils.getTimeZones(date);
  return timeZones.filter((timeZone) => {
    return locations.indexOf(timeZone.id) !== -1;
  });
}

const demoLocations = getLocations(currentDate);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZone: demoLocations[0].id,
      demoLocations: demoLocations
    };
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


  render() {
    const { timeZone, demoLocations } = this.state;
    return (
      <React.Fragment>
        <div className="option">

        
          <span>{txt}</span>

          <span>Time Zone:</span>
          <SelectBox
            items={demoLocations}
            displayExpr="title"
            valueExpr="id"
            width={240}
            value={timeZone}
            onValueChanged={this.onValueChanged}
          />
        </div>
        <Scheduler
          dataSource={data}
          views={views}
          defaultCurrentView="week"
          startDayHour={8}
          defaultCurrentDate={currentDate}
          timeZone={timeZone}
          height={600}
          onAppointmentFormOpening={this.onAppointmentFormOpening}
          onOptionChanged={this.onOptionChanged}
        >
          <Editing
            allowTimeZoneEditing={true}
          />
        </Scheduler>
      </React.Fragment>
    );
  }
}



export default App;
