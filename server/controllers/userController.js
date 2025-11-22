import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({ success: false, message: "Job Not Found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({ success: true, message: "Applied successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getUserJobApplication = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const application = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!application) {
      return res.json({
        success: false,
        message: "No job application found for the user.",
      });
    }

    return res.json({ success: true, application }); // Keep as application since that's what frontend expects
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found. Please sign out and sign in again." });
    }

    if (!resumeFile) {
      return res.json({ success: false, message: "No resume file uploaded" });
    }

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        resource_type: "auto",
        folder: "resumes",
      });
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();
    return res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};