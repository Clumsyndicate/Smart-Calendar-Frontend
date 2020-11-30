import React, {Component} from 'react'

import {BrowserRouter,Switch, Route} from 'react-router-dom';
import EggNavigator from './mypages/navigator/index';
import eggLogin from './mypages/login/index';
import eggProfile from './mypages/profile/index';
import eggregister from './mypages/register/index';
import eggHomepage from './mypages/Homepage/index';
import eggSetting from './mypages/setting/index'
import Notification from './mypages/notification'
export default class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <EggNavigator/>
                <Notification/>
                    <Switch>
                        <Route path ='/' exact component = {eggHomepage}/>
                        <Route path ='/Homepage' exact component = {eggHomepage}/>
                        <Route path ='/register' exact component = {eggregister}/>
                        <Route path ='/login' exact component = {eggLogin}/>
                        <Route path ='/myProfile' exact component = {eggProfile}/>
                        <Route path ='/setting' exact component = {eggSetting}/>

                    </Switch>
            </BrowserRouter>
        )
    }
}



// import React, {Component} from 'react'
// export default class App extends Component{
//     render(){
//         return(
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <a className="navbar-brand" href="#">Egglender</a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav mr-auto">
//                     <li className="nav-item active">
//                         <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Link</a>
//                     </li>
//                     <li className="nav-item dropdown">
//                         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                         setting
//                         </a>
//                         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                         <a className="dropdown-item" href="#">myProfile</a>
//                         <a className="dropdown-item" href="#">mySetting</a>
//                         <div className="dropdown-divider"></div>
//                         <a className="dropdown-item" href="#">Logout</a>
//                         </div>
//                     </li>
//                     </ul>
//                     <form className="form-inline my-2 my-lg-0">
//                     <input className="form-control mr-sm-2" type="search" placeholder="Search Class ID or Name" aria-label="Search"/>
//                     <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                     </form>
//                 </div>
//             </nav>
//         )
//     }
// }