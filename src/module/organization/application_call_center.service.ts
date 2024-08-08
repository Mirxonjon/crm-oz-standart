import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationCallCenterDto } from './dto/create_organization.dto';
import { UpdateApplicationCallCenterDto } from './dto/update_organization.dto';

import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';

import { ApplicationCallCenterEntity } from 'src/entities/applicationCallCenter.entity';
import { Between, ILike } from 'typeorm';
import { District_Entity } from 'src/entities/district.entity';
import { CustomRequest } from 'src/types';
import { HistoryAplicationEntity } from 'src/entities/history.entity';
import { SendedOrganizationEntity } from 'src/entities/sende_organization.entity';
import { PerformerEntity } from 'src/entities/performer.entity';

@Injectable()
export class ApplicationCallCenterServise {
async findallstatisticsfilter( 
  categoryId: string,
  subCategoryId: string,
  region: string,
  fromDate: string,
  untilDate: string,
  pageNumber = 1,
  pageSize = 10){
    const offset = (pageNumber - 1) * pageSize;
    if (fromDate == 'null' || untilDate == 'null') {
      const [results, total] = await ApplicationCallCenterEntity.findAndCount({
        where: {
          IsDraf: 'false',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            region : {
              id: region == 'null' ? null : region,
             }
          },
        },
        relations: {
          sub_category_call_center: {
            category_org: true,
          },
          districts: {
            region: true

        },},
        skip: offset,
        take: pageSize,
        order: {
          create_data: 'asc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
    } else {
      const fromDateFormatted = new Date(
        parseInt(fromDate.split('.')[2]),
        parseInt(fromDate.split('.')[1]) - 1,
        parseInt(fromDate.split('.')[0]),
      );
      const untilDateFormatted = new Date(
        parseInt(untilDate.split('.')[2]),
        parseInt(untilDate.split('.')[1]) - 1,
        parseInt(untilDate.split('.')[0]),
      );

      const [results, total] = await ApplicationCallCenterEntity.findAndCount({
        where: {
          IsDraf: 'false',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            region : {
              id: region == 'null' ? null : region,
             }
          },
          create_data: Between(fromDateFormatted, untilDateFormatted),
        },
        relations: {
          sub_category_call_center: {
            category_org: true,
          },
          districts: {
            region: true

        },
      seded_to_Organization :true
    },
        skip: offset,
        take: pageSize,
        order: {
          create_data: 'asc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
    }
}


  async findAllNotDrafts(
    categoryId: string,
    subCategoryId: string,
    region: string,
    district : string,
    income_number :string,
    operator :string ,
    response : string,
    application_type :string,
    applicant :string,
    phone:string,
    applicant_birthday: string,
    fromDate: string,
    untilDate: string,
    pageNumber = 1,
    pageSize = 10,
  ) {
    const offset = (pageNumber - 1) * pageSize;

    if (fromDate == 'null' || untilDate == 'null') {
      const [results, total] = await ApplicationCallCenterEntity.findAndCount({
        where: [{
          incoming_number : income_number == 'null' ? null :  ILike(`%${income_number}%`),
          applicant : applicant == 'null' ? null :  ILike(`%${applicant}%`),
          phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          // additional_phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          applicant_birthday: applicant_birthday =='null'? null : applicant_birthday,
          response: response =='null'? null : response,
          application_type: application_type =='null'? null : application_type,
          IsDraf: 'false',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          user: {
            id: operator == 'null' ? null : operator
          }
        },{
        incoming_number : income_number == 'null' ? null :  ILike(`%${income_number}%`),
        applicant : applicant == 'null' ? null :  ILike(`%${applicant}%`),
        additional_phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
        applicant_birthday: applicant_birthday =='null'? null : applicant_birthday,
        response: response =='null'? null : response,
        application_type: application_type =='null'? null : application_type,
        IsDraf: 'false',
        sub_category_call_center: {
          id: subCategoryId == 'null' ? null : subCategoryId,
          category_org: {
            id: categoryId == 'null' ? null : categoryId,
          },
        },
        districts : {
          id: district =='null' ? null : district,
          region : {
            id: region == 'null' ? null : region,
           }
        },
        user: {
          id: operator == 'null' ? null : operator
        }
      },
      ],
        relations: {
          seded_to_Organization:true,
          sub_category_call_center: {
            category_org: true,
          },
          districts: {
            region: true
          },
          user : true,
          performers: true,
    
        },
        skip: offset,
        take: pageSize,
        order: {
          create_data: 'asc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
    } else {
      const fromDateFormatted = new Date(
        parseInt(fromDate.split('.')[2]),
        parseInt(fromDate.split('.')[1]) - 1,
        parseInt(fromDate.split('.')[0]),
      );
      const untilDateFormatted = new Date(
        parseInt(untilDate.split('.')[2]),
        parseInt(untilDate.split('.')[1]) - 1,
        parseInt(untilDate.split('.')[0]),
      );

      const [results, total] = await ApplicationCallCenterEntity.findAndCount({
        where: [{
          incoming_number : income_number == 'null' ? null :  ILike(`%${income_number}%`),
          applicant : applicant == 'null' ? null :  ILike(`%${applicant}%`),
          response: response =='null'? null : response,
          application_type: application_type =='null'? null : application_type,
          phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          // additional_phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          applicant_birthday: applicant_birthday =='null'? null : applicant_birthday,
          IsDraf: 'false',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          create_data: Between(fromDateFormatted, untilDateFormatted),
        },
        {
          incoming_number : income_number == 'null' ? null :  ILike(`%${income_number}%`),
          applicant : applicant == 'null' ? null :  ILike(`%${applicant}%`),
          response: response =='null'? null : response,
          application_type: application_type =='null'? null : application_type,
          // phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          additional_phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          applicant_birthday: applicant_birthday =='null'? null : applicant_birthday,
          IsDraf: 'false',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          create_data: Between(fromDateFormatted, untilDateFormatted),
        }
      ],
        relations: {
          sub_category_call_center: {
            category_org: true,
          },
          districts: {
            region: true
          },
          seded_to_Organization:true,
          performers: true,

        },
        skip: offset,
        take: pageSize,
        order: {
          create_data: 'asc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
    }
  }


  async findAllDrafts(
    categoryId: string,
    subCategoryId: string,
    region: string,
    district : string,
    income_number :string,
    operator :string ,
    response : string,
    application_type: string,
    applicant :string,
    phone :string,
    applicant_birthday :string,
    fromDate: string,
    untilDate: string,
    pageNumber = 1,
    pageSize = 10,
  ) {
    const offset = (pageNumber - 1) * pageSize;

    if (fromDate == 'null' || untilDate == 'null') {
      const [results, total] = await ApplicationCallCenterEntity.findAndCount({
        where:[ {
          incoming_number : income_number == 'null' ? null :  ILike(`%${income_number}%`),
          applicant : applicant == 'null' ? null :  ILike(`%${applicant}%`),
          response: response =='null'? null : response,
          phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          // additional_phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          applicant_birthday: applicant_birthday =='null'? null : applicant_birthday,
          application_type  : application_type =='null'? null : application_type,
          IsDraf: 'true',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          user: {
            id: operator == 'null' ? null : operator
          }
        },
        {
          incoming_number : income_number == 'null' ? null :  ILike(`%${income_number}%`),
          applicant : applicant == 'null' ? null :  ILike(`%${applicant}%`),
          response: response =='null'? null : response,
          // phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          additional_phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          applicant_birthday: applicant_birthday =='null'? null : applicant_birthday,
          application_type  : application_type =='null'? null : application_type,
          IsDraf: 'true',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          user: {
            id: operator == 'null' ? null : operator
          }
        }
      ],
        relations: {
          sub_category_call_center: {
            category_org: true,
          },
          districts: {
            region: true
          },
          seded_to_Organization:true,
          user : true,
          performers: true,

        },
        skip: offset,
        take: pageSize,
        order: {
          create_data: 'asc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
    } else {
      const fromDateFormatted = new Date(
        parseInt(fromDate.split('.')[2]),
        parseInt(fromDate.split('.')[1]) - 1,
        parseInt(fromDate.split('.')[0]),
      );
      const untilDateFormatted = new Date(
        parseInt(untilDate.split('.')[2]),
        parseInt(untilDate.split('.')[1]) - 1,
        parseInt(untilDate.split('.')[0]),
      );

      const [results, total] = await ApplicationCallCenterEntity.findAndCount({
        where: [{
          incoming_number : income_number == 'null' ? null :  ILike(`%${income_number}%`),
          applicant : applicant == 'null' ? null :  ILike(`%${applicant}%`),
          response: response =='null'? null : response,
          phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          // additional_phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          applicant_birthday: applicant_birthday =='null'? null : applicant_birthday,
          application_type: application_type =='null'? null : application_type,
          IsDraf: 'true',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          create_data: Between(fromDateFormatted, untilDateFormatted),
        },
        {
          incoming_number : income_number == 'null' ? null :  ILike(`%${income_number}%`),
          applicant : applicant == 'null' ? null :  ILike(`%${applicant}%`),
          response: response =='null'? null : response,
          // phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          additional_phone :  phone == 'null' ? null :  ILike(`%${phone}%`),
          applicant_birthday: applicant_birthday =='null'? null : applicant_birthday,
          application_type: application_type =='null'? null : application_type,
          IsDraf: 'true',
          sub_category_call_center: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          create_data: Between(fromDateFormatted, untilDateFormatted),
        },
      ],
        relations: {
          sub_category_call_center: {
            category_org: true,
          },
          districts: {
            region: true
          },
          seded_to_Organization:true,
          performers: true,

        },
        skip: offset,
        take: pageSize,
        order: {
          create_data: 'asc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
    }
  }


  async findOne(id: string) {
    const findOne = await ApplicationCallCenterEntity.find({
      where: {
        id,
      },
      relations: {
        sub_category_call_center: {
          category_org: true,
          
        },
        districts : {
          region : true
        },
        seded_to_Organization: true,
        performers: true,

        history: {
          user_history:true
        },
        user : true
      },
      order: {
        create_data: 'asc',
        history: {
          create_data: 'desc'
        }
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findOne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return findOne;
  }

  async create(request: CustomRequest, body: CreateApplicationCallCenterDto) {

    let findSubCategory = null;

    if (body.sub_category_id != 'null') {
      findSubCategory = await Sub_Category_Section_Entity.findOne({
        where: {
          id: body.sub_category_id,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }
    let findDistrict = null;
    if (body.district_id != 'null') {
      findDistrict = await District_Entity.findOne({
        where: {
          id: body.district_id,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    let seded_to_Organization = null 
    if (body.sended_to_organizations != 'null') {
      seded_to_Organization = await SendedOrganizationEntity.findOne({
        where: {
          id: body.sended_to_organizations,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    let performer_id = null 
    if (body.performer_id != 'null') {
      performer_id = await PerformerEntity.findOne({
        where: {
          id: body.performer_id,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    const ApplicationCount =  await ApplicationCallCenterEntity.count() 

    const createdOrg = await ApplicationCallCenterEntity.createQueryBuilder()
      .insert()
      .into(ApplicationCallCenterEntity)
      .values({
        applicant: body.applicant,
        application_type: body.application_type,
        comment: body.comment,
        // income_number: body.income_number,
        phone: body.phone,                                       
        // crossfields: body.crossfields,
        income_date: body.income_date,
        incoming_number: `UZST/${ApplicationCount+1}`,
        status: body.status,
        organization_type: body.organization_type,
        perform_date: body.perform_date,
        email: body.email ,
        resend_application: body.resend_application,
        response: body.response,
        IsDraf: body.IsDraf,
        sub_category_call_center: findSubCategory,
        districts : findDistrict,
        seded_to_Organization: seded_to_Organization,
        performers: performer_id,
        additional_phone : body.additional_phone,
        applicant_birthday :body.applicant_birthday,
        executer : body.executer,
        gender :body.gender,
        mfy: body.mfy,
        operator_number :body.operator_number,
        street_and_apartment: body.street_and_apartment,
        user: {
          id :request.userId
        }
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

    return;
    // }
  }

  async update(request: CustomRequest, id: string, body: UpdateApplicationCallCenterDto) {
    const findaplicationCallCenter = await ApplicationCallCenterEntity.findOne({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    let findSubCategory = findaplicationCallCenter.sub_category_call_center;

    if (body.sub_category_id != 'null') {
      findSubCategory = await Sub_Category_Section_Entity.findOne({
        where: {
          id: body.sub_category_id,
        },
      }).catch((e) => {
        console.log(e);

        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }
    
    let findDistrict = findaplicationCallCenter.districts;
    if (body.district_id != 'null') {
      findDistrict = await District_Entity.findOne({
        where: {
          id: body.district_id,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    let seded_to_Organization = findaplicationCallCenter.seded_to_Organization
    if (body.sended_to_organizations != 'null') {
      seded_to_Organization = await SendedOrganizationEntity.findOne({
        where: {
          id: body.sended_to_organizations,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    let performer_id = findaplicationCallCenter.performers
    if (body.performer_id != 'null') {
      performer_id = await PerformerEntity.findOne({
        where: {
          id: body.performer_id,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }
    // console.log(findSubCategory, findDistrict, 'okk');
    
    const updatedOrganization = await ApplicationCallCenterEntity.update(id, {
      
      applicant: body.applicant || findaplicationCallCenter.applicant,
      application_type:
        body.application_type || findaplicationCallCenter.application_type,
      comment: body.comment || findaplicationCallCenter.comment,
      // crossfields: body.crossfields || findaplicationCallCenter.crossfields,
      income_date: body.income_date || findaplicationCallCenter.income_date,
      phone: body.phone || findaplicationCallCenter.phone, 
      status:
        body.status || findaplicationCallCenter.status,
      organization_type:
        body.organization_type || findaplicationCallCenter.organization_type,
      perform_date: body.perform_date || findaplicationCallCenter.perform_date,
      email: body.email|| findaplicationCallCenter.email,
      resend_application:
        body.resend_application || findaplicationCallCenter.resend_application,
      response: body.response || findaplicationCallCenter.response,
      seded_to_Organization : seded_to_Organization ,
        IsDraf: body.IsDraf || findaplicationCallCenter.IsDraf ,
      sub_category_call_center: findSubCategory,
      districts :findDistrict ,       
      performers: performer_id ,
      additional_phone : body.additional_phone || findaplicationCallCenter.additional_phone,
      applicant_birthday :body.applicant_birthday || findaplicationCallCenter.applicant_birthday,
      executer : body.executer || findaplicationCallCenter.executer,
      gender :body.gender || findaplicationCallCenter.gender,
      mfy: body.mfy || findaplicationCallCenter.mfy,
      operator_number :body.operator_number || findaplicationCallCenter.operator_number,
      street_and_apartment: body.street_and_apartment || findaplicationCallCenter.street_and_apartment ,
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    
    
    if(updatedOrganization){
      console.log(request.userId,'okkk');

      const createdOrg = await HistoryAplicationEntity.createQueryBuilder()
      .insert()
      .into(HistoryAplicationEntity)
      .values({
        applicationCallCenter : findaplicationCallCenter,
        action :'update',
        user_history: {
          id :request.userId
        }
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

      return
    }

  }

  async remove(id: string) {
    const findaplicationCallCenter =
      await ApplicationCallCenterEntity.findOneBy({ id }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

    if (!findaplicationCallCenter) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }

    await ApplicationCallCenterEntity.delete({ id });
  }
}
