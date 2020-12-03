import React, {Component} from 'react'
export default class eggHomepage extends Component{
    render(){
        return(
            <div>
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Egglendar!</h1>
                    <p className="lead">This is a free online academic calendar designed for all the students!</p>
                    <hr className="my-4"/>
                    <p>It is also our CS97 final project!</p>
                    <a className="btn btn-primary btn-lg" href="/login" role="button">Sign Up or Log In</a>
                </div>
            </div>
        )
    }
}