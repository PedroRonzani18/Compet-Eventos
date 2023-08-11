import { UserProps } from '@/domain/users/entities/user';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<UserProps>(
  {
    name: { type:String, required: true },
    email: { type:String, required: true },
    profile_picture: { type:String, required: false },
    linkedin_url: { type:String, required: false },
    github_url: { type:String, required: false },
    favourite_projects: { type:[String], required: false },
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
export const UserModel = mongoose.model<UserProps>("People", schema)