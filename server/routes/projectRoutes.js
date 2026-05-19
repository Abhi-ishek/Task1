import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createProject,
  getProjects,
  getSingleProject,
  deleteProject,
} from "../controller/projectController.js";

import { projectValidation } from "../validators/projectValidator.js";

import validate from "../middleware/validationMiddleware.js";


const router = express.Router();


// admin create project
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
   projectValidation,
  validate,
  createProject
);


// all logged users
router.get("/", protect, getProjects);


// single project
router.get("/:id", protect, getSingleProject);


// delete project (admin only)
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProject
);

export default router;