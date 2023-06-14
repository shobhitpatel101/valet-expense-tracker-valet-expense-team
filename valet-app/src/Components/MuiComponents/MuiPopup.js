import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { muiPopupStyle } from "../../Styles/MUI/Mui";
import "../../Styles/MUI/MuiPopup.scss";
function MuiPopup({ children, open, handleClose }) {
  return (
    // <p>Omkar</p>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={muiPopupStyle}>
        <div className="mui-popup-container">{children}</div>
      </Box>
    </Modal>
  );
}

export default MuiPopup;
