import Router from "express";
import { authenticationJWT } from "../middleware/authMiddleware";

import { getAllActive, getBookingByCode, createBooking, updateBooking, deleteBooking } from "../services/booking";

const router = Router();

// router.use(authenticationJWT);

//show all items 
router.get("/active", async (req, res) => {
  getAllActive(res);
});

//show item details
router.get("/:code", async (req, res) => {
  getBookingByCode(req, res);
});

//add a item
router.post("/", async (req, res) => {
  createBooking(req, res);
});

//update specific item
router.put("/:code", async (req, res) => {
  updateBooking(req, res);
});

//delete specific item
router.delete("/:code", async (req, res) => {
  deleteBooking(req, res);
});

export default router;
