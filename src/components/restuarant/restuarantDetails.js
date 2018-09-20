import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../common';
import { getRestaurantDetails } from '../../actions';
import PropTypes from 'prop-types';

class RestuarantDetails extends Component {
  componentDidMount() {
    this.props.getRestaurantDetails(this.props.match.params.id);
  }
  render() {
    let restaurantContent;
    if (this.props.restaurantDetails == "") {
      restaurantContent = <Spinner />;

    } else {
      const { info, address, sections, rating } = this.props.restaurantDetails;
      restaurantContent = (
        <div className="restuarant-item ">
          <div className="row restuarant-info">
            <div className="col-md-3">
              <img 
              src={info.logoUri}
               alt="" />
            </div>
            <div className="col-md-9 text-left">
              <div className="title-wrapper">
                <h3 className="title">{info.name}</h3>
                <span className="rating">{rating.average}</span>
              </div>
              <div className="location">{address.city} {address.country}</div>
              <ul className="list-categoies list">
                {info.categories[0].split(',').map((category, index) => (
                  <li key={index} className="list-category">
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="restuarant-details">
            <ul className="list-sections list">
              {sections.map((section, index) => (
                <li key={index} className="list-section text-left">
                  <h3 className="title">{section.name}</h3>
                  <ul>
                    {section.items.map((item, index) => (
                      <li key={index} className="list-section">
                        <div className="item-wrap">
                          <h3 className="title">{item.name}</h3>
                          <div>
                            <span className="price">Price {item.price}</span>
                            <button
                              onClick={() => console.log(item)}
                              className="btn btn-info"
                            >
                              Add to cart
                           </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div className="col-md-12 body-height">
        <div className="res-details">
          {restaurantContent}

        </div>
      </div>
    )

  }
}

RestuarantDetails.propTypes = {
  getRestaurantDetails: PropTypes.func.isRequired,
};

const mapStateToProps = ({ restuarants }) => {
  const { restaurantDetails, Loading } = restuarants;
  return { restaurantDetails, Loading };
};

export default connect(mapStateToProps, {
  getRestaurantDetails
})(RestuarantDetails);