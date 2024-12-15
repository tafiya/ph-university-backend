import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config/index';
import { TUser } from './user.interface';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['Admin', 'Student', 'Faculty'],
      },
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
      },
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre middleware function
// using to hide the original password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salts_round),
  );
  next();
});

//  hide to save the password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
export const User = model<TUser>('user', userSchema);
