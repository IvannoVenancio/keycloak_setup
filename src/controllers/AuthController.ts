import { Request, Response } from "express";
import AuthService  from "../services/AuthService";

export class AuthController {

async login(req: Request, res: Response) {
    try {
      const {username, password} = req.body
      const result: any = await AuthService.login({
        username,
        password,
      });
      if (!result.status) throw new Error(result.message);

      return res.status(200).json({
        response: { statusCode: res.statusCode, message: 'Success' },
        data: result.data,
      });
    } catch (err: any) {
     
      return res.status(401).json({
        response: {
          statusCode: res.statusCode,
          message: err.message.includes('Invalid user credentials')
            ? 'Usuário e/ou senha, incorrecto(s)'
            : err.message,
        },
        data: {},
      });
    }
  }


}