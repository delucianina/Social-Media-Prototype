import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';
import { errorHandler } from '../schema/helpers/index';


// GET ALL USERS
export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
};


// GET A SINGLE USER 
export const getUser = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  const user = await User.findById(user_id).populate({
    path: 'thoughts',
    select: 'reactionBody'
  });

  res.json({ user });
};


// CREATE A NEW USER 
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json({
      user: user,
    })
  } catch (error: any) {
    res.status(400).send(errorHandler(error));
    const errors: String[] = [];

    if (error.code === 11000) {
      errors.push('That email is currently in use');
    } else {
      for (let key in error.errors) {
        errors.push(error.errors[key].message);
      }
    }
    res.status(403).json(errors);
  }
};


// PUT UPDATE USER BY ID 
export const updateUser = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  const username = req.body.userame;

  const updatedUser = await User.findByIdAndUpdate(user_id, { username: username }, { new: true });

  res.json({
    message: "User info updated",
    user: updatedUser
  })
}


// DELETE USER BY ID
export const deleteUser = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  await User.deleteOne({ _id: user_id });

  res.json({
    message: "User deleted"
  })
}

// POST add a friend to list 
export const addFriend = async (req: Request, res: Response) => {
  const friend_id = req.body.friend_id;

  await User.findByIdAndUpdate(req.params.userId, {
    $push: { friends: friend_id }
  })

  res.json({ message: "friend added to list" })
}


// DELETE FRIEND BY ID
export const deleteFriend = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  const friend_id = req.body.friend_id;

  await User.findByIdAndUpdate(req.params.userId, {
    $pull: { friends: friend_id }
  });

  res.json({
    message: "friend deleted"
  })
}


// GET ALL THOUGHTS FROM ALL USERS 
export const getAllThoughts = async (_: Request, res: Response) => {
  try {
    const thoughts = await User.find().populate({
      path: 'user',
    });
    res.json(thoughts);
  } catch (error) {
    res.status(500).send(errorHandler(error));
  }
}


// GET A SINGLE THOUGHT BY THOUGHT ID
export const getThoughtById = async (req: Request, res: Response) => {
  const thought_id = req.params.thought_id;
  const user = await Thought.findById(thought_id);

  res.json({ user });
}


// POST ADD A THOUGHT TO A USER
export const addThought = async (req: Request, res: Response) => {
  const thought = await Thought.create(req.body);

  await User.findByIdAndUpdate(req.params.userId, {
    $push: { thoughts: thought._id }
  });
  res.json({ thought });
}


// PUT UPDATE THOUGHT BY THOUGHT ID 
export const updateThought = async (req: Request, res: Response) => {
  const thought_id = req.params.thought_id;
  const thought = req.body.thought;

  const updatedThought = await Thought.findByIdAndUpdate(thought_id, { thought: thought }, { new: true });

  res.json({
    message: "Thought updated",
    thought: updatedThought
  })
}


// DELETE THOUGHT BY THOUGHT ID 
export const deleteThought = async (req: Request, res: Response) => {
  const thought_id = req.params.thought_id;

  await Thought.deleteOne({ _id: thought_id });

  res.json({
    message: "Thought deleted"
  })
}


// POST ADD A REACTION TO A THOUGHT 
export const addReaction = async (req: Request, res: Response) => {
  try {
    const { reaction, username } = req.body.reaction;
    const thought_id = req.params.thought_id;

    const updatedThought = await Thought.findByIdAndUpdate(thought_id, {
      $push: { reactions: { reaction, username, createdAt: new Date() } }
    },
      { new: true }
    );

    res.json({
      message: "Reaction added",
      thought: updatedThought
    });
  } catch (error) {
    res.status(500).send(errorHandler);
  }
}


// DELETE REACTION BY REACTION ID
export const deleteReaction = async (req: Request, res: Response) => {
  const thought_id = req.params.thought_id;
  const reaction_id = req.body.reaction_id;

  try {
    await Thought.findByIdAndUpdate(thought_id, {
      $pull: { reactions: { _id: reaction_id } }
    });
    
    res.json({
      message: "Reaction deleted"
    })
  } catch (error) {
    res.status(500).send(errorHandler);
  }
}