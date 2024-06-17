import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Role } from "src/role/entities/role.entity";

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    name: string;

    @Prop()
    active: boolean;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);