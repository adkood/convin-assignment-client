import { Heading } from "@chakra-ui/react";
import { Box } from "@mui/material";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { moveModalActions } from "../store";
import { bucketModalActions } from "../store";

const MoveToElement = ({ props }) => {
  const dispatch = useDispatch();

  const card_id = useSelector((state) => state.moveModal.elementId);

  const onClickHandler = async () => {
    const res = await fetch(`/updateCard/${card_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        new_bucket: `${props.name}`,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error!!!");
    } else {
      dispatch(moveModalActions.stateToggle());
      dispatch(bucketModalActions.stateToggle());
    }
  };

  return (
    <Box
      sx={{
        margin: "10px",
        height: "70px",
        width: "90%",
        border: "2px solid #67B7D1",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ":hover": { boxShadow: "1px 3px 15px #43A6C6", width: "93%" },
      }}
      onClick={() => onClickHandler()}
    >
      <Heading color="#43A6C6" fontFamily={"heading"} fontWeight="bold">
        {props.name}
      </Heading>
    </Box>
  );
};

export default MoveToElement;
