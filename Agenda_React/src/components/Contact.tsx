import { Pencil, Trash, FloppyDisk } from "@phosphor-icons/react";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { EditContactProps } from "../App";

export interface ContactProps {
	name: string;
	email: string;
	phone: string;
	setContact: ({ editContact, keyPhone }: EditContactProps) => void;
	deleteContact: (keyPhone: string) => void;
}

export function Contact({
	name,
	email,
	phone,
	setContact,
	deleteContact,
}: ContactProps) {
	const [currentName, setNewName] = useState(name);
	const [currentPhone, setNewPhone] = useState(phone);
	const [currentEmail, setNewEmail] = useState(email);
	const [editContact, setEditContact] = useState(false);
	const keyPhone = phone;

	function handleNewName(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setNewName(event.target.value);
	}

	function handleNewNumber(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setNewPhone(event.target.value);
	}

	function handleNewEmail(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setNewEmail(event.target.value);
	}

	function handleEditContact() {
		let valor = currentPhone.replace(/\D/g, ""); // Remove tudo que não for dígito
		valor = valor.replace(/^(\d{2})(\d)/, "($1) $2"); // Formata o DDD
		valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

		setNewPhone(valor);
		const newContact = {
			editContact: {
				name: currentName,
				email: currentEmail,
				phone: valor,
			},
			keyPhone,
		};

		setContact(newContact);
		setEditContact(false);
	}

	return (
		<div className="flex flex-row w-[25rem] max-md:w-[24rem] h-[6.5rem] bg-[#02366D] rounded-lg self-start mx-5">
			<div className="w-[75%] h-full pt-2 pl-4 text-[#F5F7FA] justify-evenly ">
				{editContact ? (
					<form>
						<textarea
							className="font-semibold bg-[#F5F7FA] text-[#01102F] border-none outline-none focus:outline-[#0369A1] resize-none h-7 text-lg w-full pl-2 rounded-md"
							disabled={!editContact}
							value={currentName}
							onChange={handleNewName}
						/>
						<textarea
							className="font-semibold bg-[#F5F7FA] text-[#01102F] border-none outline-none focus:outline-[#0369A1] resize-none h-6 text-sm w-full pl-2 rounded-md pt-1"
							disabled={!editContact}
							value={currentPhone}
							onChange={handleNewNumber}
							maxLength={11}
						/>
						<textarea
							className="font-semibold bg-[#F5F7FA] text-[#01102F] border-none outline-none focus:outline-[#0369A1] resize-none h-6 text-sm w-full pl-2 rounded-md pt-1"
							disabled={!editContact}
							value={currentEmail}
							onChange={handleNewEmail}
						/>
					</form>
				) : (
					<>
						<h3 className="font-semibold text-[#F5F7FA] overflow-hidden">
							{currentName}
						</h3>
						<h5 className="font-semibold text-sm text-[#F5F7FA] overflow-hidden my-2">
							{currentPhone}
						</h5>
						<h5 className="font-semibold text-sm text-[#F5F7FA] overflow-hidden">
							{currentEmail}
						</h5>
					</>
				)}
			</div>

			<div className="flex w-[25%] justify-evenly items-start p-2">
				<button
					type="button"
					className={
						editContact
							? "bg-transparent border-none  mt-2 hover:text-[#2FD348] text-[#2FD348]"
							: "bg-transparent border-none  mt-2 hover:text-[#2FD348] text-[#F5F7FA]"
					}
					onClick={() =>
						editContact ? handleEditContact() : setEditContact(!editContact)
					}
				>
					{editContact ? <FloppyDisk size={25} /> : <Pencil size={25} />}
				</button>
				<button
					type="button"
					className="bg-transparent border-none text-[#F5F7FA] mt-2 hover:text-[#D32F2F]"
					onClick={() => deleteContact(keyPhone)}
				>
					<Trash size={25} />
				</button>
			</div>
		</div>
	);
}
