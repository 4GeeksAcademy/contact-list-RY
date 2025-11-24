import React, { useState, useEffect, useReducer } from "react";
import storeReducer, { initialStore } from "./store"; 

export const Context = React.createContext(null);

const playersAgenda = (PassedComponent) => {
	const StoreContacts = (props) => {
		const [state, dispatch] = useReducer(storeReducer, initialStore());

		const actions = {
			
			// 1. GET (Leer)
			getContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/ruben/contacts");
					if (response.status === 404) {
						actions.createAgenda(); 
						return;
					}
					const data = await response.json();
					
					dispatch({ type: "load_contacts", payload: data.contacts });
					
				} catch (error) {
					console.error("Error loading contacts:", error);
				}
			},

			createAgenda: async () => {
				try {
					await fetch("https://playground.4geeks.com/contact/agendas/ruben", { method: "POST" });
					actions.getContacts();
				} catch (error) {
					console.error(error);
				}
			},

			// 2. POST (Crear)
			addContact: async (contactData) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/ruben/contacts", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contactData),
					});
					if (response.ok) {
						actions.getContacts(); 
					}
				} catch (error) {
					console.error("Error adding contact:", error);
				}
			},

			// 3. DELETE (Borrar)
			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/ruben/contacts/${id}`, {
						method: "DELETE",
					});
					if (response.ok) {
						dispatch({ type: "delete_contact", payload: id });
					}
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			},

			// 4. PUT (Editar)
			updateContact: async (id, contactData) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/ruben/contacts/${id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contactData),
					});
					if (response.ok) {
						actions.getContacts();
					}
				} catch (error) {
					console.error("Error updating contact:", error);
				}
			}
		};

		useEffect(() => {
			actions.getContacts(); 
		}, []);
		return (
			<Context.Provider value={{ store: state, actions }}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreContacts;
};

export default playersAgenda;