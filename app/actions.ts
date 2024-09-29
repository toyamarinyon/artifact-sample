"use server";

import { openai } from "@ai-sdk/openai";
import { jsonSchema, streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { schema } from "./schema";

export async function generate(input: string) {
	const stream = createStreamableValue();

	(async () => {
		const { partialObjectStream } = await streamObject({
			model: openai("gpt-4o-mini"),
			system: "You generate an answer to a question. ",
			prompt: input,
			schema,
		});

		for await (const partialObject of partialObjectStream) {
			stream.update(partialObject);
		}

		stream.done();
	})();

	return { object: stream.value };
}
