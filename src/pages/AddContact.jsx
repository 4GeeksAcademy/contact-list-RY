import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Importamos el hook
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { store } = useGlobalReducer();
    
    const navigate = useNavigate(); 
    const { id } = useParams(); 

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contactToEdit = store.contacts.find(contact => contact.id == id);
            if (contactToEdit) {
                setFormData({
                    name: contactToEdit.name,
                    email: contactToEdit.email,
                    phone: contactToEdit.phone,
                    address: contactToEdit.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const baseURL = "https://playground.4geeks.com/contact/agendas/ruben/contacts";
            const url = id ? `${baseURL}/${id}` : baseURL;
            const method = id ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate("/");
            } else {
                alert("Error al guardar el contacto");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{id ? "Editar Contacto" : "Agregar Nuevo Contacto"}</h1>
            
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                        type="text" name="name" className="form-control" placeholder="Full Name" 
                        value={formData.name} onChange={handleChange} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" name="email" className="form-control" placeholder="Enter email" 
                        value={formData.email} onChange={handleChange} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input 
                        type="text" name="phone" className="form-control" placeholder="Enter phone" 
                        value={formData.phone} onChange={handleChange} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input 
                        type="text" name="address" className="form-control" placeholder="Enter address" 
                        value={formData.address} onChange={handleChange} required 
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
            
            <Link to="/" className="mt-3 d-block">or get back to contacts</Link>
        </div>
    );
};