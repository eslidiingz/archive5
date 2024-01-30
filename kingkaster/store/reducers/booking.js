import { SELECT_BOOKING,MONTH,INSERT_POINT, BOOKING_ARCADE,BOOKING_LEARNING, CLEAR_ARCADE } from '../actions/booking';

const initialState = {
    date: null,
    room: null,
    time: null,
    month:null,
    point:0,
    bookingdetail: null,
    detailbook: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MONTH:
            return{
                ...state,
                month:action.month
            }
        case SELECT_BOOKING:
            return {
                ...state,
                date: action.date,
                room: action.room,
                time: action.time,
            };
        case INSERT_POINT:
            return {
                ...state,
                point: action.point
            }
        case BOOKING_ARCADE:
            return {
                ...state,
                bookingdetail: action.booking_detail
            }
        case BOOKING_LEARNING:
            return{
                ...state,
                detailbook: action.detailbook
            }
        case CLEAR_ARCADE:
            return {
                ...state,
                bookingdetail: null
            }
        default:
            return state;
    }
};
