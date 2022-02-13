import React from 'react';
import './QuestionCount.css';

function QuestionCount(props) {

    return (
        <div>
            <p className="count">
                {props.questionId} of {props.totalQuestionCount}
            </p>
        </div >
    );
}

export default QuestionCount;
