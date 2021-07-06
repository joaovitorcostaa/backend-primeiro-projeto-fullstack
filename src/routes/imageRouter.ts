import imageController  from "../controller/ImageController";
import express from "express"

export const imageRouter = express.Router()

imageRouter.post("/create", imageController.createImage)
imageRouter.get("/:id", imageController.getImageById)
imageRouter.get("/", imageController.getAllImage)