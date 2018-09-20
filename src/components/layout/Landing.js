import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getAuthToken } from '../../actions';
import RestuarantList from '../restuarant/restuarantList';

class Landing extends Component {
  componentDidMount() {
    this.props.getAuthToken();
  }
  render() {
    return (
      <RestuarantList />
    );
  }
}
Landing.propTypes = {
  getAuthToken: PropTypes.func.isRequired,
};
export default connect(null, { getAuthToken })(Landing);