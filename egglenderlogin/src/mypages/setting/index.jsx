import React, {Component} from 'react'
import SelectionBar from './selection'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import shortid from 'shortid';
import {reducer, actionCreators as settingActionCreator} from './store'
import  {actionCreators as noteActionCreators} from '../notification/store'
import decoder from 'jwt-decode'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Contact from '../aboutme/contact'
import ImgUpload from '../aboutme/upload'
import Avatar from '@material-ui/core/Avatar';

const contactways = ['Email', 'TEL','Facebook','Snap','Instagram','WeChat']

class EggSetting extends React.Component{
  constructor(props) {
    super(props);
    this.array = ["", "","", "",""];
    //this.array = ["CS 180", "CS97","Physics 1B", "Math 33A",""];
    this.state = {
        classes: ["", "","", "",""],
        classText: this.computeClassText(this.array),
        contact:"",
        contactval:"",
        avatarpic:undefined,
        currentavatar:"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
    };  
   
}

handleContactChange = (newcontact) => {
  this.setState({ contact: newcontact});
  // console.log(newcontact)
  };

  handleContactValueChange = (newval) => {
    if(newval===undefined){
      newval=""
    }
    this.setState({ contactval: newval});
    // console.log(newval)
    };

  saveNewAvatar=(file,pic)=>{
    this.setState({ avatarpic: file[0], currentavatar:pic[0]});
    console.log("avatar")
    console.log(file)
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
 this.setState({ classes: this.array });
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
  const {data} =await this.props.settingFn.settingAct({},this.props.loginData.info);
  
  if(data.status===1)
  {
    console.log('reah here change token1')
    // console.log(decoder(this.props.loginData.info))
      this.props.noteFn.addNoteAct({
          type: 'alert-primary',
          text: 'Cannot get your classes data',
          id: shortid.generate()
      })
  }
  else
  {
    console.log('reah here change token')
    // console.log(this.props.loginData.info)
    if(data.contactInfo){
    console.log(data.contactInfo.contactval)
    this.array = data.array;
    this.setState({
      classes: data.array,
      contact: data.contactInfo.contact,
      contactval: data.contactInfo.contactval,
      currentavatar: data.avatar,
    });
  }
  
  
  }
}

deleteClass=(index)=>{
   let arr=this.state.classes
  arr[index]=""
  this.setState({ classes: arr });
  this.array[index]=""
}

deleteContact=()=>{
  this.setState({
    contact: "",
    contactval: "",
  });
}

returnBack= async e =>{
  let text = this.computeClassText(this.array)
  this.setState({
    classText:text
  })
console.log("contact")
console.log(this.state.contact)
console.log(this.state.contactval)
let postInfo={
  "enrollList": this.array,
  "contactInfo":{"contact":this.state.contact, "contactval": this.state.contactval}
}
//to set state when get: classes: postInfo.enrollList; contact: postInfo.contactInfo.contact, contactval=postInfo.contactInfo.contactval
  e.preventDefault();
  console.log(this.array)
  const {data} =await this.props.settingFn.settingUpdate({
    array: this.array,
    contactInfo: {
      contact:this.state.contact,
      contactval:this.state.contactval,
    }
  }, this.props.loginData.info);
  console.log(data);
  if(data.status == 0)
  {
    this.props.noteFn.addNoteAct({
      type: 'alert-primary',
      text: 'Update the classlist successfully!',
      id: shortid.generate()
    })
  }
  else
  {
    this.props.noteFn.addNoteAct({
      type: 'alert-primary',
      text: 'Cannot update your classlist!',
      id: shortid.generate()
    })
  }

  if(this.state.avatarpic !== undefined)
  {
    console.log('prepare to upload avatar')
    console.log(this.state.avatarpic);
    const formData = new FormData();
    formData.append('avatarpic',this.state.avatarpic)
    const {data2} =await this.props.settingFn.uploadAvatar(formData, this.props.loginData.info);
    // const {data2} =await this.props.settingFn.uploadAvatar({
    //   avatarpic: this.state.avatarpic,
    // }, this.props.loginData.info);
    console.log(data2)
    // if(data2.status == 0)
    // {
    //   this.props.noteFn.addNoteAct({
    //     type: 'alert-primary',
    //     text: data2.msg,
    //     id: shortid.generate()
    //   })
    // }
    // else
    // {
    //   this.props.noteFn.addNoteAct({
    //     type: 'alert-primary',
    //     text: data2.msg,
    //     id: shortid.generate()
    //   })
    // }
  }

}

render(){
  // console.log(this.state.classes)
  return (

      <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
            <h4>My Enrolled Classes: </h4>
      </div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"1em"}}>
      <h6>{this.state.classText}</h6>
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
            <h4>My Contact: </h4>
      </div>
          <Contact handleContactChange={this.handleContactChange} handleContactValueChange={this.handleContactValueChange} contact={this.state.contact} contactval={this.state.contactval} />
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"1em"}}>
          <Button variant="outlined" color="primary" onClick={this.deleteContact}>
        Delete My Contact
      </Button>

      </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
            <h4>My Avatar: </h4>
            <Avatar style={{marginLeft:"0.5rem"}} src={this.state.currentavatar} />
      </div>
      <ImgUpload saveNewAvatar={this.saveNewAvatar}/>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"3em"}}>
          <Button variant="outlined" color="primary" onClick={this.returnBack}>
        Save Change
      </Button>

      </div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"1em"}}>
          <p>Your changes won't be saved unless you click it</p>
      
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
