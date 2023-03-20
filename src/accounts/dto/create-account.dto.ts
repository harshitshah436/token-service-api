import { IsEmail, IsIn, IsDateString, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  readonly userEmail: string;

  @IsIn(['active', 'locked'])
  readonly status: string;

  @IsDateString()
  @IsOptional()
  readonly createdAt?: Date;

  @IsDateString()
  @IsOptional()
  readonly updatedAt?: Date;
}
