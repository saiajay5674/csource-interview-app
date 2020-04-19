import { Company } from './Company';
import { Student } from './Student';
import { Interview } from './Interview';

export class Careerfair {

  _id: string;
  term: string;
  year: number;
  companies: string[];
  students: Student[];
  interviews: Interview[];
  current: Boolean;
};
