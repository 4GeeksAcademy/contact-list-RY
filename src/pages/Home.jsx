import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard"; 
import { Modal } from "../components/Modal";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    const loadContacts = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/ruben/contacts");
            if(response.status === 404){
                await fetch("https://playground.4geeks.com/contact/agendas/ruben", { method: "POST" });
                return;
            }
            const data = await response.json();
            dispatch({ type: "load_contacts", payload: data.contacts });
        } catch (error) { console.error(error); }
    };
    loadContacts();
  }, []);

 
  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowModal(true);
  };

  
  const confirmDelete = async () => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/ruben/contacts/${idToDelete}`, {
            method: "DELETE"
        });
        if (response.ok) {
            dispatch({ type: "delete_contact", payload: idToDelete });
            setShowModal(false);
        }
    } catch (error) { console.error(error); }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add" className="btn btn-success">Add new contact</Link>
      </div>
      
      <ul className="list-group">
        {store.contacts.map((contact) => (
            <ContactCard 
                key={contact.id} 
                contact={contact} 
                onDelete={handleDeleteClick} 
            />
        ))}
      </ul>

      <Modal show={showModal} onClose={() => setShowModal(false)} onConfirm={confirmDelete} />
    </div>
  );
};