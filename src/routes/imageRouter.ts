import imageController  from "../controller/ImageController";
import express from "express"

export const imageRouter = express.Router()

imageRouter.post("/create", imageController.createImage)