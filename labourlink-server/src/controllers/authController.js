import Worker from '../models/Worker.js';
import Contractor from '../models/Contractor.js';
import { hashPassword, comparePassword, generateToken, validateEmail, validatePhone } from '../utils/helpers.js';

// Register Worker
export const registerWorker = async (req, res) => {
  try {
    const { name, email, phone, password, location, primarySkill } = req.body;

    console.log('Register Worker Request:', { name, email, phone });

    // Validation
    if (!name || !email || !phone || !password) {
      console.log('Missing fields:', { name: !!name, email: !!email, phone: !!phone, password: !!password });
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!validateEmail(email)) {
      console.log('Invalid email:', email);
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePhone(phone)) {
      console.log('Invalid phone:', phone);
      return res.status(400).json({ message: 'Invalid phone number format (must be 10 digits starting with 6-9)' });
    }

    // Check if worker already exists
    const existingWorker = await Worker.findOne({ $or: [{ email }, { phone }] });
    if (existingWorker) {
      console.log('Worker already exists with email or phone');
      return res.status(400).json({ message: 'Worker with this email or phone already exists' });
    }

    // Hash password and create worker
    const hashedPassword = await hashPassword(password);
    const worker = new Worker({
      name,
      email,
      phone,
      password: hashedPassword,
      location,
      primarySkill
    });

    await worker.save();
    console.log('Worker created successfully:', worker._id);

    // Generate token
    const token = generateToken(worker._id, 'worker');

    res.status(201).json({
      message: 'Worker registered successfully',
      token,
      worker: {
        id: worker._id,
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        primarySkill: worker.primarySkill
      }
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    console.error('Error details:', error);
    res.status(500).json({ message: 'Error registering worker', error: error.message });
  }
};

// Register Contractor
export const registerContractor = async (req, res) => {
  try {
    const { name, email, phone, password, companyName, location } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Check if contractor already exists
    const existingContractor = await Contractor.findOne({ $or: [{ email }, { phone }] });
    if (existingContractor) {
      return res.status(400).json({ message: 'Contractor with this email or phone already exists' });
    }

    // Hash password and create contractor
    const hashedPassword = await hashPassword(password);
    const contractor = new Contractor({
      name,
      email,
      phone,
      password: hashedPassword,
      companyName,
      location
    });

    await contractor.save();

    // Generate token
    const token = generateToken(contractor._id, 'contractor');

    res.status(201).json({
      message: 'Contractor registered successfully',
      token,
      contractor: {
        id: contractor._id,
        name: contractor.name,
        email: contractor.email,
        companyName: contractor.companyName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering contractor', error: error.message });
  }
};

// Login Worker
export const loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const worker = await Worker.findOne({ email }).select('+password');
    if (!worker) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, worker.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(worker._id, 'worker');

    res.status(200).json({
      message: 'Login successful',
      token,
      worker: {
        id: worker._id,
        name: worker.name,
        email: worker.email,
        primarySkill: worker.primarySkill
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Login Contractor
export const loginContractor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const contractor = await Contractor.findOne({ email }).select('+password');
    if (!contractor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, contractor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(contractor._id, 'contractor');

    res.status(200).json({
      message: 'Login successful',
      token,
      contractor: {
        id: contractor._id,
        name: contractor.name,
        email: contractor.email,
        companyName: contractor.companyName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
