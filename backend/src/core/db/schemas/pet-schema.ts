import { PetProps } from '@/domain/pets/entities/pet';
import { userSchema } from './user-schema';
import { projectSchema } from './project-schema';
import mongoose from 'mongoose';

export const petSchema = new mongoose.Schema<PetProps>(
  {
    name: { type: String },
    image: { type: String },
    campus: { type: String },
    members: [userSchema],
    projects: [projectSchema],
    created_at: { type: Date },
    updated_at: { type: Date },
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
export const PetModel = mongoose.model<PetProps>("pets", petSchema)