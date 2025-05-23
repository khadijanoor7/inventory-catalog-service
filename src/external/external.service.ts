import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExternalProductDto } from './dto/external-product.dto';

@Injectable()
export class ExternalService {
    constructor(private readonly httpService: HttpService) { }

    async getTopRatedProducts(): Promise<ExternalProductDto[]> {
        const { data } = await firstValueFrom(
            this.httpService.get('https://dummyjson.com/products'),
        );

        const products = data.products.slice(0, 5);

        return products.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            rating: p.rating,
        }));
    }
}
