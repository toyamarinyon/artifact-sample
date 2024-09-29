"use client";

import { ArrowRight } from "@/components/icons/arrow-right";

type WelcomeProps = {
	onRequest: (query: string) => void | Promise<void>;
};

export function Welcome(props: WelcomeProps) {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const query = formData.get("query") as string;
		await props.onRequest(query);
	};
	return (
		<div className="w-full min-h-screen bg-rosepine-base flex justify-center items-center">
			<div>
				<form
					onSubmit={handleSubmit}
					className="border-l border-rosepine-highlightHigh pl-2 w-[600px] flex flex-col gap-4"
				>
					<div className="flex flex-col gap-1">
						<div className="text-rosepine-foam">Ask anything</div>
						<div className="flex items-start text-rosepine-text">
							<span className="mr-2">{">"}</span>
							<textarea
								rows={1}
								name="query"
								className="border-0 border-rosepine-highlightHigh outline-none bg-transparent w-full resize-none"
								onInput={(e) => {
									const target = e.target as HTMLTextAreaElement;
									target.style.height = "0px";
									target.style.height = `${target.scrollHeight}px`;
								}}
							/>
						</div>
					</div>
					<div className="-mx-1">
						<button
							className="flex items-center gap-1 pl-1 pr-2 text-rosepine-text hover:bg-rosepine-overlay"
							type="submit"
						>
							<ArrowRight className="w-4 h-4" />
							Ask
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
