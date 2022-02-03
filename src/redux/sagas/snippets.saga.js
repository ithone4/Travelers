import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';

// 
function* fetchSnippets(action) {
  console.log('Snippets saga test')
  // get all snippets from the DB
  try {
      const snippets = yield axios.get(`/api/info_snippet`);
      console.log('get snippets:', snippets.data);
      yield put({ type: 'SET_SNIPPETS', payload: snippets.data });

  } catch (err) {
      console.log('get snippets error', err);
  }
      
}



function* snippetsSaga() {
  yield takeLatest('FETCH_SNIPPETS', fetchSnippets)
}

export default snippetsSaga;
