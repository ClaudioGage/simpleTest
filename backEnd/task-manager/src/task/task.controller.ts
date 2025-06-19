import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    ParseIntPipe,
    ValidationPipe,
  } from '@nestjs/common';
  import { TaskService } from './task.service';
  import { CreateTaskDto, UpdateTaskDto, GetTasksDto, TaskResponseDto } from './task.dto';
  
  @Controller('task')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post()
    create(@Body(ValidationPipe) createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
      return this.taskService.create(createTaskDto);
    }
  
    @Get()
    findAll(@Query(ValidationPipe) getTasksDto: GetTasksDto): Promise<TaskResponseDto[]> {
      return this.taskService.findAll(getTasksDto);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskResponseDto> {
      return this.taskService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    ): Promise<TaskResponseDto> {
      return this.taskService.update(id, updateTaskDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<TaskResponseDto> {
      return this.taskService.remove(id);
    }
  }