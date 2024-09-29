"use client";

import { readStreamableValue } from "ai/rsc";
import { useCallback, useState } from "react";
import { generate } from "./actions";
import { Result } from "./components/result";
import { Welcome } from "./components/welcome";
import type { PartialGeneratedObject } from "./schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
	const [query, setQuery] = useState("");
	const [generatedObject, setGeneratedObject] =
		useState<PartialGeneratedObject>({});

	const handleRequest = useCallback(async (query: string) => {
		setQuery(query);
		const { object } = await generate(query);

		for await (const partialObject of readStreamableValue(object)) {
			if (partialObject) {
				setGeneratedObject(partialObject as PartialGeneratedObject);
			}
		}
	}, []);

	if (query !== "") {
		return <Result query={query} generatedObject={generatedObject} />;
	}

	return <Welcome onRequest={handleRequest} />;
}
