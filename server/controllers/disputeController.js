import Dispute from '../models/Dispute.js';

export const raiseDispute = async (req, res) => {
  try {
    const { fullname, course, date, reason, userId } = req.body;
    if (!fullname || !course || !date || !reason || !userId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newDispute = new Dispute({ fullname, course, date, reason, userId  });
    await newDispute.save();
    res.status(201).json({ message: 'Dispute submitted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting dispute.' });
  }
};

export const getAllDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find().sort({ submittedAt: -1 });
    res.json(disputes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve disputes.' });
  }
};

export const updateDisputeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const dispute = await Dispute.findByIdAndUpdate(id, { status }, { new: true });

    if (!dispute) {
      return res.status(404).json({ message: 'Dispute not found.' });
    }

    res.json({ message: 'Status updated successfully.', dispute });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status.' });
  }
};

export const getUserDisputes = async (req, res) => {
  try {
    const { userId } = req.params;
    const disputes = await Dispute.find({ userId }).sort({ submittedAt: -1 });
    res.json(disputes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve user disputes.' });
  }
};

