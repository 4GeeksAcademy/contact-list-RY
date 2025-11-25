import React, { useEffect } from "react"; 
import useGlobalReducer from "../hooks/useGlobalReducer"; // 1. Importamos el hook mágico
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
	const { store, dispatch } = useGlobalReducer();
	const loadContacts = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/ruben/contacts");
			if(response.status === 404){
				 return;
			}
			const data = await response.json();
			
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
			{store.contacts.map((contact) => (
				 <ContactCard key={contact.id} contact={contact} />
			))}
		</div>
	);
};

export default Contact;