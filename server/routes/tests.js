import express from "express";
import { addItem, addNewCatalog, deleteAllItems, deleteItem, editNameCatalog, getTests, updateOptions } from "../controllers/tests.js";
import { verifyAdmin } from "../controllers/verify.js";

const router = express.Router();

router.post("/getTests", getTests);

router.post("/item/delete", deleteItem);

router.post("/catalog/addItem", addItem);
router.post("/catalog/delete", deleteAllItems);
router.post("/catalog/editName", editNameCatalog);
router.post("/catalog/addNewCatalog", addNewCatalog);
router.post("/catalog/updateOptions", updateOptions);

export default router;