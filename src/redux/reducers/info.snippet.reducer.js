const infoSnippetReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return action.payload;
    default:
      return state;
  }
  return state;
}


// user will be on the redux state at:
// state.user
export default infoSnippetReducer;
