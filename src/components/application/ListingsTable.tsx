import type { Listing } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";

import {
	type ColumnDef,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function ListingsTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});
	return (
		<section className="mt-10 flex flex-1 items-center justify-center">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{/* <Table className="table-fixed w-full">
				<TableHeader>
					<TableRow>
						<TableHead className="w-20 truncate text-center">
							Image
						</TableHead>
						<TableHead className="w-32 truncate">Address</TableHead>
						<TableHead className="w-20 truncate">Price</TableHead>
						<TableHead className="w-32 truncate">Name</TableHead>
						<TableHead className="w-10 text-center">View</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{listings.map((listing) => (
						<TableRow key={listing.id}>
							<TableCell className="w-20 h-20 text-center align-middle">
								<img
									src={listing.imageUrl}
									alt="listing-picture"
									className="inline-block w-20 h-20 object-cover rounded"
								/>
							</TableCell>
							<TableCell
								className="w-32 truncate"
								title={listing.address}>
								{listing.address}
							</TableCell>
							<TableCell className="w-20 truncate">
								{`$${formatNumber(listing.price)} ${
									listing.priceCurrency
								}`}
							</TableCell>
							<TableCell
								className="w-32 truncate"
								title={listing.name}>
								{listing.name}
							</TableCell>
							<TableCell className="w-10 text-center">
								<a
									href={listing.url}
									target="_blank"
									rel="noopener noreferrer">
									<Button>
										<ArrowRight />
									</Button>
								</a>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table> */}
		</section>
	);
}
