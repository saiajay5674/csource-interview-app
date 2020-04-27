import { Company } from './Company';
import { Student } from './Student';

export class Interview {

  _id: string;
  company: Company;
  student: Student;
  time: Date;
  complete: boolean;

};
