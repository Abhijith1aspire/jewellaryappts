import {ADD_TO_FAV, REMOVE_FROM_FAV } from "./actionTypes";

type FavState = {
  items: { id: string; title: string; price: number; image: string ;originalprice:number;offer:string;description:string }[];
}

type Action = { type: string; payload: any };

const initialState: FavState = {
  items: [],
};



const favReducer = (state: FavState = initialState, action: Action): FavState => {
  switch (action.type) {
      case ADD_TO_FAV:
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
      };
    case REMOVE_FROM_FAV:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default favReducer;
