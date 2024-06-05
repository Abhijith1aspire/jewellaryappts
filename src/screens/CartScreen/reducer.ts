import { ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

type CartState = {
  items: { id: string; title: string; price: number; image: string }[];
}

type Action = { type: string; payload: any };

const initialState: CartState = {
  items: [],
};



const cartReducer = (state: CartState = initialState, action: Action): CartState => {
  switch (action.type) {
      case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
