import React, {Component, Fragment} from 'react';
import Noteitem from './noteitem';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {actionCreators as noteActionCreators} from './store';
class Notification extends Component
{
    render()
    {
        return(
            
                <Fragment>
                {this.props.noteData.map(item => <Noteitem key = {item.id} {...item}{...this.props}/>)}
                </Fragment>
            // <div>
            //     <Noteitem/>
            // </div>
        )
    }
}

const mapState2Props = state=>
{
    return {
        noteData: state.note,

    }
}

const mapDispatch2Props = dispatch =>
{
    return{
        noteFn: bindActionCreators(noteActionCreators,dispatch)
    }
}

export default connect (mapState2Props, mapDispatch2Props)(Notification);