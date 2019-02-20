import React, { Component } from "react";
import axios from "axios";





class emailverify extends Component{

    state={
        sucsess:false
    }

componentDidMount(){

    console.log(this.props.match.params.id)
    axios.post('http://localhost:3001/usr/confirmemail/'+this.props.match.params.id).then(res=>{
        this.setState({sucsess:true})
        console.log(res)

    }).catch(err=>{
        this.setState({sucsess:false})
        console.log(err)

    })

}

    render(){
        
        if(this.state.sucsess){
            return(<div>
                waiting..............
            </div>)
        }
       else{
        return(<div>
            email confirmed
        </div>)
       }
    }



}

export default emailverify