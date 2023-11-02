const express = require("express");

const router = express.Router();

//controller
const controller = require("../controllers/user.controller");

router.get("/", controller.listAllUsers);
router.get("/:id", controller.listSingleUser);
router.post("/new", controller.createNewUser);
router.patch("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.patch("/:id/update/reward", controller.updateReward);
router.patch("/:id/update/revert-reward", controller.revertReward);

module.exports = router;
