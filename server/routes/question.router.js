const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET questions
router.get('/', (req, res) => {
    const getQuestionsQuery = `SELECT question.id, question_text, answer_1, answer_2, answer_3, answer_4, answer_5,answer_6, group_id, group_name, safety, "cost", sustainability, business_processes, info_snippet.info_snippet_text, policy_text_1,policy_text_2,policy_text_3,policy_text_4,policy_text_5 FROM question
    JOIN "group" ON "group".id = group_id
    JOIN info_snippet ON info_snippet.question_id = question.id
    JOIN answer ON question.id = answer.question_id
    JOIN policy_text ON question.id = policy_text.question_id
    ORDER BY question.id ASC;
    `;
    console.log(`getQuestionsQuery is:`, getQuestionsQuery);
    pool.query(getQuestionsQuery)
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log(`GET questions error is:`, error);
            res.sendStatus(500);
        })
});

module.exports = router;