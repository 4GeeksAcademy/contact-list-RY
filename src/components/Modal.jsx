import React from "react";

export const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">¿Are you sure?</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>If you delete this thing, the entire universe will go down.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={onConfirm}>Sí, borrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};