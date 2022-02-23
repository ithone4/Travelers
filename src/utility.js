export default class Utility {

    //Take answers from table and format them to be shown as radio buttons
    static formatAnswersForBuilder = (answer, companyName) => {
        const regex = /<xxx>/i;
        let formattedAnswersArray = [];
        //loop through the column names
        for (const [key, value] of Object.entries(answer)) {
            if (key === 'answer_1' || key === 'answer_2' || key === 'answer_3' ||
                key === 'answer_4' || key === 'answer_5' || key === 'answer_6') {
                let formattedAnswer = {};
                formattedAnswer.answerID = answer.id;
                formattedAnswer.questionID = answer.question_id;
                formattedAnswer.answerText = value.replace(regex, companyName);
                formattedAnswer.questionName = `question_${answer.id}`;

                switch (key) {
                    case 'answer_1':
                        formattedAnswer.answerName = 'answer_1';
                        formattedAnswer.answerValue = '1';
                        break;
                    case 'answer_2':
                        formattedAnswer.answerName = 'answer_2';
                        formattedAnswer.answerValue = '2';
                        break;
                    case 'answer_3':
                        formattedAnswer.answerName = 'answer_3';
                        formattedAnswer.answerValue = '3';
                        break;
                    case 'answer_4':
                        formattedAnswer.answerName = 'answer_4';
                        formattedAnswer.answerValue = '4';
                        break;
                    case 'answer_5':
                        formattedAnswer.answerName = 'answer_5';
                        formattedAnswer.answerValue = '5';
                        break;
                    case 'answer_6':
                        formattedAnswer.answerName = 'answer_6';
                        formattedAnswer.answerValue = '6';
                        break;
                }
                formattedAnswersArray.push(formattedAnswer);
            }
        }
        return formattedAnswersArray;
    }
    static formatPolicyAnswersForDatabase = (policy) => {
        let policyArray = {
            id: '',
            userId: '',
            answers: []
        };
        policyArray.id = policy.id;
        policyArray.userId = policy.userId;
        //Convert policy object in an array of it's keys
        const keys = Object.keys(policy.answers);
        // iterate over object
        keys.forEach((key, index) => {
            // console.log(`${key}: ${policy.answers[key]}`);
            if (key.substring(0, 9) == 'question_' && policy.answers[key] != null) {
                policyArray.answers.push({
                    question: key,
                    answer: policy.answers[key]
                })
            }
        });
        return policyArray;
    }
}