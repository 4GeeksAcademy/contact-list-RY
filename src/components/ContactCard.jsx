import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <img 
                        src="https://picsum.photos/200" 
                        className="img-fluid rounded-circle" 
                        alt="User" 
                        style={{width: "100px", height: "100px", objectFit: "cover"}}
                    />
                </div>
                <div className="col-md-7">
                    <div className="card-body text-start">
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text text-secondary"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
                        <p className="card-text text-secondary"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                        <p className="card-text text-secondary"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-end align-items-start p-3">
                    <Link to={`/edit/${contact.id}`} className="btn btn-link text-dark me-3"><i className="fas fa-pencil-alt"></i></Link>
                    <button onClick={() => onDelete(contact.id)} className="btn btn-link text-danger"><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
    );
};