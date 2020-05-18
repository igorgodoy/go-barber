import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(except_user_id: string): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id,
    });

    return users;
  }
}

export default ListProvidersService;
