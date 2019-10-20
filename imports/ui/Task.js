import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
 
// Task component - represents a single todo item
export default class Task extends Component {
  constructor(props){
    super(props)
      // this.onEdit = this.onEdit.bind(this);
      this.state = {
        isEditing : false
      };
  }


  delete(id){
    Tasks.remove(id);
  }
  
  render() {
    //const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      
      <li id={this.props.id}>
       <button className="delete" onClick= {() => this.delete(this.props.id)}>
          &times;
        </button>
        <button className="edit" onClick={() => this.props.setEitToEdit(this.props.id)}>
          Edit
        </button>
        <input
          type="checkbox"
          readOnly
          onChange={e => {
            if (e.target.checked) {
              this.props.addToSelected(this.props.id);
            } else {
              this.props.removeFromSelected(this.props.id);
            }
          }}
        />
        {this.props.textUsername} {this.props.userSurname} {this.props.country} {this.props.age} 
        </li>
    
    );
  }
}