import React, {Component} from 'react'
export default class eggLogin extends Component{
    render(){
        return(
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username or Email address</label>
                        <input type="email" className="form-control" id="useremail" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userpwd">Password</label>
                        <input type="password" className="form-control" id="userpwd"/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="usercheck"/>
                        <label className="form-check-label" htmlFor="usercheck">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <a className="btn" href="/signup" role="button">Sign Up </a>
                </form>
            </div>
        )
    }
}