import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState, type Dispatch, type SetStateAction } from "react";

export function Combobox({
	data,
	value,
	setValue,
	placeholder,
}: {
	data: string[];
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	placeholder?: string;
}) {
	const [open, setOpen] = useState(false);
	// const [value, setValue] = useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] lg:w-[300px] justify-between">
					{value
						? data.find((element) => element === value)
						: placeholder
						? `Select ${placeholder}...`
						: "Select..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] lg:w-[300px] p-0">
				<Command>
					<CommandInput
						placeholder={
							placeholder
								? `Search ${placeholder}...`
								: "Search..."
						}
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>Nothing found.</CommandEmpty>
						<CommandGroup>
							{data.map((element) => (
								<CommandItem
									key={element}
									value={element}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value
												? ""
												: currentValue
										);
										setOpen(false);
									}}>
									{element}
									<Check
										className={cn(
											"ml-auto",
											value === element
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
