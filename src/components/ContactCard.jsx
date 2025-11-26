import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img 
            src="https://img.a.transfermarkt.technology/portrait/big/28003-1740766555.jpg?lm=1" 
            alt="Avatar" 
            className="rounded-circle me-3" 
            style={{ width: "80px", height: "80px", objectFit: "cover" }} 
        />
        <div className="d-flex flex-column align-items-start">
            <h5 className="mb-1">{contact.name}</h5>
            <p className="mb-0 text-muted small"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
            <p className="mb-0 text-muted small"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
            <p className="mb-0 text-muted small"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
        </div>
      </div>
      
      <div className="d-flex">
        <Link to={`/edit/${contact.id}`} className="btn btn-link text-dark">
            <i className="fas fa-pencil-alt"></i>
        </Link>
        
        <button className="btn btn-link text-danger" onClick={() => onDelete(contact.id)}>
            <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  );
};