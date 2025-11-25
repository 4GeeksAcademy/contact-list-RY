import React, { useEffect } from "react"; 
import useGlobalReducer from "../hooks/useGlobalReducer"; // 1. Importamos el hook mágico
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
    // 2. Usamos el hook. Nos devuelve el almacén (store) y la función de envío (dispatch)
    const { store, dispatch } = useGlobalReducer();

    // 3. Definimos la función para traer datos AQUÍ MISMO
    const loadContacts = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/agenda_de_prueba/contacts");
            if(response.status === 404){
                 // Lógica para crear agenda si falla...
                 return;
            }
            const data = await response.json();
            
            // 4. DESPACHAMOS la orden al store.js
            dispatch({ 
                type: "load_contacts", 
                payload: data.contacts 
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <div className="container">
            {/* 5. Leemos directamente del store */}
            {store.contacts.map((contact) => (
                 <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
    );
};