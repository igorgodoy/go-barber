import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const createdUser = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      password: '12345678',
    });

    const user = await showProfileService.execute(createdUser.id);

    expect(user.name).toBe('John Due');
    expect(user.email).toBe('johndue@example.com');
  });

  it('should not be able to show profile from non existing user', async () => {
    await expect(
      showProfileService.execute('non-existing-user'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
