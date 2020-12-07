
const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    postThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router
    .route('/')
    .get(getThought)
    .post(postThought);

// /api/thoughts/<thoughtId>/
router
    .route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/<thoughtId>/reactions
router
    .route(':id/reactions')
    .post(postReaction)

// /api/thoughts/<thoughtId>/<reactionId>
router
    .route('/:id/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;