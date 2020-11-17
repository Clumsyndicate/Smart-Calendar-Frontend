import React, {Component} from 'react'
export default class eggLogin extends Component{
    render(){
        return(
            <div>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Username or Email address</label>
                        <input type="email" class="form-control" id="useremail" aria-describedby="emailHelp"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="userpwd">Password</label>
                        <input type="password" class="form-control" id="userpwd"/>
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="usercheck"/>
                        <label class="form-check-label" for="usercheck">Remember me</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}