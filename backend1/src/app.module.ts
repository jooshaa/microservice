import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host: "localhost",
    port: 3306,
    username:"root",
    password: "root",
    database: "micro",
    autoLoadEntities: true,
    synchronize: true,
  }), ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
