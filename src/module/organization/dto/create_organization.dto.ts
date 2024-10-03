import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsObject,
  IsIn,
  IsBoolean,
} from 'class-validator';

export class CreateApplicationCallCenterDto {
  @IsString()
  // @IsNotEmpty()
  sub_category_id: string;

  @IsString()
  district_id: string;

  @IsString()

  applicant: string;

  @IsString()
  application_type: string;

  @IsString()
  comment: string;


  // @IsString()
  // income_number: string;

  @IsString()
  phone: string;
  // @IsString()
  // crossfields: string;

  @IsString()
  income_date: string;

  // @IsString()
  // @IsNotEmpty()
  // incoming_number: string;

  @IsString()
  status: string;

  @IsString()
  organization_type: string;

  @IsString()
  perform_date: string;

  @IsString()
  email: string;

  @IsString()
  resend_application: string;

  @IsString()
  response: string;

  @IsString()
  sended_to_organizations: string;



  @IsString()
  IsDraf: string;

  performer_id: string

  additional_phone: string

  applicant_birthday: string

  executer: string

  gender: string

  mfy: string

  operator_number: string

  street_and_apartment: string





}
