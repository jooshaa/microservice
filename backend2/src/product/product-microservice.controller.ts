import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class Product_Micro_Controller {
  constructor(private readonly productService: ProductService) {}


  @EventPattern("hello")
  async hello(data: string){
    console.log(data)
    return "hello yetb keldi"
  }

  @MessagePattern("salom")
  async salom(@Payload() data: string, @Ctx() context: RmqContext){
    console.log(data);
    return "salom yetb keldi"
    
  }


  @EventPattern("product_created")
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
  update(@Payload('id') id: string, @Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @EventPattern("product_deleted")
  remove( @Payload() id: string) {
    return this.productService.remove(+id);
  }
}
