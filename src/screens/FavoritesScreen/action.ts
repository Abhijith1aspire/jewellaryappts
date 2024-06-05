import { ADD_TO_FAV,REMOVE_FROM_FAV } from './actionTypes';

type AddItem = {
    items: { id: string; title: string; price: number; image: string; originalprice:number; offer:string; description:string }[];
  }

  type RemoveItem={
    itemId:{id:string}
  }

export const addToFav= (item:AddItem) => {
  return {
    type: ADD_TO_FAV,
    payload: item,
  };
};

export const removeFromFav = (itemId:RemoveItem) => {
  return {
    type: REMOVE_FROM_FAV,
    payload: itemId,
  };
};

