import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  }
}
