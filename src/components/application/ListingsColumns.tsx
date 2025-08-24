import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import type { Listing } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export const columns: ColumnDef<Listing>[] = [
	{
		accessorKey: "id",
		header: () => null, // No header
		cell: () => null, // No cell content
		enableSorting: true,
		enableMultiSort: true,
	},
	{
		accessorKey: "imageUrl",
		header: () => <div className="w-20 truncate text-center">Image</div>,
		cell: ({ row }) => (
			<img
				src={row.getValue("imageUrl")}
				alt="listing-picture"
				className="inline-block w-20 h-20 object-cover rounded"
			/>
		),
	},
	{
		accessorKey: "price",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="w-32"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}>
					Price
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="w-32 text-center truncate">
				{`$${formatNumber(row.getValue("price"))}`}
			</div>
		),
	},
	{
		accessorKey: "aptSource",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="w-32"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}>
					Source
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="w-32 text-center truncate">
				{row.getValue("aptSource")}
			</div>
		),
	},

	{
		accessorKey: "address",
		header: () => <div className="w-32 truncate">Address</div>,
		cell: ({ row }) => (
			<div className="w-32 truncate" title={row.getValue("address")}>
				{row.getValue("address")}
			</div>
		),
	},
	{
		accessorKey: "name",
		header: () => <div className="w-32 truncate">Name</div>,
		cell: ({ row }) => (
			<div className="w-32 truncate" title={row.getValue("name")}>
				{row.getValue("name")}
			</div>
		),
	},
	{
		accessorKey: "url",
		header: () => <div className="w-10">View</div>,
		cell: ({ row }) => (
			<div className="w-10 text-center">
				<a
					href={row.getValue("url")}
					target="_blank"
					rel="noopener noreferrer">
					<Button>
						<ArrowRight />
					</Button>
				</a>
			</div>
		),
	},
];
