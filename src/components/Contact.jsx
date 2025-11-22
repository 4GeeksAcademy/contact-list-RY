import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard";
import { Modal } from "../component/Modal";

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const handleDeleteClick = (id) => {
        setIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        actions.deleteContact(idToDelete);
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>
            
            <ul className="list-group">
                {store.contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} onDelete={handleDeleteClick} />
                ))}
            </ul>

            <Modal show={showModal} onClose={() => setShowModal(false)} onConfirm={confirmDelete} />
        </div>
    );
};