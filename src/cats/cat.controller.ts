import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common'
import { CatService } from './cat.service'
import { Cat } from './cat.schema'
import { ApiTags, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'

@ApiTags('Cats')
@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: Cat })
  create(@Body() catData: Cat): Promise<Cat> {
    return this.catService.create(catData)
  }

  @Get()
  @ApiQuery({ name: 'age', type: Number, required: false })
  findAll(@Query('age') age: number): Promise<Cat[]> {
    return this.catService.findAll(age)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() catData: Cat) {
    return this.catService.update(id, catData)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(id)
  }
}
