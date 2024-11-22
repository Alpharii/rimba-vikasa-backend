import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {User} from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });

    res.json({
      requestId: uuidv4(),
      data: user,
      message: null,
      success: true,
    });
  } catch (error: any) {
    res.status(400).json({
      requestId: uuidv4(),
      data: null,
      message: error.message,
      success: false,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({
      requestId: uuidv4(),
      data: {
        accessToken,
        refreshToken,
        expiredIn: 3600,
        user,
      },
      message: 'Login successful',
      success: true,
    });
  } catch (error: any) {
    res.status(400).json({
      requestId: uuidv4(),
      data: null,
      message: error.message,
      success: false,
    });
  }
};
