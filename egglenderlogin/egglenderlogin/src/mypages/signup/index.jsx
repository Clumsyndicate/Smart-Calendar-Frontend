import React, {Component} from 'react'
export default class eggSignup extends Component{
    state = {
        userName: '',
        userEmail: '',
        userPwd: '',
        userPwd2: '',
    };
    handleSubmit =  data =>
    {
        data.preventDefault();
        console.log(this.state)
    }
    handleInput = data =>
    {
        this.setState({
            [data.target.id]:data.target.value
        });
    }
    render(){
        const { userName, userEmail, userPwd, userPwd2} = this.state;
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input id="userName" type = "text" defaultValue={userName} onChange={this.handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userEmail">Email address</label>
                        <input type="email" className="form-control" id="userEmail" defaultValue={userEmail} onChange={this.handleInput}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPwd">Password</label>
                        <input type="password" className="form-control" id="userPwd" defaultValue={userPwd} onChange={this.handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPwd2">Confirm Password</label>
                        <input type="password" className="form-control" id="userPwd2" defaultValue={userPwd2} onChange={this.handleInput}/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="usercheck" onChange={this.handleInput}/>
                        <label className="form-check-label" htmlFor="usercheck">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}