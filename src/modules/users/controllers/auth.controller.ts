import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';

//TODO: Move to a shared file
export interface IErrorResponse {
  message: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const response = await registerUser(email, password, role);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: (error as IErrorResponse).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    res.json(response);
  } catch (error) {
    res.status(401).json({ error: (error as IErrorResponse).message });
  }
};
