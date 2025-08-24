import { ListingsTable } from "@/components/application/ListingsTable";
import { useListings } from "@/components/context/listings-provider";
import { SearchForm } from "@/components/forms/SearchForm";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigDownIcon, SendIcon } from "lucide-react";
import { columns } from "@/components/application/ListingsColumns";

export default function App() {
	const { listings } = useListings();
	return (
		<div className="flex min-h-screen flex-col">
			{/* Navbar */}
			<Header />

			<div className="bg-gradient-to-b from-blue-100 to-white">
				<section className="mt-20 flex flex-1 items-center justify-center gap-10">
					<div className="mx-auto max-w-6xl px-4 text-center">
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
							Tired of searching for rentals in Montreal?
						</h1>
						<p className="mt-4 text-lg text-muted-foreground sm:mt-6 sm:text-xl">
							We'll check the relevant websites for you and show
							you the findings!
						</p>
						<div className="mt-4">
							<a href="#search">
								<Button className="text-lg font-semibold">
									<ArrowBigDownIcon /> Try it Out
									<ArrowBigDownIcon />
								</Button>
							</a>
						</div>
					</div>
				</section>
				<section className="mt-10 flex flex-1 items-center justify-center gap-10">
					<SearchForm />
				</section>
				{listings ? (
					<ListingsTable columns={columns} data={listings} />
				) : null}
				<section className="mt-10 pt-10 border-t-2 border-blue-500 flex flex-1 flex-col items-center justify-center gap-10">
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
