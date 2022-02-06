import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name QuestionItem with the name for the new component.
function QuestionItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  return (
    <div>
      <h2>{props.questionR.question_text}</h2>
    </div>
  );
}

export default QuestionItem;
