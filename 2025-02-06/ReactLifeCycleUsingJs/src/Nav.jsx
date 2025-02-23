import React from 'react'

export default class Nav extends React.Component{

    componentWillUnmount(){
        console.warn("CompoNentWilLMounT");


    }

    render(){
        return <h3>Nav BAr</h3>
    }
}


