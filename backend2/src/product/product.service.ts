import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)private readonly productModel: Model<Product>
  ){}
  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto)
  }

  findAll() {
    return this.productModel.find()
  }

  findOne(id: number) {
    return this.productModel.findOne({id})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate({id}, updateProductDto, {new: true});
  }

  async remove(id: number) {
    const deleted = await this.productModel.findOneAndDelete({ id }).exec();
    if (!deleted) throw new NotFoundException(`Product with id=${id} not found`);
    return deleted;
    //this.productModel.findOneAndDelete({ id })
    // return id
  }
}
