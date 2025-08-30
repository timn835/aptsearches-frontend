import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EMAIL_REGEX } from "@/lib/utils";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ToastCard } from "@/components/application/ToastCard";
import { toast } from "sonner";

export function SuggestForm() {
	const [suggestionCreating, setSuggestionCreating] =
		useState<boolean>(false);

	const suggestFormRef = useRef<{
		email: string;
		suggestion: string;
	}>({ email: "", suggestion: "" });

	const createSuggestion = async () => {
		if (suggestionCreating) return;
		const { email, suggestion } = suggestFormRef.current;
		if (
			!suggestion ||
			!email ||
			email.length > 300 ||
			!EMAIL_REGEX.test(email)
		)
			return;
		setSuggestionCreating(true);
		try {
			const result = await fetch(
				`${import.meta.env.VITE_API_URL}/suggestion`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						suggestion: suggestion.slice(0, 300),
					}),
				}
			);
			if (!result.ok) throw Error("Unable to create suggestion");
			toast(
				<ToastCard
					message="Success! We have added your suggestion to our database and we will see if we can add it to our search!"
					success
				/>
			);
		} catch (error) {
			console.error(error);
			toast(
				<ToastCard
					message="Something went wrong! We were unable to register your suggestion, please try again."
					error
				/>
			);
		} finally {
			setSuggestionCreating(false);
		}
	};

	return (
		<div className="flex flex-col md:flex-row gap-2">
			<Input
				type="email"
				className="w-80"
				placeholder="Enter your email"
				onChange={(value) => {
					suggestFormRef.current.email = value.currentTarget.value;
				}}
			/>
			<div
				id="suggest"
				className="w-80 flex items-center justify-center gap-2">
				<Input
					placeholder="Enter name or url to suggest"
					onChange={(value) => {
						suggestFormRef.current.suggestion =
							value.currentTarget.value;
					}}
				/>
				<Button className="w-12" onClick={createSuggestion}>
					{suggestionCreating ? (
						<LoaderCircleIcon className="h-8 w-8 animate-spin mx-auto" />
					) : (
						<SendIcon />
					)}
				</Button>
			</div>
		</div>
	);
}
