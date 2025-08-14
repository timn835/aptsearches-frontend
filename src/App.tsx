import { Button } from "@/components/ui/button";
import { useLang } from "@/components/context/lang-provider";
import { ArrowBigDownIcon, SearchIcon, SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WebsiteList } from "@/components/static/WebsiteList";
import { MONTREAL_NEIGHBORHOODS_DATA } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

export default function App() {
	const { lang, setLang } = useLang();

	return (
		<div className="flex min-h-screen flex-col">
			{/* Navbar */}
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
								variant={
									lang === option ? "default" : "outline"
								}
								size="sm"
								onClick={() => setLang(option)}
								className="rounded-md px-4 py-1">
								{option}
							</Button>
						))}
					</div>
				</div>
			</header>

			<div className="bg-gradient-to-b from-blue-100 to-white">
				<section className="mt-20 flex flex-1 items-center justify-center gap-10">
					<div className="mx-auto max-w-6xl px-4 text-center">
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
							Tired of searching for rentals in Montreal?
						</h1>
						<p className="mt-4 text-lg text-muted-foreground sm:mt-6 sm:text-xl">
							We'll monitor all the relevant websites for you and
							show you the findings!
						</p>
						<div className="mt-4">
							<a href="#search">
								<Button className="text-lg font-semibold">
									<ArrowBigDownIcon /> Try it Out
									<ArrowBigDownIcon />
								</Button>
							</a>
						</div>

						<WebsiteList />
					</div>
				</section>
				<section className="mt-10 flex flex-1 items-center justify-center gap-10">
					<div className="w-full space-y-8" id="search">
						<h2 className="text-center font-bold text-3xl mb-8">
							What are you looking for?
						</h2>
						<div className="w-full px-4 lg:px-20 space-y-4 flex flex-col items-center">
							<h3 className="text-xl font-semibold">
								Price Range
							</h3>
							<div className="space-y-2 block lg:w-4/5 lg:flex lg:justify-between">
								<div className="flex gap-2 items-center">
									<Label htmlFor="minPrice" className="w-40">
										Min Price
									</Label>
									<Input type="number" id="minPrice" />
								</div>
								<div className="flex gap-2 items-center">
									<Label htmlFor="maxPrice" className="w-40">
										Max Price
									</Label>
									<Input type="number" id="maxPrice" />
								</div>
							</div>
						</div>
						<div className="w-full px-4 lg:px-20 space-y-4 flex flex-col items-center">
							<h3 className="text-xl font-semibold">Size</h3>
							<div className="space-y-2 flex-wrap lg:w-4/5 lg:flex lg:justify-between">
								<div className="flex gap-2 items-center">
									<Checkbox id="studio" />
									<Label htmlFor="studio" className="w-24">
										Studio
									</Label>
								</div>
								<div className="flex gap-2 items-center">
									<Checkbox id="1-bedroom" />
									<Label htmlFor="1-bedroom" className="w-24">
										1 Bedroom
									</Label>
								</div>
								<div className="flex gap-2 items-center">
									<Checkbox id="2-bedroom" />
									<Label htmlFor="2-bedroom" className="w-24">
										2 Bedrooms
									</Label>
								</div>
								<div className="flex gap-2 items-center">
									<Checkbox id="3-bedroom" />
									<Label htmlFor="3-bedroom" className="w-24">
										3 Bedrooms
									</Label>
								</div>
								<div className="flex gap-2 items-center">
									<Checkbox id="4-bedroom" />
									<Label htmlFor="4-bedroom" className="w-24">
										4 Bedrooms
									</Label>
								</div>
								<div className="flex gap-2 items-center">
									<Checkbox id="5+-bedroom" />
									<Label
										htmlFor="5+-bedroom"
										className="w-24">
										5+ Bedrooms
									</Label>
								</div>
							</div>
						</div>
						<div className="w-full px-4 lg:px-20 space-y-4 flex flex-col items-center">
							<h3 className="text-xl font-semibold">
								Neighborhood
							</h3>
							<Combobox
								data={MONTREAL_NEIGHBORHOODS_DATA.features.map(
									({ properties }) => properties.NOM_OFFICIEL
								)}
								placeholder="neighborhood"
							/>
						</div>
						<div className="w-full px-4 lg:px-20 space-y-4 flex flex-col items-center">
							<Button>SEARCH</Button>
						</div>
					</div>
				</section>
				<section className="mt-10 flex flex-1 flex-col items-center justify-center gap-10">
					<h2 className="text-center font-bold text-3xl">
						Are we missing a website?
					</h2>
					<p>Suggest a site to add to our searches.</p>
					<div
						id="suggest"
						className="flex items-center justify-center gap-2">
						<Input placeholder="Enter name or url" />
						<Button>
							<SendIcon />
						</Button>
					</div>
				</section>
			</div>

			{/* Footer */}
			<footer className="mt-10 border-t py-6 text-center text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} APTSearches. All rights
				reserved.
			</footer>
		</div>
	);
}
