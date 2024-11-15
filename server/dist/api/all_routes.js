import { Router } from 'express';
import { User } from '../models/index.js';
const router = Router();
// GET LIST OF USERS 
// localhost:3333/api/users
router.get('/users', async (_, res) => {
    try {
        const userList = await User.find({});
        res.json(userList);
    }
    catch (err) {
        console.error('Error finding all users', err);
        res.status(500).json({
            message: 'There was a problem finding all users'
        });
    }
});
// CREATE A GET ROUTE THAT RETRIEVES JUST ONE USER
// WRITE THE ROUTE HERE 
// -------------
// LEFT OFF HERE 
// -------------
// Create a new User 
router.post('/newUser', async (req, res) => {
    try {
        const userData = await User.create({
            ...req.body,
        });
        res.json({
            message: 'User created successfully!',
            user: userData
        });
    }
    catch (error) {
        console.log('create user error', error);
        res.status(500).json({
            message: 'There was a problem creating the user'
        });
    }
});
/*
// -------------
// USE THIS AS REFERENCE TO CREATE A POST?
// -------------

// Add a wine to a shop
router.post('/wine', isAuthenticated, async (req: Request, res: Response) => {
  // Find the shop using the logged in users's id and the ShopId provided through req.body from the client/browser
  const userShop = await Shop.findOne({
    where: {
      user_id: req.user.id,
      id: req.body.ShopId
    }
  });

  // If we didn't find the shop then they are not the owner
  if (!userShop) {
    res.status(401).json({
      message: 'Error in finding that shop. Please make sure the ShopId is correct and you are the owner.'
    });
    return;
  }

  try {
    const wine = await Wine.create({
      ...req.body,
      user_id: req.user.id
    });

    res.json({
      wine,
      message: 'Wine added successfully!'
    })
  } catch (error) {
    console.log('WINE CREATE ERROR', error);
    res.status(500).json({
      message: 'There was a problem adding a wine'
    });
  }
});

*/
/*

// -------------
// USE THIS AS REFERENCE TO DELETE A USER
// -------------

// Delete a shop
router.delete('/shop', async (req: Request, res: Response) => {
  // Find the shop using the logged in users's id and the ShopId provided through req.body from the client/browser
  const userShop = await Shop.findOne({
    where: {
      user_id: req.user.id,
      id: req.body.ShopId
    }
  });

  // If we didn't find the shop then they are not the owner
  if (!userShop) {
    res.status(401).json({
      message: 'You are cannot delete a shop you did not create'
    });
    return;
  }

  try {
    // Delete the shop row from the Shops table
    await Shop.destroy({
      where: {
        id: req.body.ShopId
      }
    });

    res.json({
      message: 'Shop deleted successfully!'
    })
  } catch (error) {
    console.log('SHOP DELETE ERROR', error);
    res.status(500).json({
      message: 'There was a problem deleting a shop'
    });
  }
});

*/
export default router;
