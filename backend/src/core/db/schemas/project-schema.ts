import { Project } from '@/domain/projects/entities/project';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<Project>(
  {
    title: String,
    author: String,
    description: String,
    image: String,
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
export const ProjectModel = mongoose.model<Project>("ProjectsInter", schema)