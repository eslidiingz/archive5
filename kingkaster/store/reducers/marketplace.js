import { TOGGLE_FAVORITE, ADD_CART } from '../actions/marketplace';
import dummyProduct from '../../data/dummyProduct'
const initialState = {
    product: dummyProduct,
    favoriteProduct: [],
    favList: [],
    cart: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART:
            const product = state.product.find(state => state.id === action.product_id);
            return {
                ...state,
                cart: state.cart.concat({ id:action.product_id, detail: product, size: action.size,color: action.color, amount:action.amount })
            }
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteProduct.findIndex(
                fav => fav.favorite_id === action.fav_id
            );
            const existingIndexList = state.favList.findIndex(
                fav => fav.id === action.fav_id
            );
            if (existingIndex >= 0) {

                const updatedFav = [...state.favoriteProduct];
                const updateList = [...state.favList]
                updatedFav.splice(existingIndex, 1);
                updateList.splice(existingIndexList, 1)
                return { ...state, favoriteProduct: updatedFav, favList: updateList };
            } else {
                const favproduct = state.product.find(state => state.id === action.fav_id);
                return {
                    ...state,
                    favoriteProduct: state.favoriteProduct.concat({ favorite_id: action.fav_id }),
                    favList: state.favList.concat(favproduct)
                }
            }
        default:
            return state;
    }
};
