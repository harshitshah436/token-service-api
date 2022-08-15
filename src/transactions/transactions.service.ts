import {
  forwardRef,
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
