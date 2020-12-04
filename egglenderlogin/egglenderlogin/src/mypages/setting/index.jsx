import React, {Component} from 'react'
import fetch from 'cross-fetch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Center } from 'devextreme-react/map';



export default function EggSetting() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
    
    let newclassList={class1:"CS 180", class2: "CS97",class3:"Math 33B",class4:"Physics 1B",class5:""}
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
      
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
      <div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          
          <h2>Change Enrolled Classes</h2>
          </div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '12vh'}}>
    <Autocomplete
      id="class1"
      style={{ width: 300}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      
      renderInput={(params) => {
        let class1=newclassList.class1
        newclassList.class1=params.inputProps.value?params.inputProps.value:class1
          return(
        <TextField
          {...params}
          label={params.inputProps.value?"Class 1":class1}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
          )}}
    />
    </div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',height: '12vh'}}>
    <Autocomplete
      id="class2"
      style={{ width: 300}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      
      renderInput={(params) => {
        let class2=newclassList.class2
        newclassList.class2=params.inputProps.value?params.inputProps.value:class2
          return(
        <TextField
          {...params}
          label={params.inputProps.value?"Class 2":class2}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
          )}}
    />
    </div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '12vh'}}>
    <Autocomplete
      id="class3"
      style={{ width: 300}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      
      renderInput={(params1) => {
        let class3=newclassList.class3
        newclassList.class3=params1.inputProps.value?params1.inputProps.value:class3
          return(
        <TextField
          {...params1}
          id="1"
          label={params1.inputProps.value?"Class 3":class3}
          variant="outlined"
          InputProps={{
            ...params1.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params1.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
          )}}
    />
    </div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
    <Autocomplete
      id="class4"
      style={{ width: 300}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      
      renderInput={(params) => {
        let class4=newclassList.class4
        newclassList.class4=params.inputProps.value?params.inputProps.value:class4
          return(
        <TextField
          {...params}
          label={params.inputProps.value?"Class 4":class4}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
          )}}
    />
    </div>
    </div>
  );
}