import { useListings } from "@/components/context/listings-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MONTREAL_NEIGHBORHOODS_DATA } from "@/lib/utils";
import { BellIcon, LoaderCircleIcon } from "lucide-react";
import { useRef, useState } from "react";

export function SearchForm() {
	console.log("api url is:", import.meta.env.VITE_API_URL);
	const [error, setError] = useState<string>("");
	const [bedrooms, setBedrooms] = useState<number | undefined>();
	const [neighborhood, setNeighborhood] = useState<string>("");
	const searchFormRef = useRef<{
		minPrice?: number;
		maxPrice?: number;
	}>({});

	const { listings, setListings, isLoading, setIsLoading } = useListings();

	const fetchListings = async () => {
		if (isLoading) return;
		if (error) setError("");
		setIsLoading(true);
		try {
			const { minPrice, maxPrice } = searchFormRef.current;
			const searchParams: string = [
				minPrice !== undefined ? `minPrice=${minPrice}` : "",
				maxPrice !== undefined ? `maxPrice=${maxPrice}` : "",
				bedrooms !== undefined ? `bedrooms=${bedrooms}` : "",
			]
				.filter((searchParam) => searchParam)
				.join("&");

			const result = await fetch(
				`${import.meta.env.VITE_API_URL}/listings${
					searchParams.length ? `?${searchParams}` : ""
				}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (!result.ok) throw Error("Unable to fetch listings");
			const data = await result.json();
			setListings(data.listings);
		} catch (error) {
			setError(
				"Something went wrong, we were unable to fetch the listings"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full space-y-8" id="search">
			<h2 className="text-center font-bold text-3xl mb-8">
				What are you looking for?
			</h2>
			<div className="w-full px-4 lg:px-20 space-y-4 flex flex-col items-center">
				<h3 className="text-xl font-semibold">Price Range</h3>
				<div className="space-y-2 block lg:w-4/5 lg:flex lg:justify-between">
					<div className="flex gap-2 items-center">
						<Label htmlFor="minPrice" className="w-40">
							Min Price
						</Label>
						<Input
							type="number"
							id="minPrice"
							onChange={(value) => {
								if (!value.currentTarget.value) {
									searchFormRef.current.minPrice = undefined;
									return;
								}
								searchFormRef.current.minPrice = parseFloat(
									value.currentTarget.value
								);
							}}
						/>
					</div>
					<div className="flex gap-2 items-center">
						<Label htmlFor="maxPrice" className="w-40">
							Max Price
						</Label>
						<Input
							type="number"
							id="maxPrice"
							onChange={(value) => {
								if (!value.currentTarget.value) {
									searchFormRef.current.maxPrice = undefined;
									return;
								}
								searchFormRef.current.maxPrice = parseFloat(
									value.currentTarget.value
								);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="w-full px-4 lg:px-20 space-y-4 flex flex-col items-center">
				<h3 className="text-xl font-semibold">
					Size (0 bedrooms = studio)
				</h3>
				<div className="space-y-2 flex-wrap lg:w-4/5 lg:flex lg:justify-between">
					<div className="flex gap-2 items-center">
						<Checkbox
							id="0+bedrooms"
							checked={bedrooms === 0}
							onCheckedChange={(checked) => {
								if (checked) setBedrooms(0);
								else setBedrooms(undefined);
							}}
						/>
						<Label htmlFor="0+bedrooms" className="w-24">
							0+ bedrooms
						</Label>
					</div>
					<div className="flex gap-2 items-center">
						<Checkbox
							id="1+bedrooms"
							checked={bedrooms === 1}
							onCheckedChange={(checked) => {
								if (checked) setBedrooms(1);
								else setBedrooms(undefined);
							}}
						/>
						<Label htmlFor="1+bedrooms" className="w-24">
							1+ bedrooms
						</Label>
					</div>
					<div className="flex gap-2 items-center">
						<Checkbox
							id="2+bedrooms"
							checked={bedrooms === 2}
							onCheckedChange={(checked) => {
								if (checked) setBedrooms(2);
								else setBedrooms(undefined);
							}}
						/>
						<Label htmlFor="2+bedrooms" className="w-24">
							2+ bedrooms
						</Label>
					</div>
					<div className="flex gap-2 items-center">
						<Checkbox
							id="3+bedrooms"
							checked={bedrooms === 3}
							onCheckedChange={(checked) => {
								if (checked) setBedrooms(3);
								else setBedrooms(undefined);
							}}
						/>
						<Label htmlFor="3+bedrooms" className="w-24">
							3+ bedrooms
						</Label>
					</div>
					<div className="flex gap-2 items-center">
						<Checkbox
							id="4+bedrooms"
							checked={bedrooms === 4}
							onCheckedChange={(checked) => {
								if (checked) setBedrooms(4);
								else setBedrooms(undefined);
							}}
						/>
						<Label htmlFor="4+bedrooms" className="w-24">
							4+ bedrooms
						</Label>
					</div>
					<div className="flex gap-2 items-center">
						<Checkbox
							id="5+-bedrooms"
							checked={bedrooms === 5}
							onCheckedChange={(checked) => {
								if (checked) setBedrooms(5);
								else setBedrooms(undefined);
							}}
						/>
						<Label htmlFor="5+-bedrooms" className="w-24">
							5+ bedrooms
						</Label>
					</div>
				</div>
			</div>
			<div className="w-full px-4 lg:px-20 space-y-4 flex flex-col items-center">
				<h3 className="text-xl font-semibold">Neighborhood</h3>
				<Combobox
					data={MONTREAL_NEIGHBORHOODS_DATA.features.map(
						({ properties }) => properties.NOM_OFFICIEL
					)}
					value={neighborhood}
					setValue={setNeighborhood}
					placeholder="neighborhood"
				/>
			</div>
			<div className="w-full px-4 lg:px-20 flex flex-col justify-center items-center gap-4">
				<div className="flex gap-2">
					<Button className="w-32" onClick={fetchListings}>
						{isLoading ? (
							<LoaderCircleIcon className="h-8 w-8 animate-spin mx-auto" />
						) : (
							"SEARCH"
						)}
					</Button>
					<Button
						variant="outline"
						className="w-32"
						onClick={() => setListings(undefined)}
						disabled={!listings}>
						CLEAR
					</Button>
				</div>
				{listings ? (
					<div className="flex gap-2 items-center">
						<Input placeholder="Enter your email..." type="email" />
						<Button className="w-40">
							<BellIcon />
							NOTIFY ME
						</Button>
					</div>
				) : null}
			</div>
			{error ? <p className="text-red-500 text-center">{error}</p> : null}
		</div>
	);
}
