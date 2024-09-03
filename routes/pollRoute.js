const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController'); 


// Routes
router.post('/polls', pollController.createPoll);
router.get('/polls', pollController.getAllPolls);
router.get('/poll/:id', pollController.getPollById);

router.post('/:id/vote', pollController.votePoll);
router.get('/polls/:id/results', pollController.getPollResults)
router.get('/polls/results', pollController.getAllResults);

module.exports = router;
