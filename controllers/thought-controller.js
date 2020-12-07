const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getThought(req, res) {
        Thought.find()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(data);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    postThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return User.findOneAndUpdate(
                    { username: data.username },
                    { $pull: { thoughts: req.params.id } },
                    { new: true }
                );
            })
            .then(dbData => {
                if (!dbData) {
                    return res.status(404).json({ message: 'No user found under this name! ' })
                }

                res.json({ message: "Thought deleted!" });
            })
            .catch(err => res.json(err))
    },
    postReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'No thought found with this id! ' });
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;