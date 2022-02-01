import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, [])

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      const newQuestions = questions.filter(question => question.id !== id);
      setQuestions(newQuestions);
    });
  }

  function handleChangeAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {correctIndex} )
    })
    .then(res => res.json())
    .then((updatedQuestion) => {
      const newQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) {
          return updatedQuestion;
        } 
        else {
          return question;
        }
      });
      setQuestions(newQuestions)
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteQuestion}
            onChangeAnswer={handleChangeAnswer} 
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
