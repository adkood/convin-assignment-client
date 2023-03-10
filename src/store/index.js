import { configureStore, createSlice } from "@reduxjs/toolkit";

const bucketModalState = {
  currentState: false,
  elementName: "",
  elementId: "",
  elementNameNew: "",
};

const bucketModalSlice = createSlice({
  name: "bucketModal",
  initialState: bucketModalState,
  reducers: {
    stateToggle(state) {
      state.currentState = !state.currentState;
    },
    newName(state, action) {
      state.elementName = action.payload;
    },
    newNameNew(state, action) {
      state.elementNameNew = action.payload;
    },
    newId(state, action) {
      state.elementId = action.payload;
    },
  },
});

const cardModalState = {
  currentState: false,
  elementName: "",
  elementLink: "",
};

const cardModalSlice = createSlice({
  name: "cardModal",
  initialState: cardModalState,
  reducers: {
    stateToggle(state) {
      state.currentState = !state.currentState;
    },
    newName(state, action) {
      state.elementName = action.payload;
    },
    newLink(state, action) {
      state.elementLink = action.payload;
    },
  },
});

const moveModalState = {
  currentState: false,
  elementId: "",
};

const moveModalSlice = createSlice({
  name: "moveModal",
  initialState: moveModalState,
  reducers: {
    stateToggle(state) {
      state.currentState = !state.currentState;
    },
    newId(state, action) {
      state.elementId = action.payload;
    },
  },
});

const multipleDeleteState = {
  arr: [],
};

const multipleDeleteSlice = createSlice({
  name: "multipleDelete",
  initialState: multipleDeleteState,
  reducers: {
    addElement(state, action) {
      state.arr.push(action.payload);
    },
    baseState(state, action) {
      state.arr = action.payload;
    },
  },
});

export const moveModalActions = moveModalSlice.actions;
export const multipleDeleteActions = multipleDeleteSlice.actions;
export const cardModalActions = cardModalSlice.actions;
export const bucketModalActions = bucketModalSlice.actions;

const store = configureStore({
  reducer: {
    bucketModal: bucketModalSlice.reducer,
    cardModal: cardModalSlice.reducer,
    multipleDelete: multipleDeleteSlice.reducer,
    moveModal: moveModalSlice.reducer,
  },
});

export default store;
