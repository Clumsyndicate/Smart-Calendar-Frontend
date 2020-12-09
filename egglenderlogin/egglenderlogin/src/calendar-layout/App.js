import React from 'react';
import moment from "moment";
import Scheduler, { Editing } from 'devextreme-react/scheduler';
import SelectBox from 'devextreme-react/select-box';
import List, { ItemDragging } from 'devextreme-react/list';
import { events } from './events.js';
import { data, locations } from './data.js';
import timeZoneUtils from 'devextreme/time_zone_utils';
import Button from './button.js'

import axios from 'axios';

const currentDate = new Date(moment().format("YYYY"), parseInt(moment().format("MM")) -1,  moment().format('DD'));
var txt = moment().format("ddd[,] MMM DD").toString();

const views = ['day', 'week', 'agenda', 'month'];

function getLocations(date) {
  const tz = [
     {
        offset: -8,
        title: "Pacific Time (GMT -08:00) America - Los Angeles",
        id: "America/Godthab"
     },
     {
      offset: -6,
      title: "Central Standard Time (GMT -06:00) America - Chicago",
      id: "Atlantic/Azores"
     },
     {
      offset: -5,
      title: "Eastern Time (GMT -05:00) America - New_York",
      id: "Portugal"
     },
     {
      offset: 0,
      title: "Greenwich Mean Time (GMT +00:00) Europe - London",
      id: "Antarctica/Vostok"
     },
    {
        offset: 8,
        title: "China Standard Time (GMT +08:00) Asia - Shanghai",
        id: "Antarctica/McMurdo"
     },
     {
      offset: 5.5,
      title: "India Standard Time (GMT +05:30) Asia - Kolkata",
      id: "Australia/Yancowinna"
     }
  ]
  return tz;
}

const demoLocations = getLocations(currentDate);

function ItemTemplate(data) {
  return <div>{data.text}</div>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZone: demoLocations[0].id,
      demoLocations: demoLocations,
      //for list
      deleteType: 'slideItem',
      searchMode: 'contains',
      events,
    };
    this.onValueChanged = this.onValueChanged.bind(this);
    this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
    this.onOptionChanged = this.onOptionChanged.bind(this);
    //for list
    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onReorder = this.onReorder.bind(this);
  }

  state = {
    loading: true,
    error: "",
    datab: null,
    eventsb: null,
  };

  loadCal = () => {
    this.setState({ loading: true });
    return axios
      .get(
        `https://5fc9fe933c1c22001644175c.mockapi.io/events`
      )
      .then(result => {
        console.log(result);
        this.setState({
          datab: result.data,
          loading: false,
          error: false
        });
      })
      .catch(error => {
        console.error("error: ", error);
        this.setState({
          // objects cannot be used as a react child
          // -> <p>{error}</p> would throw otherwise
          error: `${error}`,
          loading: false
        });
      });
  };

  loadList = () => {
    this.setState({ loading: true });
    return axios
      .get(
        `https://5fc9fe933c1c22001644175c.mockapi.io/events`
      )
      .then(result => {
        console.log(result.data.text);
        this.setState({
          eventsb: result.data,
          loading: false,
          error: false
        });
      })
      .catch(error => {
        console.error("error: ", error);
        this.setState({
          error: `${error}`,
          loading: false
        });
      });
  };

  componentDidMount() {
    this.loadCal();
    this.loadList();
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
  onDragStart(e) {
    e.itemData = 
    this.state[e.fromData][e.fromIndex];
  }
  onAdd(e) {
    const tasks = this.state[e.toData];
    this.setState({
      [e.toData]: [...tasks.slice(0, e.toIndex), e.itemData, ...tasks.slice(e.toIndex)]
    });
  }
  onRemove(e) {
    const tasks = this.state[e.fromData];
    this.setState({
      [e.fromData]: [...tasks.slice(0, e.fromIndex), ...tasks.slice(e.fromIndex + 1)]
    });
  }
  onReorder(e) {
    this.onRemove(e);
    this.onAdd(e);
  }

  render() {
    const { timeZone, demoLocations, eventsb, loading, error, datab } = this.state;
    return (
      
      <React.Fragment>
        <div className="Title">MY EGGLENDAR</div>
        <div class="aParent">
          <div className="calendar-layout">
            <div className="option">
              <span className="caption">{txt} 「 Time Zone 」</span>
              <SelectBox
                className="selector"
                items={demoLocations}
                displayExpr="title"
                valueExpr="id"
                width={240}
                value={timeZone}
                onValueChanged={this.onValueChanged}
              />
              <span className="button"><Button /></span>
            </div>
            <Scheduler
              dataSource={datab}
              views={views}
              defaultCurrentView="week"
              startDayHour={0}
              defaultCurrentDate={currentDate}
              timeZone={timeZone}
              height={800}
              onAppointmentFormOpening={this.onAppointmentFormOpening}
              onOptionChanged={this.onOptionChanged}>
              <Editing
                allowTimeZoneEditing={true}
              />
            </Scheduler>
          </div>

          <div className="widget-container">

            <div className="header">
              <span className="caption">Upcoming Events !!! </span>
              <div className="sideNote">( Slide left to delete, or drag to change 
               priority, or just put a check in the box !)</div>
            </div>

            <List
              dataSource={eventsb}
              // items={events}
              height={800}
              keyExpr="id"
              repaintChangesOnly={true}
              allowItemDeleting={true}
              itemDeleteMode={this.state.deleteType}
              showSelectionControls={true}
              selectionMode="multiple"
              onOptionChanged={this.onSelectedItemsChange}
              itemRender={ItemTemplate}
              searchExpr="text"
              searchEnabled={true}
              searchMode={this.state.searchMode}>
              <ItemDragging
                allowReordering={true}
                data="eventsb"
                onDragStart={this.onDragStart}
                onAdd={this.onAdd}
                onRemove={this.onRemove}
                onReorder={this.onReorder}>
              </ItemDragging>
            </List>
          </div>

        </div>

      </React.Fragment>
    );
  }
}



export default App;
