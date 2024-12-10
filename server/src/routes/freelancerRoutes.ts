import express from 'express';
import {
  getAllFreelancers,
  getFreelancerById,
  createFreelancer,
  updateFreelancer,
  deleteFreelancer
} from '../controllers/freelancer.controller';

const router = express.Router();

// Get all freelancers
router.get('/', getAllFreelancers);

// Get a single freelancer
router.get('/:id', getFreelancerById);

// Create a new freelancer
router.post('/', createFreelancer);

// Update a freelancer
router.put('/:id', updateFreelancer);

// Delete a freelancer
router.delete('/:id', deleteFreelancer);

export default router;
