import React from 'react';
import FriendList from './friendList';
import tileData from './tileData';
import tileData2 from './tileData2'
import ReactDOM from 'react-dom';

class FriendContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          friends: tileData
        };
      }
    
      
      render(){
          return(
              <div>
              <button onClick={()=>{this.setState({friends:tileData2})}}>click</button>
              <FriendList data={this.state.friends}/>
              </div>
              
          )
      }

}

export default FriendContainer;