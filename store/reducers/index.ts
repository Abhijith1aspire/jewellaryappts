import {combineReducers} from 'redux';
import cartReducer from '../../src/screens/CartScreen/reducer';
import favReducer from '../../src/screens/FavoritesScreen/reducer'

const rootReducer = combineReducers({
  cartdata: cartReducer,
  favdata:favReducer
});

export default rootReducer;