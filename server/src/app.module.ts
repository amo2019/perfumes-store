import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductsModule } from './modules/products/products.module';
import { AppController } from './app.controller';
import { CartModule } from './modules/cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';


@Module({
  controllers: [AppController],
  providers: [UsersService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ProductsModule,
    CartModule,
    AuthModule,
  ],
})
export class AppModule {}
