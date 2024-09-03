const Poll = require('../models/pollModel'); 

exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    console.log(question, options)
    if (options.length !== 3) {
      return res.status(400).json({ message: 'You must provide exactly 3 options.' });
    }

    const poll = new Poll({ question, options });
    await poll.save();

    res.status(201).json(poll);
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find({});

    res.status(200).json(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    res.status(200).json(poll);
  } catch (error) {
    console.error('Error fetching poll:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Handle voting

exports.votePoll = async (req, res) => {
  try {
    const { option } = req.body;
    const { id } = req.params;

    console.log(`Received vote for poll ${id}, option: ${option}`);

    const poll = await Poll.findById(id);

    if (!poll) {
      console.log(`Poll not found: ${id}`);
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (!poll.options.includes(option)) {
      console.log(`Invalid option: ${option}`);
      return res.status(400).json({ message: 'Invalid option' });
    }

    poll.votes.push({ option });
    await poll.save();

    console.log(`Vote recorded successfully for poll ${id}`);

    // Get the io instance from app
    const io = req.app.get('io');
    if (io) {
      const updatedPoll = await Poll.findById(id);
      const results = {
        _id: updatedPoll._id,
        question: updatedPoll.question,
        options: updatedPoll.options.map(option => ({
          text: option,
          votes: updatedPoll.votes.filter(vote => vote.option === option).length
        }))
      };
      io.to(id).emit('vote update', results);
      console.log(`Vote update emitted for poll ${id}`);
    } else {
      console.log('Warning: io object not found on app');
    }

    res.status(200).json(poll);
  } catch (error) {
    console.error('Error voting:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPollResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    const results = {
      _id: poll._id,
      question: poll.question,
      options: poll.options.map(option => ({
        text: option,
        votes: poll.votes.filter(vote => vote.option === option).length
      }))
    };

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching poll results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllResults = async (req, res) => {
  try {
    const polls = await Poll.find({});
    const sortedPolls = polls.map(poll => {
      const voteCounts = poll.options.map(option => {
        const voteCount = poll.votes.filter(vote => vote.option === option).length;
        return { option, voteCount };
      });

      const maxVotesOption = voteCounts.reduce((prev, current) =>
        prev.voteCount > current.voteCount ? prev : current
      );

      return { ...poll._doc, maxVotesOption };
    }).sort((a, b) => b.maxVotesOption.voteCount - a.maxVotesOption.voteCount);

    res.status(200).json(sortedPolls);
  } catch (error) {
    console.error('Error fetching all poll results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
  