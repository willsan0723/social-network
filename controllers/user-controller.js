const { Thought, User, Reaction } = require('../models');

const userController = {
    getUser(req, res) {
        User.find()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
}