import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query GET_EVENT($uid: String!) {
    eventByuid(uid: $uid) {
      id
      uid
      name
      description
      image_url
      room_event_uid
      verse_uid
      ref_type
      ref_uid
      room_link
      json_url
      is_active
      start_at
      expired_at
      created_at
      updated_at
      deleted_at
    }
  }
`