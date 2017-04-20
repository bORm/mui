import React, { Component } from 'react'

export default class extends Component {

  submit(event){
    console.log(event)

    event && event.preventDefault();
  }

  render(){

    return (
      <form onSubmit={::this.submit}>
        {this.props.children}
      </form>
    );
  }

}
