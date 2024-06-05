import { ADD_TO_CART,  REMOVE_FROM_CART} from './actionTypes';

type AddItem = {
    items: { id: string; title: string; price: number; image: string ; originalprice:number; offer:string; description:string }[];
  }

  type RemoveItem={
    itemId:{id:string}
  }

export const addToCart = (item:AddItem) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (itemId:RemoveItem) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};

