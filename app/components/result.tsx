"use client";

import { useAnimate } from "framer-motion/mini";
import { useEffect, useMemo } from "react";
import Markdown from "react-markdown";
import type { PartialGeneratedObject } from "../schema";
import { Spinner } from "./spinner";

type ResultProps = {
	query: string;
	generatedObject: PartialGeneratedObject;
};

export function Result(props: ResultProps) {
	const [artifactSpaceScope, artifactSpaceScopeAnimate] = useAnimate();
	const [artifactPanelScope, artifactPanelScopeAnimate] = useAnimate();

	useEffect(() => {
		if (artifactSpaceScope.current == null) {
			return;
		}
		if (props.generatedObject.artifact?.content) {
			artifactSpaceScopeAnimate(
				artifactSpaceScope.current,
				{ width: 400 },
				{ duration: 0.05 },
			);
			artifactPanelScopeAnimate(
				artifactPanelScope.current,
				{ transform: "translateX(0)" },
				{ duration: 0.05 },
			);
		}
	}, [
		props.generatedObject.artifact?.content,
		artifactSpaceScopeAnimate,
		artifactSpaceScope,
		artifactPanelScopeAnimate,
		artifactPanelScope,
	]);
	return (
		<div className="w-full min-h-screen bg-rosepine-base flex justify-center py-8 text-rosepine-text gap-8">
			<div className="border-l border-rosepine-highlightHigh pl-2 w-[600px] flex flex-col gap-4">
				<div className="flex items-start text-rosepine-text">
					<span className="mr-2">{">"}</span>
					<p>{props.query}</p>
				</div>
				<div className="text-rosepine-foam font-mono">
					{props.generatedObject.thinking ? (
						<div className="flex italic">
							<p className="w-10 block">{"ai:"}</p>
							<p className="flex-1">{props.generatedObject.thinking}</p>
						</div>
					) : (
						<Spinner />
					)}
				</div>
				{props.generatedObject.artifact && (
					<button
						type="button"
						className="text-rosepine-foam border border-rosepine-highlightMed rounded flex items-center overflow-hidden h-16 divide-x divide-rosepine-highlightMed ml-10"
					>
						<div className="bg-rosepine-surface h-full flex items-center justify-center px-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="stroke-rosepine-foam fill-none w-8"
							>
								<title>Artifact</title>
								<path d="M15 12h6" />
								<path d="M15 6h6" />
								<path d="m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13" />
								<path d="M3 18h18" />
								<path d="M4 11h6" />
							</svg>
						</div>
						<div className="pl-2 flex-1 h-full bg-rosepine-overlay flex items-center justify-start text-left">
							<div className="leading-none">
								<div className="flex text-rosepine-pine font-semibold">
									<p className="line-clamp-1">
										{props.generatedObject.artifact.title}
									</p>
								</div>
								{props.generatedObject.artifact.completed === undefined ||
								!props.generatedObject.artifact.completed ? (
									<Spinner />
								) : (
									<p className="text-sm">Click to open generated text</p>
								)}
							</div>
						</div>
					</button>
				)}
				{props.generatedObject.description && (
					<div className="ml-10">
						<p className="text-rosepine-foam font-mono italic">
							{props.generatedObject.description}
						</p>
					</div>
				)}
				{/** <pre>{JSON.stringify(props.generatedObject, null, 2)}</pre> */}
			</div>
			<div className="w-[0px]" ref={artifactSpaceScope}>
				<div
					className="px-8 py-8 border border-rosepine-highlightMed rounded bg-rosepine-surface text-rosepine-textoverflow-hidden fixed top-0 right-0 bottom-0 my-8 mr-4 w-[400px] translate-x-[120%] overflow-x-hidden overflow-y-auto prose prose-sm prose-headings:text-rosepine-text prose-lead:text-rosepine-text prose-blockquote:text-rosepine-text prose-strong:text-rosepine-text prose-p:text-rosepine-text prose-li:text-rosepine-text prose-code:text-rosepine-text"
					ref={artifactPanelScope}
				>
					<Markdown>{props.generatedObject.artifact?.content ?? ""}</Markdown>
				</div>
			</div>
		</div>
	);
}
