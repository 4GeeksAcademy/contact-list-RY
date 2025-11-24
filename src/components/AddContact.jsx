import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/AppContext";

export const AddContact = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find(c => c.id == id);
            if (currentContact) setContact(currentContact);
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            actions.updateContact(id, contact);
        } else {
            actions.addContact(contact);
        }
        navigate("/"); 
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{id ? "Edit Contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Full Name" value={contact.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" value={contact.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" name="phone" className="form-control" placeholder="Enter phone" value={contact.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" placeholder="Enter address" value={contact.address} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">save</button>
            </form>
            <Link to="/">or get back to contacts</Link>
        </div>
    );
};