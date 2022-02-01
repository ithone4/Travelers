import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const answer = useSelector(store => store.answersReducer);

  return (
    <div className="container">
      <p>Info Page</p>
      <p>{JSON.stringify(answer)}</p>
    </div>
  );
}

export default InfoPage;
