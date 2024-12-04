import { useEffect, useState } from "react";

import "./App.css";

import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { Register } from "./components/Register";
import { setDataContacts } from "./functions/setContacts";
import { getDataContacts } from "./functions/getContacts";

export interface AppContactProps {
	name: string;
	email: string;
	phone: string;
}

export interface EditContactProps {
	editContact: AppContactProps;
	keyPhone: string;
}

function App() {
	const [contacts, setContacts] = useState<AppContactProps[]>([]);
	const [filterContacts, setFilterContacts] = useState("");

	function handleNewContact(contact: AppContactProps) {
		const sortContacts = [...contacts, contact].sort((a, b) =>
			a.name.localeCompare(b.name),
		);

		setContacts(sortContacts);
		setDataContacts(sortContacts);
	}

	function handleEditContact({ editContact, keyPhone }: EditContactProps) {
		const newListContacts = contacts.filter(
			(contact: AppContactProps) => keyPhone !== contact.phone,
		);

		const sortContacts = [...newListContacts, editContact].sort((a, b) =>
			a.name.localeCompare(b.name),
		);
		setContacts(sortContacts);
		setDataContacts(sortContacts);
	}

	function handleDeleteContact(keyPhone: string) {
		const confirmed = window.confirm(
			"Você tem certeza que deseja deletar este item?",
		);
		if (confirmed) {
			const newListContacts = contacts.filter(
				(contact: AppContactProps) => keyPhone !== contact.phone,
			);
			setContacts(newListContacts);
		}
	}

	useEffect(() => {
		async function getContacts() {
			const currentContactsList = await getDataContacts();
			setContacts(currentContactsList);
		}
		getContacts();
	}, []);

	return (
		<div>
			<Header onFilter={setFilterContacts} filter={filterContacts} />

			<div className="wrapper max-w-[90rem] mx-auto grid grid-cols-[384px_2fr] gap-12 items-start max-md:grid-cols-1 place-items-center pb-8 px-8">
				<Register createContact={handleNewContact} />
				<main className="flex gap-12 flex-wrap mt-8 items-center max-md:justify-center w-full mx-auto">
					{contacts
						.filter((contact) => contact.name.includes(filterContacts))
						.map((contact) => (
							<Contact
								key={contact.phone}
								name={contact.name}
								email={contact.email}
								phone={contact.phone}
								setContact={handleEditContact}
								deleteContact={handleDeleteContact}
							/>
						))}
				</main>
			</div>
		</div>
	);
}

export default App;
