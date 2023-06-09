// post based routes
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import prisma from './prisma';
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
// middleware -> Parse incoming request bodies in a middleware before your handlers, available under the req.body property
router.use(bodyParser.json());
// middleware for cross-origin resource sharing -> allows restricted resources on a web page to be requested from another domain outside the original domain
router.use(cors());
// post a post
router.post("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructuring the request body -> extract properties
        const { title, category, thought } = req.body;
        const post = yield prisma.post.create({
            data: {
                title,
                category,
                thought,
            },
        });
        res.status(201).json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to create post' });
    }
}));
// delete a post
router.delete("/api/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // id as the unique identifier in the database for the post to be deleted
    const { id } = req.params;
    yield prisma.post.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
}));
// Update a post
router.put("/api/posts/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, thought } = req.body;
    const { postId } = req.params;
    try {
        // Update the post in the database
        const updatedPost = yield prisma.post.update({
            // postId as the unique identifier of the updated post (URL parameter -> matches the parameter name in the route definition)
            where: { id: parseInt(postId) },
            data: { title, thought },
        });
        // Send the updated post as a response
        res.status(200).json(updatedPost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating post' });
    }
}));
export default router;
