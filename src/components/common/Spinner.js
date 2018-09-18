import React, { Component } from 'react';
import { BounceLoader, FadeLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
    return (
        <div className='sweet-loading'>
            <FadeLoader
                color={'red'}
                loading={loading}
            />
        </div>
    )
}
export { Spinner };