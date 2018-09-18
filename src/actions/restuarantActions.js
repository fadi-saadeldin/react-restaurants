import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  RESTAURANTS_LIST_RESULTS,
  RESTAURANT_DETAILS,
  SPINNER_LOADING,
  CLEAR_RESTAURANT_DETAILS
} from './types';

const API_URL = 'https://mockapi.pizza.de/v1';
//  Get Auth Token
export const getAuthToken = () =>
  dispatch => {
    axios
      .get(API_URL + '/auth')
      .then(res => {
        // Set token to Auth header
        setAuthToken(res.data.token);
        // get restuatants list
        dispatch(getRestaurantsList());
      })
      .catch(err => console.log(err)
      );
  };

// Get Retaurants List
export const getRestaurantsList = () =>
  dispatch => {
    dispatch({ type: SPINNER_LOADING });
    axios
      .get(API_URL + '/restaurants')
      .then(res => {
        console.log(res.data.data)
        // get restaurats list results
        dispatch({
          type: RESTAURANTS_LIST_RESULTS,
          payload: res.data.data
        })
      })
      .catch(err => console.log(err)
      );
  };

// Get retautant details
export const getRestaurantDetails = (id) =>
  dispatch => {
    dispatch({ type: CLEAR_RESTAURANT_DETAILS });
    axios
      .get(API_URL + '/restaurant/' + id)
      .then(res => {
        console.log(res.data.data)
        // get restaurats list results
        dispatch({
          type: RESTAURANT_DETAILS,
          payload: res.data.data
        })
      })
      .catch(err => console.log(err)
      );
  };







