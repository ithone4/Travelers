import { combineReducers } from 'redux';

const policyBuilderReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUILDER':
      return action.payload;
    case 'UNSET_BUILDER':
      return [];
    default:
      return state;
  }
}
const tempPolicyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TEMP_BUILDER':
      return action.payload;
    case 'UNSET_TEMP_BUILDER':
      return {};
    default:
      return state;
  }
}
const companyCultureReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_COMPANY_CULTURE':
      console.log(`in companyCultureReducer and the action.payload is:`, action.payload);
      return action.payload;
    default:
      return state;
  }
};

const currentQuestionID = (state = '', action) => {
  switch (action.type) {
    case 'SET_QUESTION_ID':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  policyBuilderReducer,
  companyCultureReducer,
  tempPolicyReducer
});
