import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { Product_Micro_Controller } from './product-microservice.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]), HttpModule],
  controllers: [ProductController, Product_Micro_Controller],
  providers: [ProductService],
})
export class ProductModule {}
