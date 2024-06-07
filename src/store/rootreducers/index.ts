import {combineReducers} from 'redux';
import cartReducer from '../../screens/CartScreen/reducer';
import favReducer from '../../screens/FavoritesScreen/reducer';
import userDataReducer from '../../screens/UsersScreen/reducer';
import bannerDataReducer from '../../screens/HomeScreen/reducer';


const rootReducer = combineReducers({
  cartdata: cartReducer,
  favdata:favReducer,
  userData:userDataReducer,
  bannerData:bannerDataReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;