import React from 'react';
import {  FadeLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
    return (
        <div className='sweet-loading'>
            <FadeLoader
                color={'#ccc'}
                loading={loading}
            />
        </div>
    )
}
export { Spinner };