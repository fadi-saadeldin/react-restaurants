import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import styles from './style.less';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

class RestuarantListItem extends Component {
  constructor() {
    super();
  }

  onRestaurantPress(id) {
this.props.history.push('restaurant/'+id)
  }
  render() {
    console.log(this.props.restuarant);
    const {general,address,rating,id}=this.props.restuarant;
    return (
      <li
        className='retuarant-item row'
        onClick={()=>this.onRestaurantPress(id)}
      >
    <div className="col-md-3">
         <img src={general.logo_uri}/>
    </div>
    <div className="col-md-9 text-left">
       <div>
        <h3>{general.name}</h3>
        <span>{rating.average}</span>
        </div>
        <div className="location">{address.city} {address.country}</div>
        <ul className="list-group">
              {general.categories[0].split(',').map((category, index) => (
                <li key={index} className="list-category">
                  {category}
                </li>
              ))}
            </ul>

    </div>

      </li>
    );
  }
}



export default withRouter(RestuarantListItem);
