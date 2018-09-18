import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getAuthToken } from '../../actions';
import RestuarantList from '../restuarant/restuarantList';

class Landing extends Component {
  componentDidMount(){
this.props.getAuthToken();
  }
  render() {
    return (
      <RestuarantList />
    );
  }
}

export default connect(null,{getAuthToken})(Landing);