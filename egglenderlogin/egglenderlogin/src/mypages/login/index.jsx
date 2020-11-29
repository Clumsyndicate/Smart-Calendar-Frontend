import React, {Component} from 'react'
import axios from '../../utils/request'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {actionCreators as loginActionCreators} from './store'
import  {actionCreators as noteActionCreators} from '../notification/store'
import LoginF from './Loginf';
class eggLogin extends Component{
    render() {
        return (
          <LoginF {...this.props}/>
        );
      }
    
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
        loginFn: bindActionCreators(loginActionCreators, dispatch),
        noteFn: bindActionCreators(noteActionCreators, dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(eggLogin)