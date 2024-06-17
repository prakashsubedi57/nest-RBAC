import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema({ timestamps: true })
export class Profile {
    @Prop()
    image: string;

    @Prop()
    bio: string;

    @Prop()
    address: string;

    @Prop()
    dob: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);