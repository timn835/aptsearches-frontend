import { ToastCard } from "@/components/application/ToastCard";
import { useListings } from "@/components/context/listings-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	adjustParams,
	getSearchParamString,
	MTL_NEIGHBORHOODS,
} from "@/lib/utils";
import { BellIcon, LoaderCircleIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function SearchForm() {
	const [bedrooms, setBedrooms] = useState<number | undefined>();
	const [neighborhood, setNeighborhood] = useState<string>("");
	const [listingsLoading, setListingsLoading] = useState<boolean>(false);
	const [subscriptionCreating, setSubscriptionCreating] =
		useState<boolean>(false);
	const searchFormRef = useRef<{
		minPrice?: number;
		maxPrice?: number;
		email?: string;
	}>({});

	const { listings, setListings } = useListings();

	const fetchListings = async () => {
		if (listingsLoading || subscriptionCreating) return;
		setListingsLoading(true);
		try {
			let { minPrice, maxPrice } = adjustParams(searchFormRef.current);
			const searchParams: string = getSearchParamString(
				{ minPrice, maxPrice },
				bedrooms,
				neighborhood
			);

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
			toast(
				<ToastCard
					message="Something went wrong! We were unable to fetch the listings, please try again."
					error
				/>
			);
		} finally {
			setListingsLoading(false);
		}
	};

	const createSubscription = async () => {
		if (listingsLoading || subscriptionCreating) return;
		setSubscriptionCreating(true);
		try {
			let { email, minPrice, maxPrice } = adjustParams(
				searchFormRef.current
			);
			if (!email) return;

			const result = await fetch(
				`${import.meta.env.VITE_API_URL}/subscription`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						bedrooms,
						minPrice,
						maxPrice,
						neighborhood,
					}),
				}
			);
			if (!result.ok) throw Error("Unable to create subscription");
			toast(
				<ToastCard
					message="Success! Please click on the link sent to your email to confirm the subscription!"
					success
				/>
			);
		} catch (error) {
			toast(
				<ToastCard
					message="Something went wrong! We were unable to send you the email, please try again"
					error
				/>
			);
		} finally {
			setSubscriptionCreating(false);
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
					data={Array.from(MTL_NEIGHBORHOODS)}
					value={neighborhood}
					setValue={setNeighborhood}
					placeholder="neighborhood"
				/>
			</div>
			<div className="w-full px-4 lg:px-20 flex flex-col justify-center items-center gap-4">
				<div className="flex gap-2">
					<Button className="w-32" onClick={fetchListings}>
						{listingsLoading ? (
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
						<Input
							placeholder="Enter your email..."
							type="email"
							onChange={(value) => {
								if (!value.currentTarget.value)
									searchFormRef.current.email = undefined;
								else
									searchFormRef.current.email =
										value.currentTarget.value;
							}}
						/>
						<Button className="w-40" onClick={createSubscription}>
							{subscriptionCreating ? (
								<LoaderCircleIcon className="h-8 w-8 animate-spin mx-auto" />
							) : (
								<>
									<BellIcon />
									NOTIFY ME
								</>
							)}
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
}
