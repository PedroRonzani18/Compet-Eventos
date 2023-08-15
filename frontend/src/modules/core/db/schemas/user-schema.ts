import { UserProps } from '@/modules/domain/entities/user';
import mongoose from 'mongoose';

export const user_roles = ['USER', 'ADMIN']

export const userSchema = new mongoose.Schema<UserProps>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    profile_picture: { type: String },
    linkedin_url: { type: String },
    github_url: { type: String },
    favourite_projects: [{ type: String }],
    created_at: { type: Date },
    updated_at: { type: Date },
    role: { type: String }
  },
  {
    versionKey: false,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      }
    },
  },
)
export const UserModel = mongoose.model<UserProps>("users", userSchema)