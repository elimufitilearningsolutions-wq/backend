import express from "express"
import {  getUserById, getUsers, login, logout, signup, updateUser } from "../controllers/auth.js";
import authenticateUser from "../middlewares/authenticateUser.js";



const authRouter = express.Router()
 authRouter.post("/signup", signup);
 authRouter.put('/updateUser/:user_id', updateUser);
 authRouter.post("/login",login) 
 authRouter.post("/logout/:userId", logout);

 authRouter.get("/users", getUsers)
 authRouter.get("/users/:id", getUserById)


export {authRouter}