import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: string;
  substance: string;
  concentration: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DeviceSchema = new Schema<IDevice>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Nome do dispositivo é obrigatório'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Tipo é obrigatório'],
      enum: ['ampola', 'comprimido', 'cápsula', 'gel', 'adesivo', 'outro'],
    },
    substance: {
      type: String,
      required: [true, 'Substância é obrigatória'],
      trim: true,
    },
    concentration: {
      type: String,
      required: [true, 'Concentração é obrigatória'],
    },
    dosage: {
      type: String,
      required: [true, 'Dosagem é obrigatória'],
    },
    frequency: {
      type: String,
      required: [true, 'Frequência é obrigatória'],
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: Date,
    notes: {
      type: String,
      maxlength: [1000, 'Notas devem ter no máximo 1000 caracteres'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para queries eficientes
DeviceSchema.index({ userId: 1, active: 1 });
DeviceSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Device || mongoose.model<IDevice>('Device', DeviceSchema);
