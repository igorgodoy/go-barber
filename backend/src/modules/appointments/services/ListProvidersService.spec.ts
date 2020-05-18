import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      password: '12345678',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Die',
      email: 'johndie@example.com',
      password: '12345678',
    });

    const users = await listProvidersService.execute(loggedUser.id);

    expect(users).toEqual([userOne, userTwo]);
  });

  it('should be able to list all users without a logged user', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      password: '12345678',
    });

    const users = await listProvidersService.execute('');

    expect(users).toEqual([userOne, userTwo]);
  });
});
