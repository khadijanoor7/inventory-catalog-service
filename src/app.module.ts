import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { InventoryModule } from './inventory/inventory.module';
import { ExternalModule } from './external/external.module';
import { Product } from './inventory/entities/product.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: process.env.DATABASE_NAME || 'inventory.sqlite',
            entities: [Product],
            synchronize: true, // Auto-create tables (dev only)
        }),
        InventoryModule,
        ExternalModule,
    ],
})
export class AppModule { }
