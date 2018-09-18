import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RestuarantListItem from './restuarantListItem';
import { getRestaurantsList } from '../../actions';

class RestuarantList extends Component {
  constructor(props) {
    super(props);
  }



  render() {

    const restaurantsItems = this.props.restaurantsList.map((restuarant, i) =>
      <RestuarantListItem
        key={i}
        restuarant={restuarant}
      />)


    return (
      <ul className="col-md-12">
        {restaurantsItems}
      </ul>
    );
  }
}

const mapStateToProps = ({ restuarants }) => {
  const { restaurantsList, Loading } = restuarants;
  return { restaurantsList, Loading };

};
export default connect(mapStateToProps, {
  getRestaurantsList
})(RestuarantList);

