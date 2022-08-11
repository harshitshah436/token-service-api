import { IsEmail, IsNumber, IsIn, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsEmail()
  readonly userEmail: string;

  @IsNumber()
  readonly amount: number;

  @IsIn(['send', 'receive'])
  readonly type: string;

  @IsDateString()
  readonly createdAt: Date;
}
