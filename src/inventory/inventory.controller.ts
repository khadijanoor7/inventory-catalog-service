import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
    create(@Body() createProductDto: CreateProductDto) {
        return this.inventoryService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Return all products.' })
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiResponse({ status: 200, description: 'Return the product.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update product stock' })
    @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.inventoryService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.inventoryService.remove(id);
    }
}
