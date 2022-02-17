import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './InfoPage.css';
import Utility from '../../utility';

function InfoPage() {

  const dispatch = useDispatch();

  const saveButton = useSelector(store => store.showSaveReducer);
useEffect(() => {
  dispatch({ type: 'SET_SAVE',
            payload: saveToggle
              });
}, []);

const [saveToggle, setSaveButton] = useState(false);

  return (
    <div>
      <p>I'm the info page!</p>
    </div >
  );
}

export default InfoPage;
