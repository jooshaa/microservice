import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class Product_Micro_Controller {
  constructor(private readonly productService: ProductService) {}


  // @EventPattern("hello")
  // async hello(data: string){
  //   console.log(data)
  // }


  @EventPattern("product_created")
  async product_created(data: string) {
    console.log(data)
  }

  @Post()
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @EventPattern("product_updated")
  async product_updated(data: string) {
    console.log(data)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @EventPattern("product_deleted")
  async product_deleted(data: string) {
    console.log(data)
  }
  @Delete(':id')
  remove( @Payload("id") id: string) {
    return this.productService.remove(+id);
  }
}
