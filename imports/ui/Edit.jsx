import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Tasks} from '../api/tasks.js'


class Edit extends Component{
  constructor(props){
    super(props);
    // console.log(props);
    // const user = Tasks.findOne(this.props.match.params.id);
    // console.log(user)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeSurname = this.onChangeSurname.bind(this)
    this.onChangeAge = this.onChangeAge.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      textUsername : '',
      userSurname : '',
      country : '',
      age : ''
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
    e.preventDefault();


    const textUsername = ReactDOM.findDOMNode(this.refs.textUsername).value.trim();
    const userSurname = ReactDOM.findDOMNode(this.refs.userSurname).value.trim();
    const country = ReactDOM.findDOMNode(this.refs.country).value.trim();
    const age = ReactDOM.findDOMNode(this.refs.age).value.trim();

    const editing = {
      textUsername,
      userSurname,
      country,
      age
    }

    Meteor.call("eits.create", editing );

    //Tasks.update(this.props.eit._id, { textUsername, userSurname, country, age });
    // Tasks.update(this.props.user._id, updatedData);
    // console.log(textUsername, userSurname, country, age);

    this.props.history.push("/");
  }

  render() {
    const eit = this.props.eit;
    return(
      <form className="new-task editForm container" onSubmit={this.onSubmit} >
        <input 
          type="text"
          name="textName"
          placeholder="Name"
          ref="textUsername"
          defaultValue={eit ? eit.textUsername : ''}
          onChange={this.onChangeName}
        />
        <input
          type="text"
          name="textSurname"
          placeholder="Surname"
          ref="userSurname"
          defaultValue={eit ? eit.userSurname : ''}
          onChange={this.onChangeSurname}
        />
        <input
          type="text"
          name="textCountry"
          placeholder="Country"
          ref="country"
          defaultValue={eit ? eit.country : ''}
          onChange={this.onChangeCountry}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          ref="age"
          defaultValue={eit ? eit.age : ''}
          onChange={this.onChangeAge}
        />
        <button className="editButton" type="submit">Update</button>
      </form>
    )
  }
}

export default withTracker((props) => {
  const id = props.match.params.id;
  console.log(id);
  return {
    eit: Tasks.findOne({ _id: id })
  }
})(Edit);
