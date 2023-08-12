import { ProjectProps } from '@/domain/projects/entities/project';
import { userSchema } from './user-schema';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<ProjectProps>(
  {
      title: { type: String, required: true },
      author: [userSchema], // Use the userSchema here
      description: { type: String, required: true },
      image: { type: String, required: true },
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

export const ProjectModel = mongoose.model<ProjectProps>("ProjectsInter", schema)