import { Heading } from "@chakra-ui/react";
import { Box, Checkbox } from "@mui/material";
import React from "react";

import { useDispatch } from "react-redux";
import { cardModalActions } from "../store";
import { multipleDeleteActions } from "../store";
import { moveModalActions } from "../store";
import { useSelector } from "react-redux";

import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";

const Card = ({ props }) => {
  const dispatch = useDispatch();

  const checkedArray = useSelector((state) => state.multipleDelete.arr);

  const saveElement = ({ name, link }) => {
    dispatch(cardModalActions.newName(name));
    dispatch(cardModalActions.newLink(link));
    dispatch(cardModalActions.stateToggle());
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(multipleDeleteActions.addElement(value));
    } else {
      const newArr = checkedArray.filter((ele) => ele !== value);
      dispatch(multipleDeleteActions.baseState(newArr));
    }
  };

  const onMoveClickHandler = () => {
    dispatch(moveModalActions.newId(props._id));
    dispatch(moveModalActions.stateToggle());
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
        ":hover": { boxShadow: "1px 3px 15px #43A6C6", width: "93%" },
      }}
    >
      <Box
        height={"100%"}
        width="10%"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Checkbox
          value={props._id}
          onChange={handleChange}
          color="primary"
          size="medium"
        ></Checkbox>
      </Box>
      <Box
        height={"100%"}
        width={"80%"}
        onClick={() => saveElement(props)}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading color="#43A6C6" fontFamily={"heading"} fontWeight="bold">
          {props.name}
        </Heading>
      </Box>
      <Box
        height={"100%"}
        width="10%"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => onMoveClickHandler()}
      >
        <DriveFileMoveIcon fontSize="large" color="primary"></DriveFileMoveIcon>
      </Box>
    </Box>
  );
};

export default Card;
