import React, {Component} from 'react';
// import { withTracker } from 'meteor/react-meteor-data';
import {Tasks} from '../api/tasks.js'


export default class Edit extends Component{
  constructor(props){
    super(props);
    console.log(props);

    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeSurname = this.onChangeSurname.bind(this)
    this.onChangeAge = this.onChangeAge.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      isEditing: false,
      id: '',
      textUsername : this.props.user.textUsername,
      userSurname : this.props.user.userSurname,
      country : this.props.user.country,
      age : this.props.user.age
    }
  }

  onChangeName(e){
    e.preventDefault()
    this.setState({
      textUsername: e.target.value
    })
  }

  onChangeSurname(e){
    e.preventDefault()
    this.setState({
      userSurname: e.target.value
    })
  }

  onChangeCountry(e){
    e.preventDefault()
    this.setState({
      country: e.target.value
    })
  }

  onChangeAge(e){
    e.preventDefault()
    this.setState({
      age: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault()

    const updatedData = {
      textUsername: this.state.textUsername,
      userSurname: this.state.userSurname,
      country: this.state.country,
      age: this.state.age
    }

    // Tasks.update(this.props.user.id, updatedData);
    Tasks.update(this.props.user._id, updatedData);
    console.log(this.state)
    this.setState({isEditing: !this.state.isEditing, id: !this.state.id})
    console.log(this.state)
  }

  render(){

    console.log(this.props.user);

    return(
      <form className="new-task" onSubmit={this.onSubmit} >
            <input type="text" name="id" readOnly value={this.props.user.id} hidden/>
            <input
              type="text"
              name="textName"
              placeholder="Name"
              value= {this.state.textUsername}
              onChange={this.onChangeName}
            />
            <input
              type="text"
              name="textSurname"
              placeholder="Surname"
              value= {this.state.userSurname}
              onChange={this.onChangeSurname}
            />
            <input
              type="text"
              name="textCountry"
              placeholder="Country"
              value= {this.state.country}
              onChange={this.onChangeCountry}
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value= {this.state.age}
              onChange={this.onChangeAge}
            />
            <button className="add" type="submit">Add</button>
          </form>
    )
  }
}
