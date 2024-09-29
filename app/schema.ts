import { jsonSchema } from "ai";

function isString(value: unknown): value is string {
	return typeof value === "string";
}

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isBoolean(value: unknown): value is boolean {
	return typeof value === "boolean";
}

type GeneratedObject = {
	thinking: string;
	artifact: {
		title: string;
		content: string;
		completed: boolean;
	};
	description: string;
};
export type PartialGeneratedObject = Partial<GeneratedObject>;
export const schema = jsonSchema<GeneratedObject>(
	{
		type: "object",
		properties: {
			thinking: {
				type: "string",
				description:
					"How you think about the content of the artefact (purpose, structure, essentials) and how you intend to output it",
			},
			artifact: {
				type: "object",
				properties: {
					title: { type: "string", description: "The title of the artefact" },
					content: {
						type: "string",
						description: "The content of the artefact formatted markdown",
					},
					completed: {
						type: "boolean",
						description: "Whether the artefact is completed",
					},
				},
				required: ["title", "content"],
			},
			description: {
				type: "string",
				description:
					"Explanation of the Artifact and what the intention was in creating this Artifact. Add any suggestions for making it even better.",
			},
		},
		required: ["thinking", "artifact", "description"],
	},
	{
		validate: (value) => {
			if (!isObject(value)) {
				return { success: false, error: new Error("value must be an object") };
			}

			const { thinking, artifact, description } = value;

			if (!isString(thinking)) {
				return {
					success: false,
					error: new Error("thinking must be a string"),
				};
			}

			if (!isObject(artifact)) {
				return {
					success: false,
					error: new Error("artifact must be an object"),
				};
			}

			const { title, content, completed } = artifact;

			if (!isString(title)) {
				return {
					success: false,
					error: new Error("artifact.title must be a string"),
				};
			}

			if (!isString(content)) {
				return {
					success: false,
					error: new Error("artifact.content must be a string"),
				};
			}

			if (!isString(content)) {
				return {
					success: false,
					error: new Error("artifact.content must be a string"),
				};
			}

			if (!isBoolean(completed)) {
				return {
					success: false,
					error: new Error("artifact.completed must be a boolean"),
				};
			}

			if (description === undefined) {
				return {
					success: false,
					error: new Error("description must be a string if provided"),
				};
			}
			if (!isString(description)) {
				return {
					success: false,
					error: new Error("description must be a string if provided"),
				};
			}

			return {
				success: true,
				value: {
					thinking,
					artifact: { title, content, completed },
					description,
				},
			};
		},
	},
);

type PartialSchema = typeof schema;
