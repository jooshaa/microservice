import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>){}
  
  create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto)
  }

  findAll() {
    return this.productRepo.find()
  }

async findOne(id: number) {
    const product = await this.productRepo.findOneBy({id})
    if(!product){
      throw new NotFoundException("not such a id")
    }
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepo.update({id}, updateProductDto)
    if(updatedProduct.affected! == 0){
      throw new NotFoundException("not found")
    }
    return this.findOne(id)
  }

  async remove(id: number) {
    const deletedProduct = await this.productRepo.delete({id})
    if (deletedProduct.affected! == 0) {
      throw new NotFoundException("not found")
    }
    return id
  }
}
