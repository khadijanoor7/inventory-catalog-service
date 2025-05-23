import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryService, ProductNotFoundException } from './inventory.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Desc',
    price: 100,
    localStock: 10,
};

const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((product) => Promise.resolve({ id: 1, ...product })),
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
        if (id === 1) return Promise.resolve(mockProduct);
        return Promise.resolve(null);
    }),
    delete: jest.fn().mockImplementation((id) => {
        if (id === 1) return Promise.resolve({ affected: 1 });
        return Promise.resolve({ affected: 0 });
    }),
};

describe('InventoryService', () => {
    let service: InventoryService;
    let repository: Repository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InventoryService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<InventoryService>(InventoryService);
        repository = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a product', async () => {
            const dto: CreateProductDto = {
                name: 'Test Product',
                description: 'Desc',
                price: 100,
                localStock: 10,
            };
            const product = await service.create(dto);
            expect(product).toEqual({ id: 1, ...dto });
            expect(repository.create).toHaveBeenCalledWith(dto);
            expect(repository.save).toHaveBeenCalled();
        });
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            const products = await service.findAll();
            expect(products).toEqual([mockProduct]);
        });
    });

    describe('findOne', () => {
        it('should return a product by ID', async () => {
            const found = await service.findOne(1);
            expect(found).toEqual(mockProduct);
        });

        it('should throw ProductNotFoundException if not found', async () => {
            await expect(service.findOne(999)).rejects.toThrow(ProductNotFoundException);
        });
    });

    describe('update', () => {
        it('should update product stock', async () => {
            const updated = await service.update(1, { localStock: 20 });
            expect(updated.localStock).toBe(20);
            expect(repository.save).toHaveBeenCalled();
        });
    });

    describe('remove', () => {
        it('should remove a product', async () => {
            await service.remove(1);
            expect(repository.delete).toHaveBeenCalledWith(1);
        });

        it('should throw ProductNotFoundException if trying to remove non-existent product', async () => {
            await expect(service.remove(999)).rejects.toThrow(ProductNotFoundException);
        });
    });
});
