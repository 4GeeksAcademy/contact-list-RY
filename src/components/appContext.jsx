import React, { useState, useEffect } from "react";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
	const StoreWrapper = (props) => {
		const [state, setState] = useState({
			store: {
				contacts: [],
			},
			actions: {
				// 1. Obtener contactos (READ)
				getContacts: async () => {
					try {
						const response = await fetch("https://playground.4geeks.com/contact/agendas/agenda_de_prueba/contacts");
						if (!response.ok) {
                            // Si la agenda no existe, la creamos (opcional, pero útil para la primera vez)
                            if(response.status === 404) createAgenda(); 
                            return;
                        }
						const data = await response.json();
						setState((prev) => ({ ...prev, store: { contacts: data.contacts } }));
					} catch (error) {
						console.error("Error loading contacts:", error);
					}
				},

                // Función auxiliar para crear la agenda si no existe
                createAgenda: async () => {
                    await fetch("https://playground.4geeks.com/contact/agendas/agenda_de_prueba", { method: "POST" });
                    // actions.getContacts(); // Re-intentar obtener contactos
                },

				// 2. Crear contacto (CREATE)
				addContact: async (contact) => {
					try {
						const response = await fetch("https://playground.4geeks.com/contact/agendas/agenda_de_prueba/contacts", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(contact),
						});
						if (response.ok) {
                            // Recargamos la lista después de agregar
							actions.getContacts(); 
                            return true;
                        }
					} catch (error) {
						console.error("Error adding contact:", error);
					}
				},

				// 3. Eliminar contacto (DELETE)
				deleteContact: async (id) => {
					try {
						const response = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_de_prueba/contacts/${id}`, {
							method: "DELETE",
						});
						if (response.ok) {
                            // Actualizamos el store filtrando el contacto eliminado (más rápido que hacer fetch de nuevo)
                             const updatedContacts = state.store.contacts.filter(contact => contact.id !== id);
                             setState(prev => ({...prev, store: { contacts: updatedContacts }}));
                        }
					} catch (error) {
						console.error("Error deleting contact:", error);
					}
				},

				// 4. Actualizar contacto (UPDATE)
				updateContact: async (id, contact) => {
					try {
						const response = await fetch(`https://playground.4geeks.com/contact/agendas/agenda_de_prueba/contacts/${id}`, {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(contact),
						});
						if (response.ok) actions.getContacts();
					} catch (error) {
						console.error("Error updating contact:", error);
					}
				},
			},
		});

        // Ejecutar getContacts al cargar la app
		useEffect(() => {
			state.actions.getContacts();
		}, []); // eslint-disable-line

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;