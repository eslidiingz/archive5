import { gql } from "@apollo/client";

export const QUERY_FORM = gql`
  query RegisterFormByUid($uid: String!) {
    registerFormByUid(uid: $uid) {
      id
      uuid
      event_uid
      topic
      description
      require
      is_active
      start_date
      end_date
      created_at
      updated_at
      deleted_at
      questions {
        id
        uuid
        form_uid
        name
        description
        input_type_slug
        choice_list
        created_at
        updated_at
        deleted_at
      }
    }
  }
`;
export const MUTATION_ANSWER = gql`
  mutation CreateAnswerList($createAnswerInput: [CreateAnswerInput!]!) {
    createAnswerList(createAnswerInput: $createAnswerInput)
  }
`;
