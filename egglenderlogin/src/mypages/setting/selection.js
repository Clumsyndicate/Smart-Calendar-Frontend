import React, {Component} from 'react'
import fetch from 'cross-fetch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';



export default function SelectionBar(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputstate, setInput] = React.useState("clear");
  const loading = open && options.length === 0;
   let class1 =props.class1
   const func=props.callback
   const deletefunc=props.deletefunc
   const index = parseInt(props.index,10)
   const classtext="Class " +(index+1)
   //let prev=""
  React.useEffect(() => {
    let active = true;
    
    if (!loading) {
      return undefined;
    }

    (async () => {
      //const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
      //const response = await fetch('https://5fc7ab11f3c77600165d8a61.mockapi.io/class');
      const response = await fetch('http://149.28.86.112:9001/api/classlist');
      //const countries = await response.json();
      const myclasses = await response.json();
      //console.log(myclasses[0].classList)
      if (active) {
        //setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
        //console.log(options)
        //console.log(myclasses)
        setOptions(myclasses.classList.map((item)=>item));
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
  //console.log(myclasses)
  return (

    <div style={{display:"flex"}}>
    
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
      // getOptionSelected={(option, value) => option.name === value.name}
      // getOptionLabel={(option) => option.name}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      onInputChange={(event,value,reason)=>{setInput(reason);if(reason==="reset")func(value,index)}}
      renderInput={(params) => {
        class1=params.inputProps.value?params.inputProps.value:class1
          return(
        <TextField
          {...params}
          label={params.inputProps.value?classtext:class1}
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
    {/* <Button variant="outlined" color="primary" onClick={()=>{func(class1,index)}} style={{marginLeft:"1rem"}}>
        confirm
      </Button> */}
      <Button variant="outlined" color="primary" onClick={()=>{deletefunc(index)}} style={{marginLeft:"1rem"}} disabled={inputstate==="clear"?false:true}>
        delete
      </Button>
    </div>
  );
}