import React from "react"

class ComponentWillUnmount extends React.Component{


constructor(){
  super();
  this.state=
  {
    show:false
  }
  
}


render(){
  return(
    <div>
      <h1>componentWillUnmount</h1>
       {this.state.show ?
      <Child/> :null}
      <button onClick={()=>{this.setState({show:!this.state.show})}}>ToggleChild</button>
    </div>
  )
}
}
class Child extends React.Component{
componentWillUnmount(){
  console.warn("component is hidden now")

}

  render(){
    return(
      <div>
        <h2> child component</h2>
      </div>
    )
  }
}

export default ComponentWillUnmount;