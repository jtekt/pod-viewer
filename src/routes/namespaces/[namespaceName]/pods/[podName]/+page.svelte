<script lang="ts">
	import { onMount } from 'svelte';
	import type { Pod } from '../pod';
	import { page } from '$app/stores';
	import PhaseIndicator from '$lib/PhaseIndicator.svelte';
	import List, { Item, Text, PrimaryText, SecondaryText } from '@smui/list';

	export let data: { pod: Pod; logs: string };
	const { pod, logs } = data;
	const { namespaceName, podName } = $page.params;
	const showEnvVars = false;
	let logsContainer: HTMLPreElement;

	onMount(() => {
		logsContainer.scrollTop = logsContainer.scrollHeight;
	});
</script>

<p>
	<a href={`/namespaces`}>Cluster</a>
	<span>/</span>
	<a href={`/namespaces/${namespaceName}/pods`}>{namespaceName}</a>
	<span>/</span>
	<span>{podName}</span>
</p>

<h2>{podName}</h2>

<p>
	Status: <PhaseIndicator phase={pod.status.phase} />
</p>

<h3 style="margin-bottom: 0;">Containers</h3>
<List twoLine nonInteractive>
	{#each pod.spec.containers as container}
		<Item>
			<Text>
				<PrimaryText>{container.name}</PrimaryText>
				<SecondaryText>Image: {container.image}</SecondaryText>
			</Text>
			<Text />
		</Item>
	{/each}
</List>

<h3>Logs</h3>
<pre bind:this={logsContainer}><code>{logs}</code></pre>

<style>
	pre {
		padding: 1rem;
		background-color: #444444;
		color: white;
		overflow-x: auto;
		border-radius: 0.5em;
		max-height: 80vh;
	}
</style>
