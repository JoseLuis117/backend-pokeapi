import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PokemonesModule } from './pokemones/pokemones.module';
import { PaymentModule } from './payment/payment.module';
import { WebhooksModule } from './webhooks/webhooks.module';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, PokemonesModule, PaymentModule, WebhooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
