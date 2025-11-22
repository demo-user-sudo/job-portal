import express from "express";
// import { clerkMiddleware } from "@clerk/express";
import {
  applyForJob,
  getUserData,
  getUserJobApplication,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

// Apply clerk middleware to all user routes
// router.use(clerkMiddleware());

//get userdata
router.get("/user", getUserData);

//apply for a job
router.post("/apply", applyForJob);

//get applied job data
router.get("/applications", getUserJobApplication);

//update user profile(resume)
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
