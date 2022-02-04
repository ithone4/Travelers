import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';

// 
function* fetchText(action) {
  console.log('Text saga test')
  // get all text from the DB
  try {
    const text = yield axios.get(`/api/policy-text`);
    console.log('get policy text:', text.data);
    yield put({ type: 'SET_TEXT', payload: text.data });

  } catch (err) {
    console.log('get text error', err);
  }

}



function* policyTextSaga() {
  yield takeLatest('FETCH_TEXT', fetchText)
}

export default policyTextSaga;
