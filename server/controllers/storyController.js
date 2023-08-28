const storyModel = require("../models/stroyModel");
const userModel = require("../models/userModel");

const createStory = async (req, res) => {
    try {
        const forms = req.body.forms;

        if (forms.length < 2) {
            res.send({
                message: "No forms found"
            });
            return;
        }
        const result = await storyModel.create(forms);
        res.send({
            message: "Forms saved successfully"
        });
    } catch (error) {
        console.error("Error forms:", error);
        res.send({
            error: "An error occurred"
        });
    }
};



const getAllStory = async (req, res) => {
    try {
        const story = await storyModel.find();
        res.send(story);
    } catch (error) {
        res.send(error);
    }
};


const getFilteredStories = async (req, res) => {
    try {
        let category = req.query.category || "";

        const filterStories =
            category === "all"
                ? await storyModel.find()
                : await storyModel.find({ category });

        return res.send(filterStories);
    } catch (error) {
        return res.send(error);
    }
};


const getSingleStory = async (req, res) => {
    const { id } = req.params;

    try {
        const story = await storyModel.findById(id);

        res.send(story);
    } catch (error) {
        res.send(error);
    }
};


const addToBookmark = async (req, res) => {
    const storyData = req.body.storyData;
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);
        console.log(user);
        await user.updateOne({ $push: { bookmarksStories: storyData } });

        res.status(200).json({
            status: "Saved to Bookmarks",
            bookMarkedStories: user.bookmarksStories,
        });
    } catch (error) {
        res.send(error);
    }
};


const updateStory = async (req, res) => {
    const storyId = req.params.id;
    const { userId } = req.body;

    try {
        const story = await storyModel.findById(storyId);

        if (story.userId === userId) {
            await story.updateOne({ $set: req.body });
            res.send("Story Updated");
        } else {
            res.send("Action forbidden");
        }
    } catch (error) {
        res.send(error);
    }
};


const likeStory = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const story = await storyModel.findById(id);
        const isLiked = story.likes.includes(userId);
        if (isLiked) {
            await story.updateOne({ $pull: { likes: userId } });
            res.send({ status: "Liked", storyLikes: story.likes });
        } else {
            await story.updateOne({ $push: { likes: userId } });
            res.send({ status: "unliked", storyLikes: story.likes });
        }
    } catch (error) {
        res.send(error);
    }
};


const getCurrentUserStories = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const currentUserStories = await storyModel.find({ userId });
        res.send(currentUserStories.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    createStory,
    getSingleStory,
    getAllStory,
    getCurrentUserStories,
    getFilteredStories,
    updateStory,
    likeStory,
    addToBookmark,
};
