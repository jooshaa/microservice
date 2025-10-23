import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
          {
            name: 'CATEGORY_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: ['amqps://qeouyjup:ug25W5tds_usemL9sVUFT8QyAlSwPrMl@cow.rmq2.cloudamqp.com/qeouyjup'],
              queue: 'category_queue',
              queueOptions: {
                durable: false
              },
            },
          },
        ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
