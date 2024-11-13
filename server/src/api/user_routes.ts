import {Router, Request, Response} from 'express';
import { Shop, Wine } from '../../models/index.js';
import { isAuthenticated } from '../helpers/index.js';

const router = Router();




// Get user shops
// localhost:3333/api/shops/user
router.get('/shops/user', isAuthenticated, async(req: Request, res: Response) => {
  const userShops = await Shop.findAll({
    where: {
      user_id: req.user.id  
    }
  });

  res.json(userShops);
});




// Create a shop
router.post('/shop', isAuthenticated, async (req: Request, res: Response) => {
  try {
    await Shop.create({
      ...req.body,
      user_id: req.user.id
    });

    res.json({
      message: 'Shop created successfully!'
    })
  } catch (error) {
    console.log('create shop error', error);
    res.status(500).json({
      message: 'There was a problem creating the shop'
    });
  }
});





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





// Delete a shop
router.delete('/shop', isAuthenticated, async (req: Request, res: Response) => {
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





export default router;