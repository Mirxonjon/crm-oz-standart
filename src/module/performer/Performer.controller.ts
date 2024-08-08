import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SendedPerformerService } from './Performer.service';
import { CreatePerformerDto } from './dto/create_performer.dto';
import { UpdatePerformerDto } from './dto/update_performer.dto';
import { RolesEnum } from 'src/types';
import { RequiredRoles } from '../auth/guards/roles.decorator';


// @ApiTags('role')
// @ApiBearerAuth('JWT-auth')
// @UseGuards(RolesGuard)
// @Controller('api/role')
@Controller('Performer')
@ApiTags('Performer')
@ApiBearerAuth('JWT-auth')
export class SendedPerformerController {
  readonly #_service: SendedPerformerService;
  constructor(service: SendedPerformerService) {
    this.#_service = service;
  }

  @Get('/all?')
  // @RequiredRoles(RolesEnum.SUPERADMIN)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall( 
    @Query('search') title: string,   @Query('page') page: string,
  @Query('pageSize') pageSize: string,) {
    return await this.#_service.findAll(  title ,   +page,
      +pageSize,);
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return await this.#_service.findOne(id);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title'],
      properties: {
        title: {
          type: 'string',
          default: 'Apteka',
        },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body() createOrganizationCategoryDto: CreatePerformerDto,
  ) {
    return await this.#_service.create(createOrganizationCategoryDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Teatr',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationCategoryDto: UpdatePerformerDto,
  ) {
    return await this.#_service.update(id, updateOrganizationCategoryDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    return await this.#_service.remove(id);
  }
}
