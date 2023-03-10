import React from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";

import { useSelector, useDispatch } from "react-redux";
import { cardModalActions } from "../store";

const CardInside = () => {
  const onOpen = useSelector((state) => state.cardModal.currentState);
  const ele_name = useSelector((state) => state.cardModal.elementName);
  const ele_link = useSelector((state) => state.cardModal.elementLink);

  const dispatch = useDispatch();

  const onToggle = () => {
    dispatch(cardModalActions.stateToggle());
  };

  const setHistory = async (e) => {
    // e.preventDefault();
    const res = await fetch(`/addHistory`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: ele_name,
        link: ele_link,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error!!!");
    }
  };

  if(onOpen)
  {
    setHistory();
  }
  // useEffect(() => {
  

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
        <Box height={"90vh"} width={"95vw"} backgroundColor="white">
          <iframe
            width="100%"
            height="100%"
            src={ele_link}
            title={ele_name}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Box>
        <Box borderRadius="50%" onClick={onToggle}>
          <CancelIcon fontSize="large" color="error"></CancelIcon>
        </Box>
      </Box>
    </Modal>
  );
};

export default CardInside;
