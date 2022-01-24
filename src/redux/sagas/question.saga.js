import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../store';

// 
function* fetchQuestions(action) {
  console.log('Questions saga test')
  // get all questions from the DB
  try {
      const missing = yield axios.get(`/api/questions`);
      console.log('get track:', questions.data);
      yield put({ type: 'SET_QUESTIONS', payload: questions.data });

  } catch (err) {
      console.log('get questions error', err);
  }
      
}



function* missingSaga() {
  yield takeLatest('FETCH_QUESTIONS', fetchQuestions)
}

export default questionsSaga;
