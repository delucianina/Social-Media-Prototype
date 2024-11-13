import mongoose from 'mongoose';

const { Schema, model } = mongoose;



//  CODE FOR ADDING A 'LIKE' SYSTEM 
// const reactionSchema = new Schema({
//   user: {
//       type: Schema.Types.ObjectId,
//       ref: 'User'
//   }
// });



const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: [1, 'Your thought must be at least 1 character in length'],
    maxLength: [280, 'Your thought must be less than 280 characters in length']
  },
  createdAt: {
    type: Date,
    // ------- ASK ABOUT THIS: 
    default: Date.now,
    get: (createdAt: Date) => createdAt.toLocaleString()
  },
  username: {
    type: Schema.Types.ObjectId,
    required: [true, 'You must attach the user _id to the post'],
    ref: 'User'
  },
  // ----------------------
  // ----  IS THIS CORRECT? 
  // ----------------------
  reaction: [{
    reactionId: {
      user: Schema.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: [280, 'Your comment must be 280 characters or less']
    },
    username: {
      type: String, 
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt: Date) => createdAt.toLocaleString()
    }
  }]
});


// ----- ASK ABOUT THIS TOO
// thoughtSchema.virtual('reactionCount').get(function() {
//   return this.likes.length;
// });



// pass in model method: give name we want to call it, then the schema 
const Thought = model('Thought', thoughtSchema);

// export it 
export default Thought;