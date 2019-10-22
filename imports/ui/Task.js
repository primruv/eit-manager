import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
import {Link} from 'react-router-dom';
 
// Task component - represents a single todo item
export default class Task extends Component {
  constructor(props){
    super(props)
      // this.onEdit = this.onEdit.bind(this);
      this.state = {
        isEditing : false
      };
  }


  // delete(id){
  //   Tasks.remove(id);
  // }
  
  render() {
    // console.log(this.props.owner);
    //const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      
      <li id={this.props.id}>
       {this.props.currentUser && this.props.currentUser._id === this.props.owner ? 
       <button className="delete" onClick= {() => Meteor.call('eits.delete',this.props.id )}>
          &times;
        </button> : ''}
        { this.props.currentUser && this.props.currentUser._id === this.props.owner ?
          <Link  to={`/edit/${this.props.id}`} className="edit">Edit </Link> : ""
        }
        
        {this.props.currentUser && this.props.currentUser._id === this.props.owner ? 
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
        /> : ""}
        
        {this.props.textUsername}  {this.props.userSurname} {this.props.country} {this.props.age} 
        
       
        </li>
    
    );
  }
}