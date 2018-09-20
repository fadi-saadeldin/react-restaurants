import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RestuarantListItem from './restuarantListItem';
import { getRestaurantsList } from '../../actions';

class RestuarantList extends Component {
  state = {
    categoriesList: [],
    filterValue: "",
    sortValue: ""
  }

  componentDidMount() {
    this.props.getRestaurantsList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurantsList.length > 0) {
      this.getCategories(nextProps.restaurantsList)
    }
  }
  // get categories from restuarants list
  getCategories(restaurantsList) {
    let categories = [];
    restaurantsList.map((restuarant, i) =>
      restuarant.general.categories[0].split(',').map((category, index) => (
        categories.push(category)
      )
      )
    )
    this.setState({ categoriesList: _.uniq(categories) })
  }
 
// on chnage categories filter
  onFilterChange(event) {
    let filtered_restuarants = [];
    this.setState({ filterValue: event.target.value });
    filtered_restuarants = _.filter(this.props.restaurantsList, function (p) {
      return _.includes(event.target.value, p.general.categories);
    });
    this.props.history.push('restaurants?category=' + event.target.value)
  }
// on change sort by filter
  onSortChange(event) {
    console.log(this.props.restaurantsList);
    this.setState({ sortValue: event.target.value });
    if (event.target.value === 'rating') {
      this.props.history.push(
        'restaurants?sortby=' + event.target.value)

    } else if (event.target.value === 'comments') {
      this.props.history.push('restaurants?sortby=' + event.target.value)
    }
  }

  render() {
    const restaurantsItems = this.props.restaurantsList.map((restuarant, i) =>
      <RestuarantListItem
        key={i}
        restuarant={restuarant}
      />)

    const categoriesFilter = (<div className="categories-filter">
      <label>
        <select value={this.state.filterValue} onChange={this.onFilterChange.bind(this)}>
          <option value={'filter'}>{'Filter'}</option>
          {this.state.categoriesList.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </label>
      <label>
        <select value={this.state.sortValue} onChange={this.onSortChange.bind(this)}>
          <option value={"Sortby"}>{"Sort by"}</option>
          <option value={"rating"}>{"Rating"}</option>
          <option value={"comments"}>{"Comments"}</option>
        </select>
      </label>

    </div>
    )
    return (
      <div>
        {categoriesFilter}
        <ul className="col-md-12">
          {restaurantsItems}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ restuarants }) => {
  const { restaurantsList, Loading } = restuarants;
  return { restaurantsList, Loading };

};
export default withRouter(connect(mapStateToProps, { getRestaurantsList })(RestuarantList));

