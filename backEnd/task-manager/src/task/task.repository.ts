import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: {
        dueDate: 'ASC',
        name: 'ASC',
        priority: 'ASC',
      },
    });
  }

  async findPending(): Promise<Task[]> {
    const currentDate = new Date().toISOString().split('T')[0];
    return await this.taskRepository
      .createQueryBuilder('task')
      .where('task.dueDate >= :currentDate', { currentDate })
      .orderBy('task.dueDate', 'ASC')
      .addOrderBy('task.name', 'ASC')
      .addOrderBy('task.priority', 'ASC')
      .getMany();
  }

  async findOverdue(): Promise<Task[]> {
    const currentDate = new Date().toISOString().split('T')[0];
    return await this.taskRepository
      .createQueryBuilder('task')
      .where('task.dueDate < :currentDate', { currentDate })
      .orderBy('task.dueDate', 'ASC')
      .addOrderBy('task.name', 'ASC')
      .addOrderBy('task.priority', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);
    if (task) {
      await this.taskRepository.delete(id);
    }
    return task;
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.taskRepository.count({ where: { id } });
    return count > 0;
  }
}