import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  termsAccepted: boolean;
  termsAcceptedAt?: Date;
  privacyAccepted: boolean;
  privacyAcceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      minlength: [2, 'Nome deve ter no mínimo 2 caracteres'],
      maxlength: [100, 'Nome deve ter no máximo 100 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatória'],
      minlength: [8, 'Senha deve ter no mínimo 8 caracteres'],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    termsAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    termsAcceptedAt: Date,
    privacyAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    privacyAcceptedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Índices para performance
UserSchema.index({ email: 1 });
UserSchema.index({ verificationToken: 1 });
UserSchema.index({ resetPasswordToken: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
