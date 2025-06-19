import { IsString, IsDateString, IsInt, Min, Max, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsDateString()
  dueDate: string;

  @IsInt()
  @Min(1)
  @Max(5)
  priority: number;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  priority?: number;
}

export class GetTasksDto {
  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsIn(['pending', 'overdue'])
  type?: 'pending' | 'overdue';
}

export class TaskResponseDto {
  id: number;
  name: string;
  dueDate: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
  isOverdue?: boolean;
}