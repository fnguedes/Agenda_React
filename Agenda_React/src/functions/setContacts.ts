import type { AppContactProps } from "../App";

export const setDataContacts = (contacts: AppContactProps[]) => {
	try {
		const jsonContacts = JSON.stringify(contacts);

		localStorage.setItem("contacts", jsonContacts);
	} catch (e) {}
};
