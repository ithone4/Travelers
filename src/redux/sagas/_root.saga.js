import { all } from 'redux-saga/effects';
import answersSaga from './answer.saga';
import builderSaga from './builder.saga';
import loginSaga from './login.saga';
import questionsSaga from './question.saga';
import registrationSaga from './registration.saga';
import snippetsSaga from './snippets.saga';
import textSaga from './text.saga';
import userSaga from './user.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    answersSaga(),
    questionsSaga(),
    textSaga(),
    snippetsSaga(),
    builderSaga()
  ]);
}
