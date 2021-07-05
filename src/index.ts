import { app } from "./controller/app"
import { userRouter } from "./routes/userRouter"
import { imageRouter } from "./routes/imageRouter"

app.use("/user", userRouter)
app.use("/image", imageRouter)