import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async findOneById(): Promise<void > {}

  async create(): Promise<void >{}

  async update(): Promise<void > {}

  async delete(): Promise<void > {}
}
