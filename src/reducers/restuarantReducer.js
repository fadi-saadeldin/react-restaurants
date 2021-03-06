
import {
  RESTAURANTS_LIST_RESULTS,
  RESTAURANT_DETAILS,
  CLEAR_RESTAURANT_DETAILS,
  SPINNER_LOADING,
} from '../actions/types';

const initialState = {
  restaurantsList: [],
  loading: false,
  restaurantDetails: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESTAURANTS_LIST_RESULTS:
      return {
        ...state,
        restaurantsList: action.payload,
        loading: false
      };
    case SPINNER_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_RESTAURANT_DETAILS:
      return {
        ...state,
        restaurantDetails: [],
        loading: true
      }
    case RESTAURANT_DETAILS:
      return {
        ...state,
        restaurantDetails: action.payload,
        loading: false
      };

    default:
      return state;
  }
}

