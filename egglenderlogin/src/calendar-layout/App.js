import React from 'react';
import axios from 'axios';
import moment from "moment";
import Scheduler, { Editing } from 'devextreme-react/scheduler';
import SelectBox from 'devextreme-react/select-box';
import List, { ItemDragging } from 'devextreme-react/list';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import ButtonUpload from './button.js'
import Button from "@material-ui/core/Button";

const currentDate = new Date(moment().format("YYYY"), parseInt(moment().format("MM")) -1,  moment().format('DD'));
const txt = moment().format("ddd[,] MMM DD").toString();
const views = ['day', 'week', 'agenda', 'month'];
const demoLocations = getLocations();

function getLocations() {
  var zone = new Date().toTimeString().slice(9);
  var name = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tz = [
    {
      offset: -8,
      title: "Browser timezone: " + name + " " +zone,
      id: name
    }, 
    {
        offset: -8,
        title: "Pacific Time (GMT -08:00) America - Los Angeles",
        id: "America/Los_Angeles"
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datab: null,

      token: props.token,
      timeZone: demoLocations[0].id,
      demoLocations: demoLocations,
      showCurrentTimeIndicator: true,
      shadeUntilCurrentTime: true,
      updateInterval: 10,
      //for list
      deleteType: 'slideItem',
      searchMode: 'contains',
    };
    this.componentDidMount = this.componentDidMount.bind(this);

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
    this.onChange = this.onChange.bind(this);
  }

  // state = {
  //   // loading: true,
  //   // error: "",
  //   datab: null,
  // };

  // loadCal = () => {
  //   this.setState({ loading: true });
  //   return axios
  //     .get(
  //       '/api/getschedule',{
  //         headers: {
  //         "x-access-token": this.props.token
  //         }
  //       }
  //     )
  //     .then(result => {
  //       console.log(result);
  //       this.setState({
  //         datab: result.data,
  //         loading: false,
  //         error: false
  //       });
  //     })
  //     .catch(error => {
  //       console.log('get some error')
  //       console.error("error: ", error);
  //       this.setState({
  //         error: `${error}`,
  //         loading: false
  //       });
  //     });
  // };

  componentDidMount() {
    // this.loadCal();
    axios
    .get(
      '/api/getschedule',
      {
        headers: {
        "x-access-token": this.props.token
        }
      })
    .then(result => {
        console.log(result);
        this.setState({
          datab: result.data
        });
      })
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
        selectedItemKeys: args.value
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

// for search box and add button
  onChange(e, config, data) {
    console.log('reach change calendar')
    var temp ={ "id": this.state.datab.length+1, 
                "startDate": e.startDate, 
                "endDate": e.endDate, 
                "location": e.location, 
                "recurrenceRule": e.recurrenceRule,
                "text": e.text,
              };
              console.log(temp);
              data.push(temp);
    try {
      console.log('reachchange');
      const response = axios.post('/api/setschedule', data, config);
      console.log('👉 Returned data:', response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  render() {
    const config = {
        headers: { "x-access-token": this.props.token }
    };
    const { timeZone, demoLocations, datab } = this.state;
    
    const classList = [
      { "id": "1",
        "startDate": "Thu Oct 01 2020 15:00:00 GMT-0700 (PST)",
        "endDate": "Thu Oct 01 2020 15:50:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-MATH33A-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201220T234500Z;BYDAY=MO,WE,FR",
        "text": "Math 32B LEC 1 (Online - Recorded)"
      },
      { "id": "2",
        "startDate": "Fri Dec 02 2020 09:00:00 GMT-0700 (PST)",
        "endDate": "Fri Dec 02 2020 09:50:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-PHYSCI5-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201221T234500Z;BYDAY=MO,WE,FR",
        "text": "PHYSICS 1B LEC 1 (Online - Recorded)"
      },
      {
        "id": "3",
        "startDate": "Mon Oct 05 2020 10:00:00 GMT-0700 (PST)",
        "endDate": "Mon Oct 05 2020 11:50:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-COMSCI180-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201221T234500Z;BYDAY=MO,WE",
        "text": "COM SCI 180 LEC 1 (Online - Recorded)"
      },
      {
        "id": "4",
        "startDate": "Tue Oct 06 2020 13:00:00 GMT-0700 (PST)",
        "endDate": "Tue Oct 06 2020 13:50:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-COMSCI180-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201221T234500Z;BYDAY=TU,TH",
        "text": "EPS 3 LEC 1 (Online - Recorded)"
      },
      {
        "id": "5",
        "startDate": "Tue Oct 06 2020 17:00:00 GMT-0700 (PST)",
        "endDate": "Tue Oct 06 2020 18:15:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-COMSCI180-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201221T234500Z;BYDAY=TU,TH",
        "text": "CHIN 40 LEC 1 (Online - Recorded)"
      },
      {
        "id": "6",
        "startDate": "Wed Sep 30 2020 10:00:00 GMT-0700 (PST)",
        "endDate": "Wed Sep 30 2020 12:00:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-COMSCI180-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201221T234500Z;BYDAY=WE,FR",
        "text": "CLUSTER M70 (Online - Recorded)"
      },
      { "id": "7",
        "startDate": "Thu Dec 01 2020 15:00:00 GMT-0700 (PST)",
        "endDate": "Thu Dec 01 2020 15:50:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-MATH33A-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201220T234500Z;BYDAY=MO,WE,FR",
        "text": "Math32B"
      },
      { "id": "8",
        "startDate": "Fri Dec 02 2020 09:00:00 GMT-0700 (PST)",
        "endDate": "Fri Dec 02 2020 09:50:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-PHYSCI5-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201221T234500Z;BYDAY=TU,TH,SA",
        "text": "PHYSICS 1B LEC 1 (Online - Recorded)"
      },
      {
        "id": "9",
        "startDate": "Mon Oct 05 2020 10:00:00 GMT-0700 (PST)",
        "endDate": "Mon Oct 05 2020 11:50:00 GMT-0700 (PST)",
        "location": "https://ccle.ucla.edu/course/view/20F-COMSCI180-1",
        "recurrenceRule": "FREQ=WEEKLY;UNTIL=20201211T234500Z;BYDAY=TU,TH",
        "text": "COM SCI 180 LEC 1 (Online - Recorded)"
      },
    ]

    const options = classList.map((option) => {
      const firstLetter = option.text[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
      };
    });

    function updateEvent(){
      try {
        console.log('reachchange');
        const response = axios.post('/api/setschedule', datab, config);
        console.log('👉 Returned calendar data:', response);
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
      }
      setTimeout(function (){
        window.location.reload()
      }, 1900);
    }

    return (
      <React.Fragment>
        <div className="Title">MY EGGLENDAR 
            <span className="uploadButton"><ButtonUpload token={this.props.token}/></span>
        </div>
        <div class="aParent">
          <div className="calendar-layout">
            <div className="option">
              <span className="caption">{txt} 「 Time Zone 」</span>
              <SelectBox
                className="selector"
                items={demoLocations}
                displayExpr="title"
                valueExpr="id"
                width={300}
                value={timeZone}
                onValueChanged={this.onValueChanged}
              />
             <Autocomplete
                className="classes-search-box"
                onChange={(event,value) => {this.onChange(value, config, datab);}}
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.text}
                style={{ width: 300, backgound: 'black' }}
                renderInput={(params) => 
                  <TextField {...params} color="blue" label="Search your classes" variant="outlined" />}
              />
              <Button
                variant="contained"
                onClick={updateEvent}>
                Save all changes
                <SaveIcon />
              </Button>

            </div>
            <Scheduler
              dataSource={datab}
              views={views}
              defaultCurrentView="week"
              showCurrentTimeIndicator={this.state.showCurrentTimeIndicator}
              showAllDayPanel={true}
              shadeUntilCurrentTime={this.state.shadeUntilCurrentTime}
              startDayHour={0}
              defaultCurrentDate={currentDate}
              timeZone={timeZone}
              height={800}
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
              <span className="caption">Events List </span>
              <div className="sideNote">( Slide left to delete, or drag to change 
               priority, or just put a check in the box !)</div>
            </div>

            <List
              dataSource={datab}
              height={800}
              keyExpr="id"
              repaintChangesOnly={true}
              allowItemDeleting={true}
              itemDeleteMode={this.state.deleteType}
              showSelectionControls={true}
              selectionMode="multiple"
              onOptionChanged={this.onSelectedItemsChange}
              searchExpr="text"
              searchEnabled={true}
              searchMode={this.state.searchMode}>
              <ItemDragging
                allowReordering={true}
                data="datab"
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
