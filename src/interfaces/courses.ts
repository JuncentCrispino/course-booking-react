export interface ICourse {
  course_name: string;
  instructor: string;
  description: string;
  schedule: string;
  available_slots: number;
  price: number;
  is_active: boolean;
  enrollees: string[];
}
