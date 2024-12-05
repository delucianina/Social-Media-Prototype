import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteFriend,
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} from '../controllers/userController';

const router = Router();



// GET - ALL USERS BY ID
router.get('/users/:userId', getUsers);

// GET - SINGLE USER BY ID
router.get('/users/:userId', getUser);

// POST - CREATE A NEW USER
router.post('/users', createUser);

// PUT - UPDATE USER BY ID
router.put('/users/:userId', updateUser);

// DELETE - REMOVE USER BY ID 
router.delete('/users/:userId', deleteUser);

// DELETE - REMOVE FRIEND FROM USERS FRIEND LIST
router.delete('/users/:userId/friends', deleteFriend);

// GET - GET ALL THOUGHTS
router.get('/thoughts', getAllThoughts);

// GET - GET A SINGLE THOUGHT BY ID
router.get('/thoughts/:thoughtId', getThoughtById);

// POST - ADD A NEW THOUGHT AND PUSH ID TO THE ASSOCIATED USER 
router.post('/users/:userId/thoughts', addThought);

// PUT - UPDATE THOUGHT BY ID 
router.put('/thoughts/:thoughtId', updateThought);

// DELETE - DELETE THOUGHT BY ID
router.delete('/thoughts/:thoughtId', deleteThought);

// POST - ADD A NEW REACTION 
router.post('/thoughts/:thoughtId/reactions', addReaction);

// DELETE - DELETE A REACTION 
router.delete('/thoughts/:thoughtId/reactions', deleteReaction);



export default router;