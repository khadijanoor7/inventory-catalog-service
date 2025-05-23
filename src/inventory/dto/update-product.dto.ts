import { IsOptional, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiPropertyOptional({ example: 45, description: 'The new stock quantity', minimum: 0 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    localStock?: number;
}
