import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('EITS');
// This code only runs on the server
Meteor.publish('EITS', function tasksPublication() {
  return Tasks.find({
  });
});


Meteor.methods({
  "eits.delete"(id){
    check(id, String )
    const task = Tasks.findOne(id)
    if(this.userId !== task.owner) throw new Meteor.Error("Cannot delete EIT you did not create") //allow the owner only to delete
    Tasks.remove(id);

  },

  "eits.bulk_delete"(ids) {
    check(ids, Array)
    if(!this.userId) throw new Meteor.Error("Cannot delete bulky EITS you did not create")
    Tasks.remove({ _id: { $in: ids } });
  },

  "eits.create"(eitDetails){
    check(eitDetails, Object)
    if (! this.userId) {
      throw new Meteor.Error('Cannot add EIT if not logged in');
    }

    const {
      textUsername, userSurname, country, age
    } = eitDetails

    Tasks.insert({
      textUsername,
      userSurname,
      country,
      age,
      createdAt: new Date(), // current time
      owner: this.userId,           // _id of logged in user
      username: Meteor.users.findOne(this.userId).username,  // username of logged in user
      });
  },

    "eits.edit" (editEit, id){
      check (editEit,Object);
      if(!this.userId) throw new Meteor.Error("Cannot edit someones EIT")
      const{
        textUsername, userSurname, country, age

      } = editEit
      // if(!this.user) throw new Meteor.Error("Cannot edit someone'/'s EIT")

        Tasks.update(id, {$set:  {textUsername, userSurname, country, age} });
    }
    


});

