import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
