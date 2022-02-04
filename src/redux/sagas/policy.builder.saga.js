import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';



function* fetchBuilder(action) {

  console.log('Builder saga test:', action.payload)
  // get all builder from the DB
  try {

    const builder = yield axios.get(`/api/policy-builder/${action.payload}`);
    console.log('get builder:', builder.data);
    yield put({ type: 'SET_BUILDER', payload: builder.data });

  } catch (err) {
    console.log('get builder error', err);
  }

}

function* saveToBuilder(action) {
  console.log(`in saveToBuilder!`);
  console.log(`payload is:`, action.payload);
  const response = yield axios.post(`/api/policy-builder/`, action.payload);

}

function* policyBuilderSaga() {
  yield takeLatest(`FETCH_BUILDER`, fetchBuilder)
  yield takeLatest(`SAVE_TO_BUILDER`, saveToBuilder);
}

export default policyBuilderSaga;
