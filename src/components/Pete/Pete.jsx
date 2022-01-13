import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Pete with the name for the new component.
function Pete(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>{heading}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aperiam dolor animi quas. Veritatis, quas quos, natus dolores et eligendi placeat odio corporis aliquid cumque reprehenderit voluptatem suscipit deleniti voluptatum!
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, esse libero dicta, impedit reprehenderit quam, ab nobis consequatur fugit error animi repudiandae quas voluptatem pariatur iusto harum dignissimos ipsam ducimus!
      </p>
    </div>
  );
}

export default Pete;
