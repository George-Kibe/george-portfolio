import mongoose from 'mongoose'

// Registers a model, replacing any stale copy in development.
//
// The usual `mongoose.models.X || mongoose.model('X', schema)` keeps the FIRST
// compiled schema for the life of the dev server. After a schema edit, hot
// reload re-runs this file but the old model wins, and Mongoose silently drops
// any field the old schema doesn't know (that's how password-reset tokens were
// emailed but never saved). In production each file is evaluated once, so the
// existing model is simply reused.
export default function defineModel(name, schema) {
  if (mongoose.models[name]) {
    if (process.env.NODE_ENV === 'production') return mongoose.models[name]
    mongoose.deleteModel(name)
  }
  return mongoose.model(name, schema)
}
