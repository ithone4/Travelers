import { ConstructionOutlined } from "@mui/icons-material";

export default class Utility {

    //Take answers from table and format them to be shown as radio buttons
    static formatAnswersForBuilder = (answer) => {
        let formattedAnswersArray = [];
        //loop through the column names
        for (const [key, value] of Object.entries(answer)) {
            if (key === 'answer_1' || key === 'answer_2' || key === 'answer_3' ||
                key === 'answer_4' || key === 'answer_5' || key === 'answer_6') {
                let formattedAnswer = {};
                formattedAnswer.answerID = answer.id;
                formattedAnswer.questionID = answer.question_id;
                formattedAnswer.answerText = value;
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
        //add ability to skip this question
        // let skipAnswer = {
        //     answerID
        //     answerName = 'answer_6',
        //     answerValue = '0',


        // }

        return formattedAnswersArray;
    }
    static savePolicyAnswersToDatabase = (policy) => {

        console.log(`in formatPolicyAnswersForDatabase with policy:`, policy);

        let formattedPolicy = this.formatPolicyAnswersForDatabase(policy);
    }

    static formatPolicyAnswersForDatabase = (policy) => {
        let policyArray = {
            id: '',
            userId: '',
            answers: [{}]
        };
        console.log(`in formatPolicyAnswersForDatabase with policy:`, policy);
        console.log(`policy is an:`, typeof policy);

        policyArray.id = policy.id;
        policyArray.userId = policy.user_id;
        console.log(`policyArray before adding question answers is:`, policyArray);
        //Convert policy object in an array of it's keys
        const keys = Object.keys(policy);
        // iterate over object
        keys.forEach((key, index) => {
            //console.log(`${key}: ${policy[key]}`);
            if (key.substring(0, 9) === 'question_' && policy[key] != null) {
                //console.log(`found question answer: ${key}`)
                policyArray.answers.push({
                    question: key,
                    answer: policy[key]
                })
            }
        });
        console.log(`policyArray is now:`, policyArray);


        // setUserPolicyAnswers({ ...userPolicyAnswers, [objectKey]: parseInt(answer) });

        // policyArray.id = policy.id;
        // policyArray.userID = policy.userID;
        // policyArray.answers = [{}];

        // return policyArray;

        //return this format:
        //     type: 'SAVE_TO_BUILDER',
        //     payload: {
        //         id: policyID,
        //         userID: user.id,
        //         answers: [{
        //             question: currentQuestion,
        //             answer: answer
        //         }]
        //     }
        // })

    }

}