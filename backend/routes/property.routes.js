import express from "express";
import { getAllProperties, getPropertyById, deleteProperty, addInquiry, getMyProperties, addProperty, getPropertyCounts } from "../controllers/property.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { updatePropertyStatus, getSellerDashboard } from "../controllers/property.controller.js";
import Inquiry from "../models/inquiry.model.js";


const propertyRouter = express.Router();

propertyRouter.get("/", getAllProperties);

//protect routes that only seller can do these works
propertyRouter.post("/", protect, authorize("seller"),upload.array("images", 10),addProperty);
propertyRouter.get("/:my", protect, authorize("seller"), getMyProperties);
propertyRouter.put("/:id", protect, authorize("seller"), upload.array("images", 10), updateProperty);


propertyRouter.delete("/:id", protect, authorize("seller"), deleteProperty);
propertyRouter.patch("/:id/status", protect, authorize("seller"), updatePropertyStatus);

propertyRouter.get("/counts", getPropertyCounts);
propertyRouter.get("/:id", getPropertyById);

propertyRouter.get("/seller/dashboard", protect, authorize("seller"), getSellerDashboard);

export default propertyRouter;