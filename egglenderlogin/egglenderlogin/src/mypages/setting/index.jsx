import React, {Component} from 'react'
import SelectionBar from './selection'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import  { Redirect } from 'react-router-dom'
import shortid from 'shortid';
import {reducer, actionCreators as settingActionCreator} from './store'
import  {actionCreators as noteActionCreators} from '../notification/store'
// let array = ["CS 180", "CS97","Physics 1B", "Math 33A",""];
class EggSetting extends React.Component{
  constructor(props) {
    super(props);
    this.array = ["CS 180", "CS97","Physics 1B", "Math 33A",""];
    //this.array = ["CS 180", "CS97","Physics 1B", "Math 33A",""];
    this.state = {
        classes: ["CS 180", "CS97","Physics 1B", "Math 33A",""],
        classText: this.computeClassText(this.array)
    };  
   
}

computeClassText=(arr)=>{
  let text=""
  for(let i=0;i<arr.length;i++){
    if(arr[i]!==""){
      text+=arr[i]
      if(i!=arr.length-1){
        text+=" "
      }
        
    }
  }
  return text;
}

myCallback = (newclass,index) => {
  // let array=this.state.classes
 this.array[index]=newclass
  // this.setState({ classes: array });
  
}
// componentWillMount = async() => {
//   console.log('reach the start of the page')
//   const {data} =await this.props.settingFn.settingAct(this.props.loginData);
//   if(data.status===1)
//   {
//       this.props.noteFn.addNoteAct({
//           type: 'alert-primary',
//           text: 'Cannot get your classes data',
//           id: shortid.generate()
//       })
//   }
//   else
//   {
//     this.array = data.array;
//   }
// }
componentDidMount = async() => {
  const {data} =await this.props.settingFn.settingAct(this.props.loginData);
  if(data.status===1)
  {
      this.props.noteFn.addNoteAct({
          type: 'alert-primary',
          text: 'Cannot get your classes data',
          id: shortid.generate()
      })
  }
  else
  {
    console.log(this.props.loginData)
    console.log(data.userName)
    this.array = data.array;
    this.setState({ classes: data.array });
  }
}

deleteClass=(index)=>{
   let arr=this.state.classes
  arr[index]=""
  this.setState({ classes: arr });
  this.array[index]=""
}

returnBack= async e =>{
  e.preventDefault();
  console.log(this.array)
  const {data} =await this.props.settingFn.settingUpdate({
    login:this.props.loginData,
    array: this.array,
    userName: this.props.loginData.userName,
  });
  // console.log('next should be loginData')
  // console.log(this.props.loginData);
  // console.log('reach the submit');
  // console.log(data);
  // console.log(this.state.classes)
  // console.log(this.array)
  let text = this.computeClassText(this.array)
  this.setState({
    classText:text
  })
  // console.log(text)
  // this.props.history.push('/myProfile')
  //post to backend here
}

render(){
  // console.log(this.state.classes)
  return (

      <div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <h2>Change Enrolled Classes</h2>
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
          <SelectionBar class1={this.state.classes[0]} callback={this.myCallback} index="0" deletefunc={this.deleteClass}/>
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
          <SelectionBar class1={this.state.classes[1]} callback={this.myCallback} index="1"deletefunc={this.deleteClass}/>
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
          <SelectionBar class1={this.state.classes[2]} callback={this.myCallback} index="2" deletefunc={this.deleteClass}/>
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
          <SelectionBar class1={this.state.classes[3]} callback={this.myCallback} index="3" deletefunc={this.deleteClass}/>
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
          <SelectionBar class1={this.state.classes[4]} callback={this.myCallback} index="4" deletefunc={this.deleteClass}/>
          </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
            <h6>Your current enrolled classes are: <br/><br/> {this.state.classText}</h6>
      
      </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"1em"}}>
          
          <Button variant="outlined" color="primary" style={{marginLeft:"1rem"}} onClick={this.returnBack}>
        Save Change
      </Button>

      </div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"1em"}}>
          <p>Your change won't be saved unless you click it</p>
      
      </div>
          
    </div>
  );}
}

const mapStateToProps = state =>
{
    return {
      loginData: state.login
    }
}
const mapDispatchToProps = dispatch =>
{
    return {
        settingFn: bindActionCreators(settingActionCreator, dispatch),
        noteFn: bindActionCreators(noteActionCreators, dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EggSetting)
