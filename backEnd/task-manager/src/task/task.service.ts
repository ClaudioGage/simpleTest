import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto, GetTasksDto, TaskResponseDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.taskRepository.create(createTaskDto);
    return this.mapToResponseDto(task);
  }

  async findAll(getTasksDto: GetTasksDto): Promise<TaskResponseDto[]> {
    let tasks: Task[];

    if (getTasksDto.type === 'pending') {
      tasks = await this.taskRepository.findPending();
    } else if (getTasksDto.type === 'overdue') {
      tasks = await this.taskRepository.findOverdue();
    } else {
      tasks = await this.taskRepository.findAll();
    }

    return tasks.map(task => this.mapToResponseDto(task));
  }

  async findOne(id: number): Promise<TaskResponseDto> {
    if (!id) {
      throw new BadRequestException('No id provided.');
    }

    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.mapToResponseDto(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto> {
    if (!id) {
      throw new BadRequestException('No id provided.');
    }

    const exists = await this.taskRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const task = await this.taskRepository.update(id, updateTaskDto);
    return this.mapToResponseDto(task);
  }

  async remove(id: number): Promise<TaskResponseDto> {
    if (!id) {
      throw new BadRequestException('No id provided.');
    }

    const task = await this.taskRepository.remove(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.mapToResponseDto(task);
  }

  private mapToResponseDto(task: Task): TaskResponseDto {
    const currentDate = new Date().toISOString().split('T')[0];
    const isOverdue = task.dueDate < currentDate;

    return {
      id: task.id,
      name: task.name,
      dueDate: task.dueDate,
      priority: task.priority,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      ...(isOverdue && { isOverdue: true }),
    };
  }
}