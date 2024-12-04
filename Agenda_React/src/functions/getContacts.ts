export const getDataContacts = async () => {
	try {
		const contacts = localStorage.getItem("contacts");

		return contacts != null ? JSON.parse(contacts) : [];
	} catch (e) {}
};
