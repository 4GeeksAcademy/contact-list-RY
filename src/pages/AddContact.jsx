import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", address: ""
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contact = store.contacts.find(c => c.id == id);
            if (contact) setFormData(contact);
        }
    }, [id, store.contacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseURL = "https://playground.4geeks.com/contact/agendas/ruben/contacts";
        const url = id ? `${baseURL}/${id}` : baseURL;
        const method = id ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) navigate("/");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{id ? "Edit Contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="Full Name"
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" placeholder="Phone"
                        value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" placeholder="Address"
                        value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
            <Link to="/" className="mt-3 d-block">or get back to contacts</Link>
        </div>
    );
};