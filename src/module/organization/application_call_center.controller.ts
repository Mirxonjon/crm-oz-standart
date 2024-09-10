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
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationCallCenterServise } from './application_call_center.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateApplicationCallCenterDto } from './dto/create_organization.dto';
import { UpdateApplicationCallCenterDto } from './dto/update_organization.dto';
import { CustomRequest, RolesEnum } from 'src/types';
import { RequiredRoles } from '../auth/guards/roles.decorator';
@Controller('organization')
@ApiTags('Application Call Center')
@ApiBearerAuth('JWT-auth')
export class ApplicationCallCenterController {
  readonly #_service: ApplicationCallCenterServise;
  constructor(service: ApplicationCallCenterServise) {
    this.#_service = service;
  }

  @Get('/statistics/filter?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  // @ApiOperation({
  //   summary:
  //     "sana formati 01.04.2024 to'ldirilmagan joyga null qiymati jonatiladi sana va page paramlari null qiymat qabul qilmaydi ",
  // })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'subCategoryId', required: false })
  @ApiQuery({ name: 'region', required: false })
  @ApiQuery({ name: 'date_from', required: false })
  @ApiQuery({ name: 'date_to', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  async findallstatisticsfilter(
    @Query('categoryId') categoryId = 'null',
    @Query('subCategoryId') subCategoryId = 'null',
    @Query('region') region = 'null',
    @Query('date_from') fromDate = 'null',
    @Query('date_to') untilDate = 'null',
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
  ) {
    return await this.#_service.findallstatisticsfilter(
      categoryId,
      subCategoryId,
      region,
      fromDate,
      untilDate,
      +page,
      +pageSize,
    );
  }

  @Get('/allNotDrafts')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiOperation({
    summary:
      "sana formati 01.04.2024 to'ldirilmagan joyga null qiymati jonatiladi sana va page paramlari null qiymat qabul qilmaydi ",
  })
  async findallNotDrafts(
    @Query('categoryId') categoryId: string,
    @Query('subCategoryId') subCategoryId: string,
    @Query('region') region: string,
    @Query('district') district: string,
    @Query('income_number') income_number: string,
    @Query('operator') operator: string,
    @Query('response') response: string,
    @Query('application_type') application_type: string,
    @Query('applicant') applicant: string,
    @Query('phone') phone: string,
    @Query('applicant_birthday') applicant_birthday: string,
    @Query('status') status: string,
    @Query('date_from') fromDate: string,
    @Query('date_to') untilDate: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return await this.#_service.findAllNotDrafts(
      categoryId,
      subCategoryId,
      region,
      district,
      income_number,
      operator,
      response,
      application_type,
      applicant,
      phone,
      applicant_birthday,
      status,
      fromDate,
      untilDate,
      +page,
      +pageSize,
    );
  }

  @Get('/allDrafts')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiOperation({
    summary:
      "sana formati 01.04.2024 to'ldirilmagan joyga null qiymati jonatiladi sana va page paramlari null qiymat qabul qilmaydi ",
  })
  async findallDrafts(
    @Query('categoryId') categoryId: string,
    @Query('subCategoryId') subCategoryId: string,
    @Query('region') region: string,
    @Query('district') district: string,
    @Query('income_number') income_number: string,
    @Query('operator') operator: string,
    @Query('response') response: string,
    @Query('application_type') application_type: string,
    @Query('applicant') applicant: string,
    @Query('phone') phone: string,
    @Query('applicant_birthday') applicant_birthday: string,
    @Query('status') status: string,
    @Query('date_from') fromDate: string,
    @Query('date_to') untilDate: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return await this.#_service.findAllDrafts(
      categoryId,
      subCategoryId,
      region,
      district,
      income_number,
      operator,
      response,
      application_type,
      applicant,
      phone,
      applicant_birthday,
      status,
      fromDate,
      untilDate,
      +page,
      +pageSize,
    );
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return await this.#_service.findOne(id);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.OPERATOR, RolesEnum.ADMIN)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        sub_category_id: {
          type: 'string',
          default: 'sadf456asdf65asdf564asf',
        },
        district_id: {
          type: 'string',
          default: '4141561fds4g964g498e',
        },
        applicant: {
          type: 'string',
          default: 'Мурожаатчи',
        },
        application_type: {
          type: 'string',
          default: 'Мурожаат тури (ариза, таклиф, шикоят)',
        },
        comment: {
          type: 'string',
          default: 'Мурожаатнинг қисқача мазмуни',
        },
        phone: {
          type: 'string',
          default: '998933843484',
        },

        income_date: {
          type: 'string',
          default: '2024-07-02',
        },
        incoming_number: {
          type: 'string',
          default: 'Входящий номер',
        },
        organization_name: {
          type: 'string',
          default: 'Бошқарма номи',
        },
        organization_type: {
          type: 'string',
          default: 'Юридический / Физический лицо',
        },
        perform_date: {
          type: 'string',
          default: '2024-07-01',
        },
        performer: {
          type: 'string',
          default: 'Ижрочи',
        },
        resend_application: {
          type: 'string',
          default: 'Янги мурожаат ёки Такрорий мурожаатлар',
        },
        response: {
          type: 'string',
          default: '2024-07-03',
        },
        sended_to_organizations: {
          type: 'string',
          default: '2024-07-02',
        },
        IsDraf: {
          type: 'string',
          default: 'false',
        },
        performer_id: {
          type: 'string',
          default: '2024-07-02',
        },
        additional_phone: {
          type: 'string',
          default: '9989999999',
        },
        application_birthday: {
          type: 'string',
          default: '2024-07-02',
        },
        executer: {
          type: 'string',
          default: '2024-07-02',
        },
        mfy: {
          type: 'string',
          default: 'qatdir',
        },
        operator_number: {
          type: 'string',
          default: '2024-07-02',
        },
        street_and_apartment: {
          type: 'string',
          default: '2024-07-02',
        },
        status: {
          type: 'string',
          default: 'True',
        },
        email: {
          type: 'string',
          default: '2024-07-02',
        },
      },
    },
  })
  // @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  // @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Request() request: CustomRequest,
    @Body() createOrganizationDto: CreateApplicationCallCenterDto,
  ): Promise<void> {
    // console.log(request.userId ,'iiiiii');

    return await this.#_service.create(request, createOrganizationDto);
  }

  @RequiredRoles(RolesEnum.ADMIN)
  @Post('/response/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async response(
    @Request() request: CustomRequest,
    @Param('id') applicationId: string,
    @UploadedFiles() file: Express.Multer.File,
  ): Promise<void> {
    // console.log(request.userId ,'iiiiii');

    return await this.#_service.response(request, applicationId, file);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.OPERATOR, RolesEnum.ADMIN)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sub_category_id: {
          type: 'string',
          default: 'sadf456asdf65asdf564asf',
        },
        district_id: {
          type: 'string',
          default: '4141561fds4g964g498e',
        },
        applicant: {
          type: 'string',
          default: 'Мурожаатчи',
        },
        application_type: {
          type: 'string',
          default: 'Мурожаат тури (ариза, таклиф, шикоят)',
        },
        comment: {
          type: 'string',
          default: 'Мурожаатнинг қисқача мазмуни',
        },

        phone: {
          type: 'string',
          default: '998933843484',
        },

        income_date: {
          type: 'string',
          default: '2024-07-02',
        },
        incoming_number: {
          type: 'string',
          default: 'Входящий номер',
        },
        organization_name: {
          type: 'string',
          default: 'Бошқарма номи',
        },
        organization_type: {
          type: 'string',
          default: 'Юридический / Физический лицо',
        },
        perform_date: {
          type: 'string',
          default: '2024-07-01',
        },
        performer: {
          type: 'string',
          default: 'Ижрочи',
        },
        resend_application: {
          type: 'string',
          default: 'Янги мурожаат ёки Такрорий мурожаатлар',
        },
        response: {
          type: 'string',
          default: '2024-07-03',
        },
        sended_to_organizations: {
          type: 'string',
          default: '2024-07-02',
        },
        IsDraf: {
          type: 'string',
          default: 'false',
        },

        performer_id: {
          type: 'string',
          default: '2024-07-02',
        },
        additional_phone: {
          type: 'string',
          default: '9989999999',
        },
        application_birthday: {
          type: 'string',
          default: '2024-07-02',
        },
        executer: {
          type: 'string',
          default: '2024-07-02',
        },
        mfy: {
          type: 'string',
          default: 'qatdir',
        },
        operator_number: {
          type: 'string',
          default: '2024-07-02',
        },
        street_and_apartment: {
          type: 'string',
          default: '2024-07-02',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Request() request: CustomRequest,
    @Body() updateOrganizationDto: UpdateApplicationCallCenterDto,
  ): Promise<void> {
    await this.#_service.update(request, id, updateOrganizationDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.ADMIN)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
