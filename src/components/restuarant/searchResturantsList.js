import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RestuarantListItem from './restuarantListItem';
import { getRestaurantsList } from '../../actions';
import queryString from 'query-string';
let sortValue;
let filterValue;
class SearchResturantsList extends Component {
  state = {
    categoriesList: [],
    filterValue: "",
    sortValue: "",
    RestaurantsListResults: []
  }
  componentWillMount() {
    this.props.getRestaurantsList();
  }
  componentDidMount() {
    const search_values = queryString.parse(this.props.location.search);
    if (search_values.category) {
      this.onSearchFilter(search_values.category);
      filterValue = search_values.category;
    }
    if (search_values.sortby) {
      this.onSearchSort(search_values.sortby);
      sortValue = search_values.sortby;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurantsList.length > 0) {
      this.getCategories(nextProps.restaurantsList);
    }
  }
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
  // on get category filter
  onSearchFilter(value) {
    let filtered_restaurants = [];
    filterValue = value;
    filtered_restaurants = _.filter(this.props.restaurantsList, function (p) {
      return _.includes(value, p.general.categories);
    });
    this.setState({ RestaurantsListResults: filtered_restaurants });
    let search_value = this.props.history.location.search.includes("sortby");
    if (search_value) {
      this.props.history.push('/restaurants?category=' + value + '&sortby=' + sortValue);
    } else {
      this.props.history.push('/restaurants?category=' + value)
    }
  }

  // on change category filter
  onFilterChange(event) {
    let filtered_restaurants = [];
    filterValue = event.target.value;

    filtered_restaurants = _.filter(this.props.restaurantsList, function (p) {
      return _.includes(event.target.value, p.general.categories);
    });
    this.setState({ RestaurantsListResults: filtered_restaurants })
    let search_value = this.props.history.location.search.includes("sortby");
    if (search_value) {
      this.props.history.push('/restaurants?category=' + event.target.value + '&sortby=' + sortValue);
    } else {
      this.props.history.push('/restaurants?category=' + event.target.value)
    }
  }

  // on change sort filter
  onSortChange(event) {
    sortValue = event.target.value;
    if (event.target.value === 'rating') {
      this.setState({ sortValue: 'rating' });
      this.setState({ RestaurantsListResults: _.sortBy(this.state.RestaurantsListResults, 'rating.average').reverse() })
    } else if (event.target.value === 'comments') {
      this.setState({ sortValue: 'comments' });
      this.setState({ RestaurantsListResults: _.sortBy(this.state.RestaurantsListResults, 'address.comments').reverse() })
    }
    let search_value = this.props.history.location.search.includes("category")
    if (search_value) {
      this.props.history.push('/restaurants?category=' + filterValue + '&sortby=' + event.target.value);
    } else {
      this.props.history.push('/restaurants?sortby=' + event.target.value)
    }
  }

  // on change sort filter
  onSearchSort(value) {
    sortValue = value;
    if (value === 'rating') {
      this.setState({ RestaurantsListResults: _.sortBy(this.props.RestaurantsListResults, 'rating.average').reverse() })
    } else if (value === 'comments') {
      this.setState({ RestaurantsListResults: _.sortBy(this.props.RestaurantsListResults, 'address.comments').reverse() })
    }

    let search_value = this.props.history.location.search.includes("category")
    if (search_value) {
      this.props.history.push('/restaurants?category=' + filterValue + '&sortby=' + value);
    } else {
      this.props.history.push('/restaurants?sortby=' + value)
    }
  }

  render() {
    let restaurantsItems;
    if (this.state.RestaurantsListResults == "") {
      restaurantsItems = <div>No results found</div>;
    } else {
      restaurantsItems = this.state.RestaurantsListResults.map((restuarant, i) =>
        <RestuarantListItem
          key={i}
          restuarant={restuarant}
        />)
    }

    const categoriesFilter = (<div className="categories-filter">
      <label>
        <select value={filterValue} onChange={this.onFilterChange.bind(this)}>
          {this.state.categoriesList.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </label>
      <label>
        <select value={sortValue} onChange={this.onSortChange.bind(this)}>
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
SearchResturantsList.propTypes = {
  getRestaurantsList: PropTypes.func.isRequired,
  restaurantsList: PropTypes.object.isRequired,
};

const mapStateToProps = ({ restuarants }) => {
  const { restaurantsList, Loading } = restuarants;
  return { restaurantsList, Loading };

};
export default withRouter(connect(mapStateToProps, {
  getRestaurantsList
})(SearchResturantsList));

