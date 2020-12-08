import React, {Component} from 'react'
import fetch from 'cross-fetch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';



export default function SelectionBar(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
   let class1 =props.class1
   const func=props.callback
   const deletefunc=props.deletefunc
   const index = parseInt(props.index,10)
   const classtext="Class " +(index+1)
   let prev=""
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
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      
      renderInput={(params) => {
        class1=params.inputProps.value?params.inputProps.value:class1
        if(!loading&&class1!=""&&class1!=prev){
            func(class1,index)
        }
        prev=class1
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
      <Button variant="outlined" color="primary" onClick={()=>{deletefunc(index)}} style={{marginLeft:"1rem"}}>
        delete
      </Button>
    </div>
  );
}