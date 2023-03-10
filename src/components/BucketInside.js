import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import Card from "./Card";
import CreateIcon from "@mui/icons-material/Create";

import { useSelector, useDispatch } from "react-redux";
import { bucketModalActions } from "../store";

import CancelIcon from "@mui/icons-material/Cancel";
import { NavLink } from "react-router-dom";

const BucketInside = () => {
  const onOpen = useSelector((state) => state.bucketModal.currentState);
  const ele_Name = useSelector((state) => state.bucketModal.elementName);
  const checkedArray = useSelector((state) => state.multipleDelete.arr);

  const dispatch = useDispatch();

  const onToggle = () => {
    dispatch(bucketModalActions.stateToggle());
  };

  const [cardData, setCardData] = useState([]);

  const deleteCards = async () => {
    const res2 = await fetch(`/deleteCard`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        idArr: checkedArray,
      }),
    });

    const deleteData = await res2.json();
    if (res2.status === 404 || !deleteData) {
      console.log("error!");
    } else {
      console.log("bucket deleted!");
      //   navigate("/");
    }
  };

  const getCards = async (e) => {
    const res = await fetch(`/getCardByBucket/${ele_Name}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 404 || !data) {
      console.log("can not fetch cards");
    } else {
      setCardData(data);
      console.log("cards fetched");
    }
  };

  useEffect(() => {
    getCards();
  }, [cardData, ele_Name]);

  console.log(checkedArray);

  return (
    <Modal open={onOpen}>
      <Box
        height={"100%"}
        width={"100%"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "80%",
            backgroundImage: "url(background2.png)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "10%",
              width: "80%",
              //   borderBottom: "4px solid #67B7D1",
              display: "flex",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "50%",
                // border: "1px solid",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  width: "60%",
                  height: "90%",
                  backgroundColor: "lightblue",
                  borderRadius: "5px",
                  fontSize: "20px",
                }}
              >
                <NavLink style={{ textDecoration: "none" }} to={"/addCard"}>
                  ADD CARD <CreateIcon fontSize="large"></CreateIcon>
                </NavLink>
              </Button>
            </Box>
            <Box
              sx={{
                height: "100%",
                width: "50%",
                // border: "1px solid",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  width: "60%",
                  height: "90%",
                  backgroundColor: "#e4717a",
                  borderRadius: "5px",
                  fontSize: "20px",
                  color: "red",
                }}
                onClick={() => deleteCards()}
              >
                DELETE CARD <CancelIcon fontSize="large" color="error"></CancelIcon>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              height: "80%",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "scroll",
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            {cardData.map((ele, id) => {
              return <Card props={ele}></Card>;
            })}
          </Box>
          <Box borderRadius="50%" onClick={onToggle}>
            <CancelIcon fontSize="large" color="error"></CancelIcon>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BucketInside;
