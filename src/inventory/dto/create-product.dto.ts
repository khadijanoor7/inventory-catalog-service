import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Smartphone', description: 'The name of the product' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Latest model smartphone', description: 'The description of the product' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 999.99, description: 'The price of the product', minimum: 0 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: 50, description: 'The local stock quantity', minimum: 0 })
    @IsNumber()
    @Min(0)
    localStock: number;
}
