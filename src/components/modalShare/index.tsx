"use client";
import React from "react";
import cn from "classnames";
import css from "./modal.module.css";
import XmarkIcon from "../../../public/icons/cardComponent/Xmark";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/reducers/modalSlice";
import { RootState } from "@/redux/storeState";

const ModalShare = () => {
  const dispatch = useDispatch();
  const isActiveModal = useSelector((state: RootState) => state.modal.isActive);

  if (!isActiveModal) return null;

  return (
    <div className={cn(css.modal, { [css.active]: isActiveModal })}>
      <div
        className={cn(css.modalBg)}
        onClick={() => dispatch(closeModal())}
      />

      <div className={cn(css.modalChief)}>
        <div className={cn(css.modalChiefWrapper)}>
          <h2>Share this article</h2>
          <div
            className={cn(css.modalChiefWrapperWrapp)}
            onClick={() => dispatch(closeModal())}
          >
            <XmarkIcon />
          </div>
        </div>

        <p>Here will be share options (future)</p>
      </div>
    </div>
  );
};

export default ModalShare;
