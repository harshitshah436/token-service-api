import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateResult } from 'mongodb';
import { FindOneParams } from 'src/common/dto/filter-by-email.dto';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './schemas/account.schema';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    await this.accountsService.create(createAccountDto);
  }

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':email')
  async filterByEmail(@Param() params: FindOneParams): Promise<Account> {
    return this.accountsService.filterByEmail(params.email);
  }

  @Patch(':email')
  async update(
    @Param() params: FindOneParams,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return this.accountsService.update(params.email, updateAccountDto);
  }

  @Delete(':email')
  async delete(@Param() params: FindOneParams) {
    return this.accountsService.delete(params.email);
  }
}