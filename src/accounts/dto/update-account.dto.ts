import { IsEmail, IsIn, IsDateString, IsOptional } from 'class-validator';

export class UpdateAccountDto {
  @IsEmail()
  @IsOptional()
  readonly userEmail: string;

  @IsIn(['active', 'locked'])
  @IsOptional()
  readonly status: string;

  @IsDateString()
  @IsOptional()
  readonly createdAt: Date;

  @IsDateString()
  @IsOptional()
  readonly updatedAt: Date;
}
