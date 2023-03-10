import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import MoveToElement from "./MoveToElement";
import { Heading } from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { moveModalActions } from "../store";

const MoveTo = () => {
  const onOpen = useSelector((state) => state.moveModal.currentState);
  const dispatch = useDispatch();

  const [bucketData, setBucketData] = useState([]);

  const getBuckets = async (e) => {
    const res = await fetch("/getBuckets", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      console.log("can not fetch buckets");
    } else {
      setBucketData(data);
      console.log("data fetched");
    }
  };

  useEffect(() => {
    getBuckets();
  }, []);

  const onToggle = () => {
    dispatch(moveModalActions.stateToggle());
  };

  return (
    <Modal open={onOpen}>
      <Box
        height={"100vh"}
        width={"100vw"}
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Box
          height={"70vh"}
          width={"30vw"}
          borderRadius="10px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "scroll",
            backgroundImage: "url(background2.png)",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Heading fontFamily={"heading"} fontWeight="bold" color={"#43A6C6"}>
            Move to...
          </Heading>
          {bucketData.map((ele, id) => {
            return <MoveToElement props={ele}></MoveToElement>;
          })}
        </Box>
        <Box borderRadius="50%" onClick={onToggle}>
          <CancelIcon fontSize="large" color="error"></CancelIcon>
        </Box>
      </Box>
    </Modal>
  );
};

export default MoveTo;
