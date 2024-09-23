import Router from "express";
import { authenticationJWT } from "../middleware/authMiddleware";

import { getAllActive, getItemByCode, createItem, updateItem, deleteItem, getFiltered } from "../services/item";

const router = Router();

// router.use(authenticationJWT);

//show all items 
router.get("/active", async (req, res) => {
  getAllActive(res);
});
//filtered query
router.get("/filter/:filters", async (req, res) => {
  getFiltered(req, res);
});

//show item details
router.get("/:code", async (req, res) => {
  getItemByCode(req, res);
});

//add a item
router.post("/", authenticationJWT, async (req, res) => {
  createItem(req, res);
});

//update specific item
router.put("/:code", async (req, res) => {
  updateItem(req, res);
});

//delete specific item
router.delete("/:code",authenticationJWT, async (req, res) => {
  deleteItem(req, res);
});

export default router;
