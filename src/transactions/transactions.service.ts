import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  @Inject(forwardRef(() => AccountsService))
  private readonly accountsService: AccountsService;

  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const account = await this.accountsService.filterByEmail(
      createTransactionDto.userEmail,
    );

    if (!account) {
      throw new HttpException(
        `Account with the email: ${createTransactionDto.userEmail} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (account.status === 'locked') {
      throw new HttpException(
        `Account with the email: ${createTransactionDto.userEmail} is locked. No transactions can be made for accounts in locked status`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Assumption: all `receive` or `send` token/transaction amount is positive
    if (createTransactionDto.type === 'send') {
      const currentAccountBalance =
        await this.accountsService.getAccountWithCurrentBalance(
          createTransactionDto.userEmail,
        );

      if (currentAccountBalance.amount - createTransactionDto.amount < 0) {
        throw new HttpException(
          `Account with the email: ${createTransactionDto.userEmail} can not have a negative balance. The max tokesn you can send is: ${currentAccountBalance.amount}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const createdTransaction = await this.transactionModel.create(
      createTransactionDto,
    );
    return createdTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async filterByEmail(email: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userEmail: email }).exec();
  }

  async delete(id: string) {
    const deletedTransaction = await this.transactionModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedTransaction;
  }
}
