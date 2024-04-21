import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from 'config/config';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PassportModule,
    JwtModule.register({
      ...config().security,
      global: true,
    }),
    AuthModule,
    CommonModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
