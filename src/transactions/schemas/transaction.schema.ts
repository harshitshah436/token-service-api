import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ versionKey: false })
export class Transaction {
  @Prop({ required: true, index: true })
  userEmail: string;

  @Prop()
  amount: number;

  @Prop()
  type: string;

  @Prop()
  @IsOptional()
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
