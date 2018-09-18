import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../common';


class RestuarantDetail extends Component {

  render() {
  

      return (
        <div className="col-md-9 body-height">
          <div className="details">
          
          </div>
        </div>
      )
   
  }
}

// const mapStateToProps = ({ videos }) => {
//   const { videosList, selected_video, loading,no_videos } = videos;
//   return { videosList, selected_video, loading,no_videos };
// };
export default connect(null)(RestuarantDetail);