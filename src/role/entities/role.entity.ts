import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Policy } from "src/policy/entities/policy.entity";

@Schema()
export class Role {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop([
        {
            policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
            MANAGE: { type: Boolean, default: false },
            CREATE: { type: Boolean, default: false },
            READ: { type: Boolean, default: false },
            UPDATE: { type: Boolean, default: false },
            DELETE: { type: Boolean, default: false },
        },
    ])
    policies: {
        policyId: Policy;
        MANAGE?: boolean;
        CREATE?: boolean;
        READ?: boolean;
        UPDATE?: boolean;
        DELETE?: boolean;
    }[];
}
export const RoleSchema = SchemaFactory.createForClass(Role);