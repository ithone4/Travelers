import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';

// 
function* fetchGroup(action) {
  console.log('Group saga test')
  // get all Groups from the DB
  try {
    const response = yield axios.get(`/api/group`);
    console.log('get group:', response.data);
    yield put({ type: 'SET_GROUP', payload: response.data });

  } catch (err) {
    console.log('get Group error', err);
  }

}



function* groupSaga() {
  yield takeLatest('FETCH_GROUP', fetchGroup)
}

export default groupSaga;
