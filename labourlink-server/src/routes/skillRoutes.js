import express from 'express';
import { getAllSkills, getSkillById, getSkillsByCategory } from '../controllers/skillController.js';

const router = express.Router();

// Get all skills
router.get('/', getAllSkills);

// Get skill by ID
router.get('/:id', getSkillById);

// Get skills by category
router.get('/category/:category', getSkillsByCategory);

export default router;
