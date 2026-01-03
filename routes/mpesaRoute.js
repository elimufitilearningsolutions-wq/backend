import express from "express"
import generateToken from "../middlewares/generateToken.js"
import { callBack, stkPush } from "../controllers/mpesaController.js"

const mpesaRouter = express.Router()

mpesaRouter.post("/stk/push",generateToken, stkPush)
mpesaRouter.post("/callback", callBack)


export {mpesaRouter}

