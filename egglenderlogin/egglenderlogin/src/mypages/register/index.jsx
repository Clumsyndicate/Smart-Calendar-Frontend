import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {registerAct} from './store/creator';
import {reducer, actionCreator as registerActionCreator} from './store'
import  {actionCreators as noteActionCreators} from '../notification/store'
import Registerf from './Registerf'
import  Registerf2 from './Registerf2'
class eggregister extends Component{
    render()
    {
        return <Registerf2 {...this.props}></Registerf2>
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
        registerFn: bindActionCreators(registerActionCreator, dispatch),
        noteFn: bindActionCreators(noteActionCreators, dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(eggregister)