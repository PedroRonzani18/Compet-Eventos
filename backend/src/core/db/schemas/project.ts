import mongoose from 'mongoose';

const projectInterSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
}, { collection: 'projects' });

export const Project = mongoose.models.ProjectsInter || mongoose.model('ProjectsInter', projectInterSchema);
