import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  useEffect(() => {
    dispatch({ type: 'FETCH_BUILDER', payload: user.id });
 
    
  }, [dispatch]);
  

  return (
    <div className="container">
      <p>Info Page</p>
      
    </div>
  );
}

export default InfoPage;
