import React from 'react';

const Attribute = ({ title, value }) => (
  <div className="mb-4">
    <div className="font-bold">{title}</div>
    <div>{value}</div>
  </div>
)
 
export default Attribute;