import { HttpException, HttpStatus } from "@nestjs/common";
import { Category_Section_Entity } from "src/entities/category_org.entity";
import { Region_Entity } from "src/entities/region.entity";
import { Between } from "typeorm";

export const  getStatisticWithRegion = async (findRegions : Region_Entity[] , categoryId :string ,subCategoryId :string  , application_type : string, ) =>{
    let arr = []
    await Promise.all(
    findRegions.map(async (e) => {
        try {
          const results = await Category_Section_Entity.find({
            where: {
              id: categoryId == 'null' ? null : categoryId,
              sub_category_orgs: {
                id: subCategoryId == 'null' ? null : subCategoryId,
                applicationCallcenter: {
                    application_type : application_type,
                  IsDraf: 'false',
                  districts: {
                    region: {
                      id: e.id
                    }
                  }
                }
              }
            },
            relations: {
              sub_category_orgs: {
                applicationCallcenter: {
                  districts: {
                    region: true
                  }
                }
              }
            },
            order: {
              create_data: 'desc'
            }
          });
    
          results.forEach(item => {
            item.sub_category_orgs.forEach(subCategory => {
              arr.push({
                ...item,
                sub_category_orgs: {
                  ...subCategory,
                  count: subCategory.applicationCallcenter.length,
                  application_type : application_type,
                  region: e
                }
              });
            });
          });
        } catch (error) {
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    })
    )
    console.log(arr);
    

    return arr
}

export const  getStatisticWithRegionDate = async (region :string, categoryId :string ,subCategoryId :string  , application_type : string, Date_from :Date ,Date_to :Date) =>{
    const result: any = await Category_Section_Entity.findAndCount({
        where: {
          id: categoryId == 'null' ? null : categoryId,
          sub_category_orgs :{
            id: subCategoryId == 'null' ? null : subCategoryId,
            applicationCallcenter :{
                application_type :application_type ,
              IsDraf: 'false',
              districts :{
                region : {
                  id: region == 'null' ? null : region,
                 }
              },
              create_data: Between(Date_from, Date_to),
            }
          }
        },
        relations: {
         sub_category_orgs: {
          applicationCallcenter: {
            districts: {
              region: true
            },
          }
         },
      },
        order: {
          create_data: 'desc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
      let arr = [ ]
      let   resultsa : any = result.forEach(item  => {
        item.sub_category_orgs.forEach(subCategory => {

          arr.push({
            item,
            subCategory,
            count : subCategory.applicationCallcenter.length ,
            application_type :application_type
          })
            // subCategory.count = subCategory.applicationCallcenter.length ;
        });
    });

    return arr
}