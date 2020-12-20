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
  React.useEffect(() => {
    let active = true;
    
    if (!loading) {
      return undefined;
    }

    (async () => {
      
      const response = await fetch('api/classlist');
  
      const myclasses = await response.json();
      
      if (active) {
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
      <Button variant="outlined" color="primary" onClick={()=>{deletefunc(index)}} style={{marginLeft:"1rem"}} disabled={inputstate==="clear"?false:true}>
        delete
      </Button>
    </div>
  );
}