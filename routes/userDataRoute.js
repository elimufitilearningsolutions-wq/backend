import express from "express"
import userData from "../controllers/userData.js"


const userDataRoute = express.Router()

userDataRoute.post("/id", userData)

export {userDataRoute}