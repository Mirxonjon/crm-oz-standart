import { IsBoolean, IsString } from 'class-validator';

export class UpdateApplicationCallCenterDto {
  @IsString()
  // @IsNotEmpty()
  sub_category_id: string;

  @IsString()
  district_id: string;

  @IsString()
  // @IsNotEmpty()
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
  // // @IsNotEmpty()
  // incoming_number: string;

  @IsString()
  status: string;

  @IsString()
  organization_type: string;

  @IsString()
  perform_date: string;

  // @IsString()
  email: string;


  @IsString()
  resend_application: string;

  @IsString()
  response: string;

  @IsString()
  sended_to_organizations: string;

  @IsString()
  IsDraf: string;

  performer_id :string
  
  additional_phone:string

  applicant_birthday  :string

  executer  :string

  gender  :string

  mfy  :string

  response_story :string


  operator_number  :string

  street_and_apartment  :string
}
