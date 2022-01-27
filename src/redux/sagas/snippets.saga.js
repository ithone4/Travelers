import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';

// 
function* fetchSnippets(action) {
  console.log('Snippets saga test')
  // get all snippets from the DB
  try {
      const missing = yield axios.get(`/api/snippets`);
      console.log('get track:', snippets.data);
      yield put({ type: 'SET_SNIPPETS', payload: snippets.data });

  } catch (err) {
      console.log('get snippets error', err);
  }
      
}



function* missingSaga() {
  yield takeLatest('FETCH_SNIPPETS', fetchSnippets)
}

export default snippetsSaga;
