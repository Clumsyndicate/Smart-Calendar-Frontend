import React, {Component} from 'react'
import axios from '../../utils/request'
export default class eggProfile extends Component{
    async componentDidMount()
    {
        const {data} = await axios.post('/api/myProfile')
        console.log(data);
    }
    render(){
        return(
            <div>
                placeHolder for EggProfile
            </div>
        )
    }
}