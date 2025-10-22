import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { Product_Micro_Controller } from './product-microservice.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
  controllers: [ProductController, Product_Micro_Controller],
  providers: [ProductService],
})
export class ProductModule {}
