import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account, AccountDocument } from './schemas/account.schema';

@Injectable()
export class AccountsService {
  @Inject(TransactionsService)
  private readonly transactionsService: TransactionsService;

  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const createdAccount = await this.accountModel.create(createAccountDto);
    return createdAccount;
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async filterByEmail(email: string): Promise<Account> {
    const account = await this.accountModel.find({ userEmail: email }).exec();
    return account[0];
  }

  async update(
    email: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<UpdateResult> {
    const updatedAccount = await this.accountModel.updateOne(
      { userEmail: email },
      { ...updateAccountDto, updatedAt: new Date(new Date().toISOString()) },
    );
    return updatedAccount;
  }

  async delete(email: string) {
    const deletedAccount = await this.accountModel
      .findOneAndDelete({ userEmail: email })
      .exec();
    return deletedAccount;
  }

  async getAccountWithCurrentBalance(email: string) {
    const accounts = await this.accountModel.find({ userEmail: email }).exec();
    const account = accounts[0];

    const transactions = await this.transactionsService.filterByEmail(email);
    let amount = 0;
    transactions.forEach((transaction) => {
      transaction.type === 'receive'
        ? (amount += transaction.amount)
        : (amount -= transaction.amount);
    });

    return { ...account.toObject(), amount };
  }
}
