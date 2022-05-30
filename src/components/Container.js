import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MultipleQuestion from "./MultipleQuestion";
import TextQuestion from "./TextQuestion";
import initialData from "../data.json";
import { Button, Typography } from "@mui/material";
import BoxUi from "./UI/BoxUi";

const Container = memo(() => {
  const [questionnaire, setQuestionnaire] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState([]);

  console.log("answers", answers);

  const prevQuestion = () => {
    setCurrentQuestionNumber((prev) => --prev);
  };

  const nextQuestion = () => {
    setCurrentQuestionNumber((prev) => ++prev);
  };

  const saveHandler = (type, number, question, data) => {
    let newItem;
    if (type === "radio") {
      newItem = {
        id: number,
        question,
        answer: data,
      };
    } else if (type === "text") {
      newItem = { id: number, question, answer: data };
    } else if (type === "checkbox") {
      newItem = {
        id: number,
        question,
        answer: data,
      };
    }
    const answer = answers.findIndex((item) => item.id === number);
    if (answer !== -1) {
      const newAnswers = answers.map((item) =>
        item.id === number ? newItem : item
      );
      setAnswers(newAnswers);
    } else {
      setAnswers((prev) => [...prev, newItem]);
    }
  };

  useEffect(() => {
    setQuestionnaire(initialData.questionnaire);
    setQuestions(initialData.questionnaire.questions);
  }, []);

  return (
    <div>
      <main style={{ padding: "2.5rem" }}>
        {questionnaire && (
          <>
            <Typography variant="h6" component="h6">
              {questionnaire.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              style={{ margin: "1rem 0" }}
            >
              {questionnaire.description}
            </Typography>
            <div>
              <Button
                onClick={prevQuestion}
                disabled={currentQuestionNumber === 1}
              >
                Prev
              </Button>
              <span>{currentQuestionNumber}</span>
              <Button
                onClick={nextQuestion}
                disabled={false || currentQuestionNumber === questions.length}
              >
                Next
              </Button>
            </div>
            <BoxUi>
              {questions[currentQuestionNumber - 1]?.question_type ===
              "multiple-choice" ? (
                <MultipleQuestion
                  currentQuestionNumber={currentQuestionNumber}
                  currentQuestion={questions[currentQuestionNumber - 1]}
                  answerObj={answers.find(
                    (item) => item.id === currentQuestionNumber
                  )}
                  answers={answers}
                  save={saveHandler}
                />
              ) : (
                <TextQuestion
                  currentQuestionNumber={currentQuestionNumber}
                  currentQuestion={questions[currentQuestionNumber - 1]}
                  answerObj={answers.find(
                    (item) => item.id === currentQuestionNumber
                  )}
                  save={saveHandler}
                />
              )}
            </BoxUi>
            {currentQuestionNumber === questions.length && (
              <Button
                component={Link}
                to="/answers"
                state={answers}
                variant="contained"
                color="primary"
              >
                Send
              </Button>
            )}
          </>
        )}
      </main>
    </div>
  );
});

export default Container;
