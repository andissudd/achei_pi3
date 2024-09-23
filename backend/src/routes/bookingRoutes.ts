import Router from "express";
import { authenticationJWT } from "../middleware/authMiddleware";

import { getAllActive, getAlert, getBookingByCode, createBooking, updateBooking, deleteBooking } from "../services/booking";

const router = Router();

// router.use(authenticationJWT);

//show all items 
router.get("/active", authenticationJWT,async (req, res) => {
  getAllActive(res);
});

router.get("/alert/:id", authenticationJWT,async (req, res) => {
  getAlert(req,res);
});

//show item details
router.get("/:code", authenticationJWT,async (req, res) => {
  getBookingByCode(req, res);
});

//add a item
router.post("/", authenticationJWT,async (req, res) => {
  createBooking(req, res);
});

//update specific item
router.put("/:code", async (req, res) => {
  updateBooking(req, res);
});

//delete specific item
router.delete("/:code", authenticationJWT,async (req, res) => {
  deleteBooking(req, res);
});

export default router;
