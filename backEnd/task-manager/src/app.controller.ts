import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async findByQueryId(@Query('id') id: string) {
    const item = await this.appService.findOneById();
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }
  
  @Post()
  async createTask(){
    return await this.appService.
  }


  // PUT: /items/:id
  @Put(':id')
  async pduate(@Param('id') id: string, @Body() updateItemDto: any) {
    const updated = await this.appService.update();
    if (!updated) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return updated;
  }

  // DELETE: /items/:id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.appService.delete();
    if (!result) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return { message: `Item with id ${id} deleted successfully` };
  }
}
