import { combineReducers } from 'redux';

const policyBuilderReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUILDER':
      console.log(`in policyBuilderReducer and action.payload is:`, action.payload)
      return action.payload;
    default:
      return state;
  }
}
const tempPolicyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TEMP_BUILDER':
      return action.payload;
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

export default combineReducers({
  policyBuilderReducer,
  companyCultureReducer,
  tempPolicyReducer
});
