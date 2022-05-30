import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import swal from "sweetalert";

const Answers = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Number", width: 90 },
    {
      field: "question",
      headerName: "Question",
      width: 600,
    },
    {
      field: "answer",
      headerName: "Answer",
      width: 200,
    },
  ];

  const confirmHandler = () => {
    swal("Confirmed!", "Message!", "success").then(function () {
      navigate("/", { replace: true });
    });
  };

  return (
    <>
      {state && (
        <div
          style={{
            height: 550,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "80%",
              margin: "2rem",
            }}
          >
            <DataGrid
              rows={state}
              columns={columns}
              pageSize={state.length < 6 ? state.length : 6}
              rowsPerPageOptions={[state.length]}
              checkboxSelection
            />
          </div>
          <Button onClick={confirmHandler}>Confirm</Button>
        </div>
      )}
    </>
  );
};

export default Answers;
