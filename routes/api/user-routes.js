
const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    postUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');
router
    .route('/')
    .get(getUser)
    .post(postUser);

router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/<userId>/friends/<friendId>
router
    .route('/:userId/friends/').post(addFriend);

router
    .route('/:userId/friends/:id').delete(deleteFriend);

module.exports = router;