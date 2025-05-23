import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExternalService } from './external.service';

@ApiTags('catalog')
@Controller('catalog')
export class ExternalController {
    constructor(private readonly externalService: ExternalService) { }

    @Get('top-5-rated')
    @ApiOperation({ summary: 'Get top 5 rated products from external catalog' })
    @ApiResponse({ status: 200, description: 'Return top 5 rated products.' })
    async getTop5Rated() {
        return this.externalService.getTopRatedProducts();
    }
}
