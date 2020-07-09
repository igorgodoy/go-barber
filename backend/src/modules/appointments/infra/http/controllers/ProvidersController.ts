import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id: except_user_id } = req.user;

    const listProvidersService = container.resolve(ListProvidersService);

    const users = await listProvidersService.execute(except_user_id);

    return res.json(classToClass(users));
  }
}
