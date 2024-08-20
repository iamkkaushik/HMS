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

const app = express();
config();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL1],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// app.use(cors());

//config({ path: "./config.env" });
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// origin: [process.env.FRONTEND_URL1,process.env.FRONTEND_URL2],
// origin: ["https://hms-cp1r.vercel.app","https://hms-cp1r-8q9ivwffm-kaushiks-projects-199413ab.vercel.app"],



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
