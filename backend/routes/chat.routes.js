import express from 'express';
import Chat from '../models/chat.model.js';
import { protect} from '../middleware/auth.middleware.js';

chatRouter.use(protect);

// Create a chat
chatRouter.post("/start", async (req, res) => {
    try {
        const { propertyId, buyerId:providedBuyerId, sellerId } = req.body;
        let buyerId, finalSellerId;
        if (req.user.role === "seller") {
            buyerId = providedBuyerId;
            finalSellerId = req.user._id;
        } else {
            buyerId = req.user._id;
            finalSellerId = sellerId;
        }

        if(!buyerId || !finalSellerId){
            return res.status(400).json({ 
                message: "Missing Buyer or Seller ID" 
            });
        }
        // check for an existing chat btw this buyer and seller
        let chat = await Chat.findOne({
            
        })
    } catch (err) {
    }
});