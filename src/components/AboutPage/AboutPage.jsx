import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function AboutPage() {

  const dispatch = useDispatch();

  const saveButton = useSelector(store => store.showSaveReducer);
useEffect(() => {
  dispatch({ type: 'SET_SAVE',
            payload: saveToggle
              });
}, []);

const [saveToggle, setSaveButton] = useState(false);

  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  );
}

export default AboutPage;
