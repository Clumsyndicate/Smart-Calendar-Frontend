import React from 'react';
import moment from "moment";
import Scheduler, { Editing } from 'devextreme-react/scheduler';
import SelectBox from 'devextreme-react/select-box';
import axios from 'axios';
import { data, locations, List} from './data.js';
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

  state = {
    loading: true,
    error: "",
    datab: null
  };

  loadData = () => {
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
  componentDidMount() {
    this.loadData();
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
    const { loading, error, datab } = this.state;
    console.log(datab);
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
          dataSource={datab}
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
