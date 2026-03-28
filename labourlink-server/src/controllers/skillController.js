import Skill from '../models/Skill.js';

// Get all skills
export const getAllSkills = async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    const skills = await Skill.find(query);

    res.status(200).json({
      message: 'Skills fetched',
      count: skills.length,
      skills
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

// Get skill by ID
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json({
      message: 'Skill fetched',
      skill
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill', error: error.message });
  }
};

// Create skill (Admin only)
export const createSkill = async (req, res) => {
  try {
    const { skillName, category, description, certificationRequired } = req.body;

    const skill = new Skill({
      skillName,
      category,
      description,
      certificationRequired: certificationRequired || false
    });

    await skill.save();

    res.status(201).json({
      message: 'Skill created',
      skill
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
};

// Get skills by category
export const getSkillsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const skills = await Skill.find({ category });

    res.status(200).json({
      message: 'Skills fetched',
      count: skills.length,
      skills
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

export default {
  getAllSkills,
  getSkillById,
  createSkill,
  getSkillsByCategory
};
