import React from 'react';
import moment from "moment";
import Scheduler, { Editing } from 'devextreme-react/scheduler';
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';
import List, { ItemDragging } from 'devextreme-react/list';
import { events } from './events.js';

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
      demoLocations: demoLocations,
      //for list
      deleteType: 'slideItem',
      selectedItems: [],
    };
    this.onValueChanged = this.onValueChanged.bind(this);
    this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
    this.onOptionChanged = this.onOptionChanged.bind(this);
    //for list
    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this);
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

// for list
  onSelectedItemsChange(args) {
    if(args.name === 'selectedItems') {
      this.setState({
        selectedItems: args.value
      });
    }
  }


  render() {
    const { timeZone, demoLocations } = this.state;
    return (
      <React.Fragment>

        <div class="aParent">

          <div className="calendar-layout">
            <div className="option">
              <span className="caption">{txt} 「 Time Zone 」:</span>
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
              startDayHour={0}
              defaultCurrentDate={currentDate}
              timeZone={timeZone}
              height={800}
              onAppointmentFormOpening={this.onAppointmentFormOpening}
              onOptionChanged={this.onOptionChanged}
            >
              <Editing
                allowTimeZoneEditing={true}
              />
            </Scheduler>
          </div>

          <div className="widget-container">
            <div className="header">
              <span className="caption">Upcoming Dues !!! </span>
              <div>( You could slide to delete or drag to change priority !) </div>
            </div>

            <List
              items={events}
              height={600}
              allowItemDeleting={true}
              itemDeleteMode={this.state.deleteType}
              showSelectionControls={true}
              selectionMode="multiple"
              selectedItems={this.state.selectedItems}
              onOptionChanged={this.onSelectedItemsChange}>
            </List>

            <div className="selected-data">
              <span className="caption">Completed Tasks: </span>
              <span>{this.state.selectedItems.join(', ')}</span>
            </div>

          </div>

        </div>

      </React.Fragment>
    );
  }
}



export default App;
