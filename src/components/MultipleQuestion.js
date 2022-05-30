import React, { memo } from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";

const MultipleQuestion = memo(
  ({ currentQuestionNumber, currentQuestion, answerObj, save }) => {
    const radioHandler = (data) => {
      save(
        "radio",
        currentQuestionNumber,
        currentQuestion.headline,
        data.target.value
      );
    };

    const handleOnChange = (e, position) => {
      const data = e.target.value;
      let checkboxState = [];
      if (answerObj && answerObj.answer.length > 0) {
        checkboxState = answerObj.answer;
      }
      if (checkboxState[position]) {
        checkboxState[position] = null;
      } else {
        checkboxState[position] = data;
      }
      save(
        "checkbox",
        currentQuestionNumber,
        currentQuestion.headline,
        checkboxState
      );
    };

    return (
      <div>
        {currentQuestion && (
          <>
            <div>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  {currentQuestionNumber}. {currentQuestion.headline}
                </FormLabel>
                {currentQuestion.multiple === "false" ? (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name={currentQuestionNumber}
                    onChange={radioHandler}
                    value={answerObj ? answerObj.answer : ""}
                  >
                    {currentQuestion.choices.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        control={<Radio color="success" />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                ) : (
                  <FormGroup>
                    {currentQuestion.choices.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            name={item.value}
                            value={item.value}
                            checked={!!answerObj && !!answerObj.answer[index]}
                            onChange={(e) => handleOnChange(e, index)}
                            color="success"
                          />
                        }
                        label={item.value}
                      />
                    ))}
                  </FormGroup>
                )}
              </FormControl>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default MultipleQuestion;
