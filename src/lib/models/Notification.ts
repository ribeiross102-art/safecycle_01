import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['reminder', 'alert', 'info', 'warning', 'success'],
    },
    title: {
      type: String,
      required: true,
      maxlength: [200, 'Título deve ter no máximo 200 caracteres'],
    },
    message: {
      type: String,
      required: true,
      maxlength: [1000, 'Mensagem deve ter no máximo 1000 caracteres'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    actionUrl: String,
  },
  {
    timestamps: true,
  }
);

// Índices para queries eficientes
NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
