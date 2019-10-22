import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      id: null,
      user: {},
      eitsToDelete: []
    };
  }

  editUser() {
    // Tasks.update(id, changes);
    this.setState({isEditing: false, id: null });
  }


  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const textUsername = ReactDOM.findDOMNode(this.refs.textName).value.trim();
    const userSurname = ReactDOM.findDOMNode(this.refs.textSurname).value.trim();
    const country = ReactDOM.findDOMNode(this.refs.textCountry).value.trim();
    const age = ReactDOM.findDOMNode(this.refs.textAge).value.trim();
    if (!textUsername && !userSurname && !country && !age) return;
    const inserting = {
      textUsername,
      userSurname,
      country,
      age
    }
    Meteor.call("eits.create", inserting );
    // Tasks.insert({
    //   textUsername,
    //   userSurname,
    //   country,
    //   age,
    //   createdAt: new Date(), // current time
    //   owner: Meteor.userId(),           // _id of logged in user
    //   username: Meteor.user().username,  // username of logged in user
    //   });



    // Clear form
    ReactDOM.findDOMNode(this.refs.textName).value = '';
    ReactDOM.findDOMNode(this.refs.textSurname).value = '';
    ReactDOM.findDOMNode(this.refs.textCountry).value = '';
    ReactDOM.findDOMNode(this.refs.textAge).value = '';
  }

  addToSelected(id) {
    this.setState({ eitsToDelete: [...this.state.eitsToDelete, id] });
  }

  removeFromSelected(id) {
    this.setState({ eitsToDelete: this.state.eitsToDelete.filter(each => each !== id) });
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task {...this.props} owner={task.owner} key={task._id} id={task._id} textUsername={task.textUsername} userSurname={task.userSurname} age={task.age} country={task.country} setEitToEdit={this.setEitToEdit.bind(this)} addToSelected={this.addToSelected.bind(this)} removeFromSelected={this.removeFromSelected.bind(this)} />
    ));
  }

  setEitToEdit(id) {
    this.setState({ id });

    const user = Tasks.findOne(id);
    this.setState({ user });
  }

  render() {
    // console.log(this.props);
    return (
      <div className="container">
        <header>
          <div id ="banner"><h1>EIT Management Platform</h1></div>
          
          <AccountsUIWrapper />

          
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textName"
                placeholder="Name"

              />
              <input
                type="text"
                ref="textSurname"
                placeholder="Surname"

              />
              <input
                type="text"
                ref="textCountry"
                placeholder="Country"

              />
              <input
                type="text"
                ref="textAge"
                placeholder="Age"

              />
              <button className="add" type="submit">Add</button>
            
                <button className="bulkDelete" onClick={e => {
                  // console.log(this.state.eitsToDelete);
                  Meteor.call('eits.bulk_delete', this.state.eitsToDelete);
                }}>Delete Selected</button>
              
              
            </form> 
            
          
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {

    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);