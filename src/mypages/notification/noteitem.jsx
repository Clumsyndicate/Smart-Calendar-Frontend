import React, {Component} from 'react'
export default class Noteitem extends Component
{
    
    handleClick= () => {
        this.props.noteFn.deletenoteAct(this.props.id);
    };
    render()
    {
        return(
        <div>
            {this.props.text ===undefined ? 
            (
                <div></div>    
            ) 
            : 
            (
            <div className={`alert ${this.props.type}`}>
                {this.props.text}
                <button type="button" className="close" aria-label="Close"
                onClick={this.handleClick}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            )}

        </div>  

                
        )
    }
}