/* eslint-env mocha */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { AssertionError } from 'assert';
import { Tasks } from './tasks.js';


if (Meteor.isServer) {
  describe('EITManagement', () => {
    describe('methods', () => {
      const username = 'ruvimbo'
      let eitId, userId

      before(() => {
        // Create user if not already created.
        let user = Meteor.users.findOne({username: username})
        if (!user) {
          userId = Accounts.createUser({
            'username': username,
            'email': 'a@agg.com',
            'password': '12345578',
          })


        } else {
          userId = user._id
        }
      })


      beforeEach(() => {
        Tasks.remove({});
        eitId = Tasks.insert({
          text: 'test EIT',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });

      //afterEach(() => {
      //  Tasks.remove({})
     // })

      // delete
      it('Cannot delete EIT you did not create', () => {
        const deleteEIT = Meteor.server.method_handlers['eits.delete'];
        const userId = Random.id();
        const invocation = { userId }
        assert.throws(() => deleteEIT.apply(invocation, [eitId]))
        assert.equal(Tasks.find().count(), 1)

      });

//CAN DELETE eit you created
      it('Can delete EIT you  create', () => {
        const deleteEIT = Meteor.server.method_handlers['eits.delete'];
        //const userId = Random.id();
        const invocation = { userId }
        //assert.throws(() => deleteEIT.apply(invocation, [eitId]))
        deleteEIT.apply(invocation, [eitId])
        assert.equal(Tasks.find().count(), 0)

      });

  
      
      //Insert
      it('Can add if logged in EIT', () =>{
        const text = {
         textUsername:'memort',
         userSurname: 'grrr', 
          country: 'Zim', 
            age :5
        }
        const insert = Meteor.server.method_handlers['eits.create']
        const invocation = {userId}
        insert.apply(invocation, [text,eitId])
        assert.strictEqual(Tasks.find().count(), 2)
      })

      
     


      
      it('Cannot add EIT if not logged in' ,() => {
        const text = {
          textUsername:'memort',
          userSurname: 'grrr', 
           country: 'Zim', 
             age :5
         }
        const insert = Meteor.server.method_handlers['eits.create']
        const invocation = {}
        assert.throws(() => insert.apply(invocation, [text]),
        Meteor.Error, '[Cannot add EIT if not logged in]'
        )
        assert.strictEqual(Tasks.find().count(),1)
      })


//Can edit own EIT

it('Can edit own EIT', () =>{
  const text = {
   textUsername:'memorvvt',
   userSurname: 'grrr', 
    country: 'Zim', 
      age :55
  }
  const editEIT = Meteor.server.method_handlers['eits.edit']
  const invocation = {userId}
  editEIT.apply(invocation, [text,])
  assert.strictEqual(Tasks.find().count(), 1)
})


//Cannot edit someone's EIT
it('Cannot edit someones EIT' ,() => {
  const text = {
    textUsername:'memort',
    userSurname: 'grrr', 
     country: 'Zim', 
       age :5
   }
  const edit = Meteor.server.method_handlers['eits.edit']
  const invocation = {}
  assert.throws(() => edit.apply(invocation, [text]),
  Meteor.Error, '[Cannot edit someones EIT]'
  )
  assert.strictEqual(Tasks.find().count(),1)
})


//Can view EITS

// Cannot delete bulky EITS you did not create
it('Cannot delete bulky EITS you did not create', () => {
  const deleteEITs = Meteor.server.method_handlers['eits.bulk_delete'];
  const userId = Random.id();
  const invocation = { userId }
  assert.throws(() => deleteEITs.apply(invocation, [eitId]))
  assert.equal(Tasks.find().count(), 1)

});


// Can do bulky delete
it('Can do bulky delete', () => {
  const secondEitId = Tasks.insert({
    text: 'test EIT',
    createdAt: new Date(),
    owner: userId,
    username: 'tmeasday',
  });

  const bulkyDeleteEIT = Meteor.server.method_handlers['eits.bulk_delete'];
  const invocation = { userId }
  bulkyDeleteEIT.apply(invocation, [[eitId, secondEitId]])
  assert.equal(Tasks.find().count(), 0)
});

//Can view EITs

it('Can view EITs', () => {
       const eitsPublication = Meteor.server.publish_handlers['EITS'];
       const invocation = {};
       const mestEITs = eitsPublication.apply(invocation);
       assert.equal(mestEITs.count(), 1);
     });

    });
  });
}