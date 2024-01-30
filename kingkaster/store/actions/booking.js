export const SELECT_BOOKING = 'SELECT_BOOKING'
export const MONTH = 'MONTH'
export const INSERT_POINT = 'INSERT_POINT'
export const BOOKING_ARCADE = 'BOOKING_ARCADE'
export const BOOKING_LEARNING = 'BOOKING_LEARNING'
export const CLEAR_ARCADE = 'CLEAR_ARCADE'
export const createMonth = (month) => {
    return {
        type: MONTH,
        month: month
    }
}
export const selectBooking = (date, room, time) => {
    return {
        type: SELECT_BOOKING,
        date: date,
        room: room,
        time: time,
    }
}
export const learningBooking = (detailbook) => {
    return {
        type: BOOKING_LEARNING,
        detailbook: detailbook,
    }
}
export const pointUse = (point) => {
    return {
        type: INSERT_POINT,
        point: point
    }
}
export const bookingArcade = (location, time) => {
    return async (dispatch) => {
        time.sort((a, b) => a.index - b.index)
       const Section = []
        
        if(time.length > 1){
            Section.push({
                section:1,
                start: time[0].time,
                end: time[time.length-1].time,
                totalhour: time.length
            })
        }else{
            Section.push({
                section:1,
                start: time[0].time,
                end: time[time.length-1].time,
                totalhour: time.length
            })
        }

        dispatch({
            type: BOOKING_ARCADE,
            booking_detail: {
                location: location,
                detail: Section
            }
        })

    }
}
export const clearbookingArcade = () => {
    return {
        type: CLEAR_ARCADE,
    }
}