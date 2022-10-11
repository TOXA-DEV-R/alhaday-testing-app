/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal(state) {
      state.isOpenModal = false;
    },
    openModal(state) {
      state.isOpenModal = true;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

export default modalSlice.reducer;
