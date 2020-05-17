import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentsService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentsService: CreateAppointmentsService;

describe('CreateAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentsService = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const createdAppointment = await createAppointmentsService.execute({
      date: new Date(),
      provider_id: '1234',
    });

    expect(createdAppointment).toHaveProperty('id');
    expect(createdAppointment.provider_id).toBe('1234');
  });

  it('should not be able to create two appointments on same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentsService.execute({
      date: appointmentDate,
      provider_id: '1234',
    });

    await expect(
      createAppointmentsService.execute({
        date: appointmentDate,
        provider_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
