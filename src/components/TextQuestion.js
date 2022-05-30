import React from "react";
import { FormControl, FormLabel, TextField } from "@mui/material";

const TextQuestion = ({
  currentQuestionNumber,
  currentQuestion,
  answerObj,
  save,
}) => {
  const handleChange = (event) => {
    const newText = event.target.value;
    save("text", currentQuestionNumber, currentQuestion.headline, newText);
  };

  return (
    <div>
      {currentQuestion && (
        <>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              {currentQuestionNumber}. {currentQuestion.headline}
            </FormLabel>
            {currentQuestion.multiline === "true" ? (
              <TextField
                id="outlined-basic"
                label="Answer"
                variant="outlined"
                multiline
                value={answerObj ? answerObj.data : ""}
                onChange={(e) => handleChange(e)}
              />
            ) : (
              <TextField
                id="outlined-multiline-flexible"
                label="Answer"
                value={answerObj ? answerObj.data : ""}
                onChange={(e) => handleChange(e)}
              />
            )}
          </FormControl>
        </>
      )}
    </div>
  );
};

export default TextQuestion;
