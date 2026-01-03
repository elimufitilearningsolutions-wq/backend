import express from "express"
import { getAdministrationStatus, getSubscriptionStatus } from "../controllers/mpesaController.js";


const subscriptionRouter = express.Router();

subscriptionRouter.get('/status/:userId', getSubscriptionStatus)
subscriptionRouter.get("/admin/status/:userId", getAdministrationStatus)




export {subscriptionRouter}