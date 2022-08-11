import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
