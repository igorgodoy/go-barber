import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute(user_id);

    delete user.password;

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    delete user.password;

    return res.json(user);
  }
}
