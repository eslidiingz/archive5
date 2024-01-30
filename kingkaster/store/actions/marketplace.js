export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const ADD_CART = 'ADD_CART'
export const add_cart = (id,color,size,amount) => {
    return async(dispatch,getState) => {
        dispatch({
            type: ADD_CART,
             product_id: id,
             color:color,
             size:size,
             amount:amount

        })
    }
}

export const favorite_cart = (id) => {
    return {
        type: TOGGLE_FAVORITE,
        fav_id: id
    }
}