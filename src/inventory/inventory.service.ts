import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export class ProductNotFoundException extends NotFoundException {
    constructor(id: number) {
        super(`Product with ID ${id} not found`);
    }
}

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    create(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = this.productsRepository.create(createProductDto);
        return this.productsRepository.save(newProduct);
    }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) {
            throw new ProductNotFoundException(id);
        }
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        if (updateProductDto.localStock !== undefined) {
            product.localStock = updateProductDto.localStock;
        }
        return this.productsRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        const result = await this.productsRepository.delete(id);
        if (result.affected === 0) {
            throw new ProductNotFoundException(id);
        }
    }
}
