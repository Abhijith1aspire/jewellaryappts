import {combineReducers} from 'redux';
import cartReducer from '../../screens/CartScreen/reducer';
import favReducer from '../../screens/FavoritesScreen/reducer';
import userDataReducer from '../../screens/UsersScreen/reducer';
import bannerDataReducer from '../../screens/HomeScreen/reducer';
import plpDataReducer from '../../screens/ProductListingPage/reducers';


const rootReducer = combineReducers({
  cartdata: cartReducer,
  favdata:favReducer,
  userData:userDataReducer,
  bannerData:bannerDataReducer,
  productData:plpDataReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;