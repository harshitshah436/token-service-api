import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseConfigService } from './common/service/MongooseConfigService';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    // load .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // https://docs.nestjs.com/techniques/mongodb#async-configuration
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AccountsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
