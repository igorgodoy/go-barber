import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appoinmentOne = await fakeAppointmentsRepository.create({
      provider_id: '1234',
      user_id: '12345',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const appoinmentTwo = await fakeAppointmentsRepository.create({
      provider_id: '1234',
      user_id: '12345',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: '1234',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual([appoinmentOne, appoinmentTwo]);
  });
});
