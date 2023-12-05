import { Controller, Get, Post, Put, Delete, Param, Body, Patch, Query } from '@nestjs/common'
import { SpaceService } from './space.service'
import { Space } from './space.schema'
import { ApiTags, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'

@ApiTags('Spaces')
@Controller({ path: 'spaces', version: '1' })
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: Space })
  create(@Body() spaceData: Partial<Space>): Promise<Space> {
    return this.spaceService.create(spaceData)
  }

  @Get()
  @ApiQuery({ name: 'name', type: String, required: false })
  async findAll(@Query('name') name: string): Promise<Space[]> {
    return this.spaceService.findAll(name)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Space | null> {
    return this.spaceService.findOne(id)
  }

  @Put(':id')
  @ApiBody({ type: Space })
  @ApiQuery({ name: 'name', type: String })
  async update(@Param('id') id: string, @Body() spaceData: Partial<Space>): Promise<Space | null> {
    return this.spaceService.update(id, spaceData)
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() spaceData: Partial<Space>): Promise<Space | null> {
    return this.spaceService.update(id, spaceData)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.spaceService.remove(id)
  }
}
