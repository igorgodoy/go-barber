import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentsService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointmentsService: CreateAppointmentsService;

describe('CreateAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointmentsService = new CreateAppointmentsService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const createdAppointment = await createAppointmentsService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '1234',
      user_id: '12345',
    });

    expect(createdAppointment).toHaveProperty('id');
    expect(createdAppointment.provider_id).toBe('1234');
    expect(createdAppointment.user_id).toBe('12345');
  });

  it('should not be able to create two appointments on same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentsService.execute({
      date: appointmentDate,
      provider_id: '1234',
      user_id: '12345',
    });

    await expect(
      createAppointmentsService.execute({
        date: appointmentDate,
        provider_id: '1234',
        user_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentsService.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '1234',
        user_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentsService.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '1234',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentsService.execute({
        date: new Date(2020, 4, 10, 7),
        provider_id: '1234',
        user_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentsService.execute({
        date: new Date(2020, 4, 10, 18),
        provider_id: '1234',
        user_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
