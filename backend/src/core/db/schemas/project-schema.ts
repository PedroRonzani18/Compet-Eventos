import { ProjectProps } from '@/domain/projects/entities/project';
import { userSchema } from './user-schema';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<ProjectProps>(
  {
      title: { type: String, required: true },
      author: [userSchema], 
      description: { type: String, required: true },
      image: { type: String, required: true },
      created_at: { type: Date },
      updated_at: { type: Date }
  },
  {
      versionKey: false,
      toJSON: {
          transform: (_, ret): void => {
              ret.id = ret._id.toString();
              delete ret._id;
              delete ret.__v;
          },
      },
  }
);

export const ProjectModel = mongoose.model<ProjectProps>("projects", schema)