import Router from "express";
import { authenticationJWT } from "../middleware/authMiddleware";

import { getAllActive, getItemByCode, createItem, updateItem, deleteItem } from "../services/item";

const router = Router();

// router.use(authenticationJWT);

//show all items 
router.get("/active", async (req, res) => {
  getAllActive(res);
});

//show item details
router.get("/:code", async (req, res) => {
  getItemByCode(req, res);
});

//add a item
router.post("/", async (req, res) => {
  createItem(req, res);
});

//update specific item
router.put("/:code", async (req, res) => {
  updateItem(req, res);
});

//delete specific item
router.delete("/:code", async (req, res) => {
  deleteItem(req, res);
});

export default router;
