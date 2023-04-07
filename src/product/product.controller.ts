import {
  Body,
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Delete,
  ParseUUIDPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/user/authenticated.guard';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  public async create(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
  ) {
    const product = await this.productService.create(
      Object.assign({}, createProductDto, { ownerId: req.user.id }),
    );

    return {
      id: product.id,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete()
  public async delete(
    @Body('id', new ParseUUIDPipe()) id: string,
    @Request() req,
  ) {
    const product = await this.productService.findById(id);
    if (product.ownerId === req.user.id) {
      await this.productService.delete(id);
      return {
        id: product.id,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('my')
  public async findOwned(@Request() req) {
    return this.productService.findByOwner(req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  public async findOne(@Body('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productService.findById(id);
    return product;
  }
}
