import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {registerAct} from './store/creator';
import {reducer, actionCreator as registerActionCreator} from './store'
class eggregister extends Component{
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
            return this.setState(
                {
                    errMessage:data.msg,
                }
            );
        }
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
                    <div className="form-group is-invalid">
                        <label htmlFor="userName">Username</label>
                        <input id="userName" type = "text" defaultValue={userName} onChange={this.handleInput}/>
                        <small id="userNameHelp" className="form-text text-muted">
                            {errMessage[0] === 'userName' && errMessage[1] }
                        </small>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="userEmail">Email address</label>
                        <input type="email" className="form-control" id="userEmail" defaultValue={userEmail} onChange={this.handleInput}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        <small id="userEmailHelp" className="form-text text-muted">
                            {errMessage[0] === 'userEmail' && errMessage[1] }
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPwd">Password</label>
                        <input type="password" className="form-control" id="userPwd" defaultValue={userPwd} onChange={this.handleInput}/>
                        <small id="userPwdHelp1" className="form-text text-muted">
                            {errMessage[0] === 'userPwd' && errMessage[1] }
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPwd2">Confirm Password</label>
                        <input type="password" className="form-control" id="userPwd2" defaultValue={userPwd2} onChange={this.handleInput}/>
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
const mapStateToProps = state =>
{
    return {
        registerData: state.register
    }
}
const mapDispatchToProps = dispatch =>
{
    return {
        registerFn: bindActionCreators(registerActionCreator, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(eggregister)