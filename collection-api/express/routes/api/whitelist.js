const router = require("express").Router();
const controllers = require("../../controllers/whitelist.controller");

router.get("/", controllers.onGetAll);
router.get("/:id", controllers.onGetById);
router.post("/", controllers.onInsert);
router.delete("/:id", controllers.onDelete);

module.exports = router;
