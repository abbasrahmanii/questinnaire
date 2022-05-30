import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";

const MultipleQuestion = ({
  currentQuestionNumber,
  currentQuestion,
  answerObj,
  save,
}) => {
  console.log("answerObj", answerObj);

  const radioHandler = (data) => {
    save(
      "radio",
      currentQuestionNumber,
      currentQuestion.headline,
      data.target.value
    );
  };

  const [checkedState, setCheckedState] = useState(
    new Array(currentQuestion.choices.length).fill(null)
  );
  console.log(checkedState);

  useEffect(() => {
    if (answerObj) {
      console.log(answerObj.data);
      setCheckedState(answerObj.data);
      console.log(
        new Array(currentQuestion.choices.length).map((item, index) =>
          item !== null ? answerObj.data[index] : null
        )
      );
    }
    setCheckedState(new Array(currentQuestion.choices.length).fill(null));
  }, [currentQuestion]);

  // console.log(currentQuestionNumber, checkedState);

  const handleOnChange = (e, position) => {
    const data = e.target.value;
    let updatedCheckedState = checkedState;
    if (checkedState[position]) {
      updatedCheckedState[position] = null;
    } else {
      updatedCheckedState[position] = data;
    }

    setCheckedState(updatedCheckedState);

    save(
      "checkbox",
      currentQuestionNumber,
      currentQuestion.headline,
      updatedCheckedState
    );
  };

  return (
    <div>
      {currentQuestion && (
        <>
          <div>
            <>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  {currentQuestionNumber}. {currentQuestion.headline}
                </FormLabel>
                {currentQuestion.multiple === "false" ? (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                    onChange={radioHandler}
                    value={answerObj ? answerObj.data : ""}
                  >
                    {currentQuestion.choices.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item.value + currentQuestionNumber}
                        control={<Radio />}
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
                            name={item.value + currentQuestionNumber}
                            value={item.value + currentQuestionNumber}
                            checked={answerObj && answerObj.data[index]}
                            onChange={(e) => handleOnChange(e, index)}
                          />
                        }
                        label={item.value}
                      />
                    ))}
                  </FormGroup>
                  // <FormGroup>
                  //   {currentQuestion.choices.map((item, index) => {
                  //     return (
                  //       <div key={index} className="toppings-list-item">
                  //         <div className="left-section">
                  //           <input
                  //             className="option"
                  //             type="checkbox"
                  //             id={index}
                  //             value={item.value + currentQuestionNumber}
                  //             checked={answerObj?.data[index]}
                  //             onChange={(e) => handleOnChange(e, index)}
                  //           />
                  //           <label>{item.value}</label>
                  //         </div>
                  //       </div>
                  //     );
                  //   })}
                  // </FormGroup>
                )}
              </FormControl>
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default MultipleQuestion;
