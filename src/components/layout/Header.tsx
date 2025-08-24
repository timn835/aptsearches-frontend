import { useLang } from "@/components/context/lang-provider";
import { Button } from "@/components/ui/button";
import { SearchIcon, SendIcon } from "lucide-react";

export function Header() {
	const { lang, setLang } = useLang();
	return (
		<header className="border-b">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
				<div className="text-lg font-bold">APTSearches</div>
				<nav className="hidden space-x-6 md:flex">
					<a href="#search">
						<Button variant="outline" className="w-32">
							<SearchIcon />
							Search
						</Button>
					</a>
					<a href="#suggest">
						<Button variant="outline" className="w-32">
							<SendIcon />
							Suggest
						</Button>
					</a>
				</nav>
				<div className="flex space-x-2">
					{(["en", "fr"] as const).map((option) => (
						<Button
							key={option}
							variant={lang === option ? "default" : "outline"}
							size="sm"
							onClick={() => setLang(option)}
							className="rounded-md px-4 py-1">
							{option}
						</Button>
					))}
				</div>
			</div>
		</header>
	);
}
