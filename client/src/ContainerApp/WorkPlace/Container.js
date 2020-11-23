import React from 'react';
import WorkPlaceContainer from './WorkPlaceContainer';


// JSON.parse(localStorage.getItem('userData')).id;


function Container() {

  if (localStorage.getItem('userData')) {
    return (
      <WorkPlaceContainer />
    );
  };
  return;
};

export default Container;
