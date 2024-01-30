export interface iQuestion {
  choice_list: string;
  created_at: Date;
  deleted_at: Date;
  description: string;
  form_uid: string;
  id: number;
  input_type_slug: string;
  name: string;
  updated_at: Date;
  uuid: string;
  __typename: string;
}

export interface iForm {
  id: string;
  uuid: string;
  event_uid: string;
  topic: string;
  description: string;
  require: boolean;
  is_active: boolean;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  questions: iQuestion[];
}
const newDate = new Date();
export const defaultForm = {
  id: "",
  uuid: "",
  event_uid: "",
  topic: "",
  description: "",
  require: false,
  is_active: false,
  start_date: newDate,
  end_date: newDate,
  created_at: newDate,
  updated_at: newDate,
  deleted_at: newDate,
  questions: [],
};

export interface iAnswer {
  form_uid: string;
  question_uid: string;
  result: string;
  user_uid: string;
}

export const defaultAnswer = {
  form_uid: "",
  question_uid: "",
  result: "",
  user_uid: "",
};
