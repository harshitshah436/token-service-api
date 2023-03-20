import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

const DB_NAME = 'tokenService';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const mongoDbHost = this.configService.get<string>('MONGO_DB_HOST');
    console.log(
      `DEBUG: mongodb connection URI - mongodb://${mongoDbHost}/${DB_NAME}`,
    );
    return {
      uri: `mongodb://${mongoDbHost}/${DB_NAME}`,
    };
  }
}
