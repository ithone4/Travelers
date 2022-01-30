import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';

// 
function* fetchText(action) {
  console.log('Text saga test')
  // get all text from the DB
  try {
      const missing = yield axios.get(`/api/text`);
      console.log('get track:', text.data);
      yield put({ type: 'SET_TEXT', payload: text.data });

  } catch (err) {
      console.log('get text error', err);
  }
      
}



function* missingSaga() {
  yield takeLatest('FETCH_TEXT', fetchText)
}

export default textSaga;
