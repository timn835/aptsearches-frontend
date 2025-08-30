import { cn } from "@/lib/utils";

export function ToastCard({
	message,
	success,
	error,
}: {
	message: string;
	success?: boolean;
	error?: boolean;
}) {
	return (
		<div
			className={cn(
				"flex justify-center items-center flex-grow border px-4 py-2 rounded-lg shadow-md",
				{
					"border-green-500 text-green-500 bg-green-50": !!success,
					"border-red-500 text-red-500 bg-red-50": !!error,
				}
			)}>
			{message}
		</div>
	);
}
