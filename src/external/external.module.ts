import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';

@Module({
    imports: [HttpModule],
    controllers: [ExternalController],
    providers: [ExternalService],
})
export class ExternalModule { }
