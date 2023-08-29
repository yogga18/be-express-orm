import { Request, Response } from 'express';
import Authtentication from '../utils/Authtentication';

const db = require('../db/models');

class AuthRoutes {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;

    const hashedPassowrd: string = await Authtentication.Authtentication(
      password
    );

    await db.user.create({
      username: username,
      password: hashedPassowrd,
    });

    return res.status(200).send({
      success: true,
      message: 'User created successfully',
      //   data: createdUser,
    });
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body; // 1. get username and password from request body

    // 1. check data user by username from database
    const user = await db.user.findOne({
      where: { username },
    });

    // 2. Check Password
    if (user) {
      let userPwdCompare = await Authtentication.passwordCompare(
        password,
        user.password
      );

      let token = Authtentication.generateToken(
        user.id,
        username,
        user.password
      );

      if (userPwdCompare) {
        return res.status(200).send({
          success: true,
          message: 'Login success',
          data: token,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'Wrong password',
          data: {},
        });
      }
    }

    return res.status(400).send({
      success: false,
      message: 'Login failed',
    });

    // 3. Generate Token
  };

  profile = (req: Request, res: Response): Response => {
    return res.status(200).send({
      success: true,
      message: 'Profile',
      data: req.app.locals.credential,
    });
  };
}

export default new AuthRoutes();
