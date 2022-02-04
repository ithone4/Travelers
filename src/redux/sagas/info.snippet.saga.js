import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';

// 
function* fetchSnippet(action) {
  console.log('Snippet saga test')
  // get all snippets from the DB
  try {
    const snippets = yield axios.get(`/api/info-snippet`);
    console.log('get snippets:', snippets.data);
    yield put({ type: 'SET_SNIPPETS', payload: snippets.data });

  } catch (err) {
    console.log('get snippet error', err);
  }

}



function* infoSnippetSaga() {
  yield takeLatest('FETCH_SNIPPETS', fetchSnippet)
}

export default infoSnippetSaga;
