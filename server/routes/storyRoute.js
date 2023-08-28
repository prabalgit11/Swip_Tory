const express = require("express");
const {
    createStory,
    getAllStory,
    getCurrentUserStories,
    getFilteredStories,
    getSingleStory,
    updateStory,
    likeStory,
    addToBookmark,
} = require("../controllers/storyController");
const router = express.Router();

router.post("/create/:id", createStory);
router.get("/", getAllStory);
router.get("/:id/mystory", getCurrentUserStories);
router.get("/category", getFilteredStories);
router.get("/singlestory/:id", getSingleStory);
router.put("/update/:id", updateStory);
router.put("/like/:id", likeStory);
router.post("/bookmark/:userId", addToBookmark);


module.exports = router;