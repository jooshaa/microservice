import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqps://qeouyjup:ug25W5tds_usemL9sVUFT8QyAlSwPrMl@cow.rmq2.cloudamqp.com/qeouyjup'],

            queue: 'products_queue',
            queueOptions: {
                durable: false
            },
        },
    });
app.listen()
}
bootstrap();
