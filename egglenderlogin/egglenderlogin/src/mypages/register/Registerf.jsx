import React, {Component} from 'react'
import classnames  from 'classnames'
import {withRouter} from 'react-router-dom'
import shortid from 'shortid'

class Registerf extends Component
{
    state = {
        info: {
        userName: '',
        userEmail: '',
        userPwd: '',
        userPwd2: '',
             
        },
        
        errMessage: [],
    };
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ errMessage: [] });
        console.log(this.state.info)
        // const { data } = await this.props.registerFn.registerAct(
        //   this.state
        // );
        const {data} = await this.props.registerFn.registerAct(this.state.info)
        console.log(data)
        if(data.status === 1)
        {
            console.log(data.msg)
            if(data.msg ==="Username has already existed")
            {
                this.props.noteFn.addNoteAct({
                    type: 'alert-primary',
                    text: 'Username has already existed',
                    id: shortid.generate()
                })
            }
            
            return this.setState(
                {
                    errMessage:data.msg,
                }
            );
        }
        this.props.history.push("/myProfile")
        this.props.noteFn.addNoteAct({
            type: 'alert-primary',
            text: 'You have successfully SignUp and LogIn',
            id: shortid.generate()
        })
    }
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
        const { userName, userEmail, userPwd, userPwd2} = this.state.info;
        const {errMessage}  =this.state;
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input id="userName" type = "text" 
                        // className = "form-control is-invalid"
                        className = {
                            classnames("form-control",{
                                "is-invalid": errMessage[0] === "userName"
                            })}
                        defaultValue={userName} onChange={this.handleInput}/>
                        <small id="userNameHelp" className="form-text text-muted">
                            {errMessage[0] === 'userName' && errMessage[1] }
                        </small>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="userEmail">Email address</label>
                        <input type="email" 
                        className = {
                            classnames("form-control",{
                                "is-invalid": errMessage[0] === "userEmail"
                            })}
                        id="userEmail" defaultValue={userEmail} onChange={this.handleInput}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        <small id="userEmailHelp" className="form-text text-muted">
                            {errMessage[0] === 'userEmail' && errMessage[1] }
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPwd">Password</label>
                        <input type="password" 
                        className = {
                            classnames("form-control",{
                                "is-invalid": errMessage[0] === "userPwd"
                            })}
                        id="userPwd" defaultValue={userPwd} onChange={this.handleInput}/>
                        <small id="userPwdHelp1" className="form-text text-muted">
                            {errMessage[0] === 'userPwd' && errMessage[1] }
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPwd2">Confirm Password</label>
                        <input type="password" 
                        className = {
                            classnames("form-control",{
                                "is-invalid": errMessage[0] === "userPwd2"
                            })}
                        id="userPwd2" defaultValue={userPwd2} onChange={this.handleInput}/>
                        <small id="userPwdHelp2" className="form-text text-muted">
                            {errMessage[0] === 'userPwd2' && errMessage[1] }
                        </small>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="remember" onChange={this.handleInput}/>
                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Registerf);