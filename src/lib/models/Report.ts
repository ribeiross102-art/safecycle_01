import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  userId: mongoose.Types.ObjectId;
  deviceId: mongoose.Types.ObjectId;
  date: Date;
  dosageTaken: string;
  sideEffects?: string[];
  mood?: string;
  energy?: number;
  sleep?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    deviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dosageTaken: {
      type: String,
      required: true,
    },
    sideEffects: [String],
    mood: {
      type: String,
      enum: ['excelente', 'bom', 'neutro', 'ruim', 'péssimo'],
    },
    energy: {
      type: Number,
      min: 1,
      max: 10,
    },
    sleep: {
      type: Number,
      min: 1,
      max: 10,
    },
    notes: {
      type: String,
      maxlength: [2000, 'Notas devem ter no máximo 2000 caracteres'],
    },
  },
  {
    timestamps: true,
  }
);

// Índices compostos para queries eficientes
ReportSchema.index({ userId: 1, date: -1 });
ReportSchema.index({ deviceId: 1, date: -1 });
ReportSchema.index({ userId: 1, deviceId: 1, date: -1 });

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
