import userController  from "../controller/UserController";
import express from "express";

export const userRouter = express.Router()

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.get("/:id", userController.getUserById)