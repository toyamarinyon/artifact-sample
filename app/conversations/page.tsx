"use client";

import { useState } from "react";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
	const [generation, setGeneration] = useState<string>("");

	return (
		<div className="w-full min-h-screen bg-rosepine-base flex justify-center py-8 text-rosepine-text">
			<div className="border-l border-rosepine-highlightHigh pl-2 w-[600px] flex flex-col gap-4">
				<div className="flex items-start text-rosepine-text">
					<span className="mr-2">{">"}</span>
					<p>Please tell me react js</p>
				</div>
			</div>
		</div>
	);
	// return <Welcome />;
}
