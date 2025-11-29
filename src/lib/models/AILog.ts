import mongoose, { Schema, Document } from 'mongoose';

export interface IAILog extends Document {
  userId?: mongoose.Types.ObjectId;
  ipAddress: string;
  question: string;
  answer: string;
  flagged: boolean;
  flagReason?: string;
  createdAt: Date;
}

const AILogSchema = new Schema<IAILog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },
    question: {
      type: String,
      required: true,
      maxlength: [2000, 'Pergunta deve ter no máximo 2000 caracteres'],
    },
    answer: {
      type: String,
      required: true,
    },
    flagged: {
      type: Boolean,
      default: false,
    },
    flagReason: String,
  },
  {
    timestamps: true,
  }
);

// Índices para auditoria e rate limiting
AILogSchema.index({ ipAddress: 1, createdAt: -1 });
AILogSchema.index({ userId: 1, createdAt: -1 });
AILogSchema.index({ flagged: 1 });

export default mongoose.models.AILog || mongoose.model<IAILog>('AILog', AILogSchema);
