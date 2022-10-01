import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

describe('Accounts Controller', () => {
  let controller: AccountsController;
  let service: AccountsService;

  const date = new Date(new Date().toISOString());
  const createAccountDto: CreateAccountDto = {
    userEmail: 'Cloyd16@hotmail.com',
    status: 'active',
    createdAt: date,
    updatedAt: date,
  };

  const mockAccount = {
    userEmail: 'Cloyd16@hotmail.com',
    status: 'active',
    createdAt: date,
    updatedAt: date,
    _id: 'a id',
  };

  const mockAccounts = [
    {
      userEmail: 'test@test.com',
      status: 'active',
      createdAt: date,
      updatedAt: date,
      _id: '1',
    },
    {
      userEmail: 'test1@test.com',
      status: 'active',
      createdAt: date,
      updatedAt: date,
      _id: '2',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        {
          provide: AccountsService,
          useValue: {
            create: jest.fn().mockResolvedValue(createAccountDto),
            findAll: jest.fn().mockResolvedValue(mockAccounts),
            filterByEmail: jest.fn().mockResolvedValue(mockAccount),
            update: jest.fn().mockResolvedValue(mockAccount),
            delete: jest.fn().mockResolvedValue(mockAccount),
            getAccountWithCurrentBalance: jest
              .fn()
              .mockResolvedValue({ ...mockAccount, amount: 1000 }),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    service = module.get<AccountsService>(AccountsService);
  });

  describe('create()', () => {
    it('should create a new account', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockAccount);

      await controller.create(createAccountDto);
      expect(createSpy).toHaveBeenCalledWith(createAccountDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of accounts', async () => {
      expect(controller.findAll()).resolves.toEqual(mockAccounts);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('filterByEmail()', () => {
    it('should return an accounts filtered by email', async () => {
      expect(
        controller.filterByEmail({ email: mockAccount.userEmail }),
      ).resolves.toEqual(mockAccount);
      expect(service.filterByEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('should return an updated account', async () => {
      expect(
        controller.update(
          { email: mockAccount.userEmail },
          { status: 'locked' },
        ),
      ).resolves.toEqual(mockAccount);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete()', () => {
    it('should return a deleted account', async () => {
      expect(
        controller.delete({ email: mockAccount.userEmail }),
      ).resolves.toEqual(mockAccount);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAccountWithCurrentBalancec()', () => {
    it('should return an account with current balance', async () => {
      expect(
        controller.getAccountWithCurrentBalance({
          email: mockAccount.userEmail,
        }),
      ).resolves.toEqual({ ...mockAccount, amount: 1000 });
      expect(service.getAccountWithCurrentBalance).toHaveBeenCalledTimes(1);
    });
  });
});
