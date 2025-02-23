import React from "react"


class ComponentDidUpdate extends React.Component{

constructor(){
    super();
    this.state={
      counter:0
    }
  }
  componentDidUpdate(a){
    console.log("method called",a)
    if(a.counter==this.state.counter){
      console.warn("match")
    }
  }
  
  render(){
    return(
      <div>
        <h1>ComponentDidUpdate Life Cycle Method</h1>
        <button onClick={()=> this.setState({counter:this.state.counter+1})}>Update Counter{this.state.counter}</button>
      </div>
    )
  }
}

export default ComponentDidUpdate;