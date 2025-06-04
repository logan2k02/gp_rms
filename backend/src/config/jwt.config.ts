import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  staffMemberAccessTokenSecret:
    process.env.JWT_STAFF_MEMBER_ACCESS_TOKEN_SECRET,
  staffMemberAccessTokenExpiresIn:
    process.env.JWT_STAFF_MEMBER_ACCESS_TOKEN_EXPIRES_IN,
  staffMemberRefreshTokenSecret:
    process.env.JWT_STAFF_MEMBER_REFRESH_TOKEN_SECRET,
  staffMemberRefreshTokenExpiresIn:
    process.env.JWT_STAFF_MEMBER_REFRESH_TOKEN_EXPIRES_IN,

  customerAccessTokenSecret: process.env.JWT_CUSTOMER_ACCESS_TOKEN_SECRET,
  customerAccessTokenExpiresIn:
    process.env.JWT_CUSTOMER_ACCESS_TOKEN_EXPIRES_IN,
  customerRefreshTokenSecret: process.env.JWT_CUSTOMER_REFRESH_TOKEN_SECRET,
  customerRefreshTokenExpiresIn:
    process.env.JWT_CUSTOMER_REFRESH_TOKEN_EXPIRES_IN,
}));
