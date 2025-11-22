import express from "express";
import {
  changeJobApplicationStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJob,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/componyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

//register a company
router.post("/register", upload.single("image"), registerCompany);

//como log
router.post("/login", loginCompany);

// get com data
router.get("/company", protectCompany, getCompanyData);

//post a job
router.post("/post-job", protectCompany, postJob);

//get applicants data of company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

//get copm job list
router.get("/list-jobs", protectCompany, getCompanyPostedJob);

//change apppli status
router.post("/change-status", protectCompany, changeJobApplicationStatus);

//change appli visiblity
router.post("/change-visiblity", protectCompany, changeVisiblity);

export default router;
