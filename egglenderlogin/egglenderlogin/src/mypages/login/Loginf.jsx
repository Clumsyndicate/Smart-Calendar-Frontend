import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../utils/request";
import shortid from 'shortid';
import decoder from 'jwt-decode'

class LoginF extends Component 
{
    state = {
        info: {
        userName: '',
        userPwd: '',      
        },
        
        errMessage: [],
    };
    handleSubmit = async e => {
        e.preventDefault();
        const {data} =await this.props.loginFn.loginAct(this.state.info);
        if(data.status===1)
        {
            this.props.noteFn.addNoteAct({
                type: 'alert-primary',
                text: 'Incorrect username or password!',
                id: shortid.generate()
            })
        }
        if(data.status===0)
        {
            localStorage.setItem('storeTOKEN', data.mytoken)
            this.props.loginFn.syncInfoAct(decoder(data.mytoken))
            this.props.history.push('/myProfile')
            this.props.noteFn.addNoteAct({
                type: 'alert-primary',
                text: 'You have successfully login!',
                id: shortid.generate()
            })
        }
        // console.log(data);
    };
    handleInput = data =>
    {
        this.setState({
            info:{
                ...this.state.info,
                [data.target.id]:data.target.value
            }
            
        });
    }
    render(){
        const { userName,  userPwd,} = this.state.info;
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input id="userName" type = "text" 
                        defaultValue={userName}// className = "form-control is-invalid"
                        className = "form-control"
                        onChange={this.handleInput}/>
                        {/* <small id="userNameHelp" className="form-text text-muted">
                            {errMessage[0] === 'userName' && errMessage[1] }
                        </small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="userpwd">Password</label>
                        <input type="password" className="form-control" id="userPwd" defaultValue={userPwd}
                        onChange={this.handleInput}/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="usercheck"/>
                        <label className="form-check-label" htmlFor="usercheck">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <a className="btn" href="/register" role="button">Sign Up </a>
                </form>
            </div>
        )
    }
}
export default withRouter(LoginF);