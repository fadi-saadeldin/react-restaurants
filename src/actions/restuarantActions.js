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
        localStorage.setItem('token', res.data.token);
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
    let token= localStorage.getItem('token');

    axios
      .get(API_URL + '/restaurants',
      {headers: {'token': token}
    })
      .then(res => {
      // get restaurats list results
        dispatch({
          type: RESTAURANTS_LIST_RESULTS,
          payload: res.data.data
        })
      })
      .catch(err => console.log(err)
      );
  };



// Get Restuarant
export const getRestaurantDetails = id => dispatch => {
 dispatch({ type: CLEAR_RESTAURANT_DETAILS });
 let token= localStorage.getItem('token');
  axios
    .get(API_URL+`/restaurants/${id}`,
    {headers: {'token': token}
  }
  )
    .then(res =>
      dispatch({
        type: RESTAURANT_DETAILS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RESTAURANT_DETAILS,
        payload: []
      })
    );
};






