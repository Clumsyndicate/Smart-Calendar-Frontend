import React from 'react';
import axios from 'axios';
import moment from "moment";
import Button from './button.js'
import { events } from './events.js';
import { data, locations } from './data.js';
import { Switch } from 'devextreme-react/switch';
import SelectBox from 'devextreme-react/select-box';
import timeZoneUtils from 'devextreme/time_zone_utils';
import { NumberBox } from 'devextreme-react/number-box';
import List, { ItemDragging } from 'devextreme-react/list';
import Scheduler, { Editing, Resource } from 'devextreme-react/scheduler';

const currentDate = new Date(moment().format("YYYY"), parseInt(moment().format("MM")) -1,  moment().format('DD'));
var txt = moment().format("ddd[,] MMM DD").toString();
const views = ['day', 'week', 'month', 'agenda'];
const demoLocations = getLocations(currentDate);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZone: demoLocations[0].id,
      demoLocations: demoLocations,
      showCurrentTimeIndicator: true,
      shadeUntilCurrentTime: true,
      updateInterval: 10,
      //for list
      deleteType: 'slideItem',
      searchMode: 'contains',
      events,
    };
    this.onValueChanged = this.onValueChanged.bind(this);
    this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
    this.onOptionChanged = this.onOptionChanged.bind(this);
    this.onShowCurrentTimeIndicatorChanged = this.onShowCurrentTimeIndicatorChanged.bind(this);
    this.onShadeUntilCurrentTimeChanged = this.onShadeUntilCurrentTimeChanged.bind(this);
    this.onUpdateIntervalChanged = this.onUpdateIntervalChanged.bind(this);
    this.onContentReady = this.onContentReady.bind(this);
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
        `https://5fc7ab11f3c77600165d8a61.mockapi.io/text`
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
        `https://5fc7ab11f3c77600165d8a61.mockapi.io/text`
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

  onShowCurrentTimeIndicatorChanged(e) {
    this.setState({ showCurrentTimeIndicator: e.value });
  }

  onShadeUntilCurrentTimeChanged(e) {
    this.setState({ shadeUntilCurrentTime: e.value });
  }

  onUpdateIntervalChanged(args) {
    this.setState({ updateInterval: args.value });
  }

  onContentReady(e) {
    const currentHour = new Date().getHours() - 1;
    e.component.scrollToTime(currentHour, 30, new Date());
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
              showCurrentTimeIndicator={this.state.showCurrentTimeIndicator}
              showAllDayPanel={true}
              shadeUntilCurrentTime={this.state.shadeUntilCurrentTime}
              startDayHour={0}
              shadeUntilCurrentTime={true}
              defaultCurrentDate={currentDate}
              timeZone={timeZone}
              showCurrentTimeIndicator={true}
              height={680}
              onContentReady={this.onContentReady}
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
              height={680}
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

function getLocations(date) {
  const tz = [
     {
        offset: -8,
        title: "Pacific Time (GMT -08:00) America - Los Angeles",
        id: "America/Los Angeles"
     },
     {
      offset: -6,
      title: "Central Standard Time (GMT -06:00) America - Chicago",
      id: "America/Chicago"
     },
     {
      offset: -5,
      title: "Eastern Time (GMT -05:00) America - New York",
      id: "America/New_York"
     },
     {
      offset: 0,
      title: "Greenwich Mean Time (GMT +00:00) Europe - London",
      id: "Europe/London"
     },
    {
        offset: 8,
        title: "China Standard Time (GMT +08:00) Asia - Shanghai",
        id: "Asia/Shanghai"
     },
     {
      offset: 5.5,
      title: "India Standard Time (GMT +05:30) Asia - Kolkata",
      id: "Asia/Kolkata"
     }
  ]
  return tz;
}

function ItemTemplate(data) {
  return <div>{data.text}</div>;
}