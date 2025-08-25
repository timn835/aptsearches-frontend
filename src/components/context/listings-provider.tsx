import type { Listing } from "@/lib/types";
import { createContext, useContext, useState, type ReactNode } from "react";

type ListingsProviderProps = {
	children: ReactNode;
};

type ListingsProviderState = {
	listings: Listing[] | undefined;
	setListings: (listings: Listing[] | undefined) => void;
};

const initialState: ListingsProviderState = {
	listings: undefined,
	setListings: () => null,
};

const ListingsProviderContext =
	createContext<ListingsProviderState>(initialState);

export function ListingsProvider({
	children,
	...props
}: ListingsProviderProps) {
	const [listings, setListings] = useState<Listing[] | undefined>();

	const value = {
		listings,
		setListings,
	};

	return (
		<ListingsProviderContext.Provider {...props} value={value}>
			{children}
		</ListingsProviderContext.Provider>
	);
}

export const useListings = () => {
	const context = useContext(ListingsProviderContext);

	if (context === undefined)
		throw new Error("useListings must be used within a ListingsProvider");

	return context;
};
