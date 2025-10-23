import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/micro'),
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
