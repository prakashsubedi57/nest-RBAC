import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Policy {
    @Prop()
    policy: string;

    @Prop()
    description: string;  
}
export const PolicySchema = SchemaFactory.createForClass(Policy);