import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
 
export const Tasks = new Mongo.Collection('EITS');

Meteor.methods({
  "eits.bulk_delete"(ids) {
    Tasks.remove({ _id: { $in: ids } });
  }
});

