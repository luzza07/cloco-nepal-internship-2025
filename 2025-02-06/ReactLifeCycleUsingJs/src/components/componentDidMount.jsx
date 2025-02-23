import React from "react";
import Nav from "../Nav";

class ComponentDidMount extends React.Component{
// componentDidMount life cycle
//   constructor(){
//     super();
//     console.log("constructor");
//     this.state={
//       data:false
//     }
//   }
//   componentDidMount(){
//     console.log("componEnt did mounT");
//     this.setState({data:true})
//   }
//   render(){
//     console.log("RenDeR");
//     return(
//       <>
//       <div>
//         <h1>ComponentDIdMount Life Cycle</h1>
//       </div>
//       </>
//     )
//   }

  constructor(){
    super()
    this.state={
      show:true
    }
    console.warn("ConStrucTor");
  }

  componentDidMount(){
    console.warn("COmponentDiDMount")
  }
  render() {
    console.warn("RenDer");
    return (
      <div>
        <h1>React Lifecycle Method</h1>
        {
          this.state.show ? <Nav/> :null
        }
        <button onClick={()=>{this.setState({show:!this.state.show})}}>Toggle Navbar</button>
      </div>
    );
  }
}

export default ComponentDidMount;