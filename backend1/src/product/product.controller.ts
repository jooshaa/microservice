import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    @Inject("PRODUCT_SERVICE") private readonly clientService: ClientProxy
  ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    this.clientService.emit("product_created", product)
    return product
  }

  @Get()
  findAll() {
    this.clientService.emit("hello", "Hello from another server");
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updated = await this.productService.update(+id, updateProductDto);
    this.clientService.emit("product_updated", updated)
    return updated
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.productService.remove(+id);
    this.clientService.emit("product_deleted", deleted)
    return deleted
  }
}
