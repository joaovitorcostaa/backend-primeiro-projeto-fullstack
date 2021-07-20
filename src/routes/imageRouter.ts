import imageController  from "../controller/ImageController";
import express from "express"

export const imageRouter = express.Router()

imageRouter.post("/create", imageController.createImage)
imageRouter.get("/all", imageController.getAllImage)
imageRouter.get("/:id", imageController.getImageById)