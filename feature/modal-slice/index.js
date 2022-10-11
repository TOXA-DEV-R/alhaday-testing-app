/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: false,
  isOpenSuccessModal: false,
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
    openSuccessModal(state) {
      state.isOpenSuccessModal = true;
    },
  },
});

export const { closeModal, openModal, openSuccessModal } = modalSlice.actions;

export default modalSlice.reducer;
