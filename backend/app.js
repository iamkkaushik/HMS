import express from "express";
import { dbConnection }from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
config({ path: "./config/config.env" });
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL1],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();
    // .then(() => {
    //     // Start your server only after the DB connection is established
    //     app.listen(process.env.PORT || 3000 ,  () => {
    //         console.log(`Server running on port ${process.env.PORT || 3000}`);
    //     });
    // })
    // .catch((err) => {
    //     console.error('Failed to connect to MongoDB, server not started', err);
    // });
app.use(errorMiddleware);
export default app;
