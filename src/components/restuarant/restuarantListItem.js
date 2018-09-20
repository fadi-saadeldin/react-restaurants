import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class RestuarantListItem extends Component {

// on press restaurant handle
  onRestaurantPress(id) {
    this.props.history.push('restaurant/' + id)
  }
  render() {
    const { general, address, rating, id } = this.props.restuarant;
    return (
      <li
        className='restuarant-item'
        onClick={() => this.onRestaurantPress(id)}
      >
        <div className="row ">
          <div className="col-md-3">
            <img 
            src={general.logo_uri}
            alt=""
            />
          </div>
          <div className="col-md-9 text-left">
            <div className="title-wrapper">
              <h3 className="title">{general.name}</h3>
              <span className="rating">Average Rate {rating.average}</span>
            </div>
            <div className="location">{address.city} {address.country}</div>
            <ul className="list-categories list">
              {general.categories[0].split(',').map((category, index) => (
                <li key={index} className="list-category">
                  {category}
                </li>
              ))}
            </ul>

          </div>
        </div>
      </li>
    );
  }
}
export default withRouter(RestuarantListItem);
