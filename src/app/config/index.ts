import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  dataBase_url: process.env.DATABASE_URL,
  bcrypt_salts_round: process.env.BCRYPT_SALTS_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_access_expireIn: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_expireIn: process.env.JWT_REFRESH_EXPIRE_IN,
};
