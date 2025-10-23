import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
      @Inject("CATEGORY_SERVICE") private readonly clientService: ClientProxy
    ) { }

@Post()
create(@Body() createCategoryDto: CreateCategoryDto) {
  this.clientService.send("createCategory", createCategoryDto).subscribe((data)=>{
    console.log(data);
    
  })
  return this.categoryService.create(createCategoryDto);
}

@Get()
findAll() {
  return this.categoryService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.categoryService.findOne(+id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  return this.categoryService.update(+id, updateCategoryDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.categoryService.remove(+id);
}
}
