import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { AppContactProps } from "../App";

interface newContactProps {
	createContact: (contact: AppContactProps) => void;
}

export function Register({ createContact }: newContactProps) {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newEmail, setNewEmail] = useState("");

	function handleNewName(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setNewName(event.target.value);
	}

	function handleNewNumber(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setNewNumber(event.target.value);
	}

	function handleNewEmail(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setNewEmail(event.target.value);
	}

	function handleNewContact(event: FormEvent) {
		event.preventDefault();

		let valor = newNumber.replace(/\D/g, ""); // Remove tudo que não for dígito
		valor = valor.replace(/^(\d{2})(\d)/, "($1) $2"); // Formata o DDD
		valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
		const newContact = {
			name: newName,
			email: newEmail,
			phone: valor,
		};

		createContact(newContact);
		setNewEmail("");
		setNewName("");
		setNewNumber("");
	}

	return (
		<form
			className="p-4 w-96 bg-[#01102F] mt-8 items-center justify-center rounded-2xl"
			onSubmit={handleNewContact}
		>
			<h3 className="text-lg text-[#F5F7FA] text-center ">Adicionar Contato</h3>
			<h4 className="text-sm pt-3 text-[#F5F7FA] text-start">Nome:</h4>
			<textarea
				placeholder="Informe o nome"
				value={newName}
				onChange={handleNewName}
				className="flex w-full rounded-lg align-bottom p-2 mt-2 h-10 outline-none border-none focus:outline-[#0369A1] text-[#01102F] font-semibold resize-none"
				rows={1}
				required
			/>

			<h4 className="text-sm pt-3 text-[#F5F7FA]">Número:</h4>
			<textarea
				placeholder="(99) 9 9999-9999"
				title="Formato (99) 9 9999-9999"
				maxLength={11}
				inputMode="tel"
				value={newNumber}
				onChange={handleNewNumber}
				className="flex w-full rounded-lg align-bottom p-2 mt-2 h-10 outline-none border-none focus:outline-[#0369A1] text-[#01102F] font-semibold resize-none"
				rows={1}
				required
			/>

			<h4 className="text-sm pt-3 text-[#F5F7FA]">E-mail:</h4>
			<textarea
				placeholder="Informe o e-mail"
				value={newEmail}
				onChange={handleNewEmail}
				className="flex w-full rounded-lg align-bottom p-2 mt-2 h-10 outline-none border-none focus:outline-[#0369A1] text-[#01102F] font-semibold resize-none"
				rows={1}
				required
			/>

			<footer className="justify-center items-center flex flex-col mt-4 h-9">
				<button
					type="submit"
					className="flex-1 w-32 h-full bg-[#02366D] text-[#F5F7FA] rounded-lg 
               hover:bg-[#0369A1] duration-500"
				>
					Salvar
				</button>
			</footer>
		</form>
	);
}
