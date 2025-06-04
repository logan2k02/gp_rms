import { registerAs } from '@nestjs/config';

export default registerAs('settings', () => ({
  superPassword: process.env.SUPER_PASSWORD || '123456',
}));
