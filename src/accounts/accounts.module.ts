import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account, AccountSchema } from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    TransactionsModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
