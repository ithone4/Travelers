import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';

// 
function* fetchBuilder(action) {
  console.log('Builder saga test')
  // get all builder from the DB
  try {
      const missing = yield axios.get(`/api/builder`);
      console.log('get track:', builder.data);
      yield put({ type: 'SET_BUILDER', payload: builder.data });

  } catch (err) {
      console.log('get builder error', err);
  }
      
}



function* missingSaga() {
  yield takeLatest('FETCH_BUILDER', fetchBuilder)
}

export default builderSaga;
