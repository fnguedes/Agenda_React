import Logo from "../assets/Logo.png";
import type { ChangeEvent } from "react";

interface HeaderProps {
	filter: string;
	onFilter: (value: string) => void;
}

export function Header({ filter, onFilter }: HeaderProps) {
	function handleFilter(event: ChangeEvent<HTMLTextAreaElement>) {
		onFilter(event.target.value);
	}

	return (
		<header className="flex flex-row bg-[#01102F] h-20 justify-center items-center py-5">
			<div className="flex flex-row h-full items-center">
				<img src={Logo} alt="Logo" className="w-10" />
				<h1 className="text-white text-lg font-bold ml-2">Agenda</h1>
			</div>

			<div className="absolute flex flex-row right-14 top-6 items-center justify-center">
				<textarea
					className="h-8 resize-none w-60 rounded-lg pt-2 pl-2 text-sm border-none outline-none font-semibold text-[#01102F]"
					placeholder="Pesquise seu contato aqui"
					onChange={handleFilter}
					value={filter}
				/>
			</div>
		</header>
	);
}
