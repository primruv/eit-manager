import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('EITS');

Meteor.methods({
  "eits.delete"(id){
    check(id, String )
    if(!Meteor.user()  && !this.userId ) throw new Meteor.Error("Not Authorised") //allow the owner only to design
    Tasks.remove(id);

  },

  "eits.bulk_delete"(ids) {
    // check(ids, String)
    if(!Meteor.user()) throw new Meteor.Error("Not Authorised")
    Tasks.remove({ _id: { $in: ids } });
  },

  "eits.create"(eitDetails){
    check(eitDetails, Object)

    const {
      textUsername, userSurname, country, age
    } = eitDetails

    Tasks.insert({
      textUsername,
      userSurname,
      country,
      age,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
      });
  },

    "eits.edit" (editEit, id){
      check (editEit,Object);
      if(!Meteor.user()) throw new Meteor.Error("Not Authorised")
      const{
        textUsername, userSurname, country, age

      } = editEit
      if(!Meteor.user()) throw new Meteor.Error("Not Authorised")

      Tasks.update(id, { textUsername, userSurname, country, age });
    }
    


});

