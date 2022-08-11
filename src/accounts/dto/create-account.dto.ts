import { IsEmail, IsIn, IsDateString } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  readonly userEmail: string;

  @IsIn(['active', 'locked'])
  readonly status: string;

  @IsDateString()
  readonly createdAt: Date;

  @IsDateString()
  readonly updatedAt: Date;
}
