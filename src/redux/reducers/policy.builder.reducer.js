import { combineReducers } from 'redux';

const policyBuilderReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUILDER':
      return action.payload;
    default:
      return state;
  }
  return state;
}

const companyCultureReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_COMPANY_CULTURE':
      console.log(`in companyCultureReducer and the action.payload is:`, action.payload);
      return action.payload;
    case 'UNSET_COMPANY_CULTURE':
      return 0;
    default:
      return state;
  }
};
// user will be on the redux state at:
// state.user
//export default policyBuilderReducer;

export default combineReducers({
  policyBuilderReducer,
  companyCultureReducer,
});
