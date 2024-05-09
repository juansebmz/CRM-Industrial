import React from 'react';
import Appbar from './Appbar';



function products() {
  const titleStyle = {
    textAlign: 'left ', 
    fontSize: '1.8em', 
    fontWeight: 'regular', 
    color: '#000', 
    padding: '20px 0',
    paddingLeft: '73px',
 
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Appbar/>
      <div style={titleStyle}> Productos </div>
    </div>
  );
}

export default products;
