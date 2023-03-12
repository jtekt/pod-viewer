<script lang="ts">
	import type { Pod } from '../pod';
	import { page } from '$app/stores';
	import StatusIndicator from '$lib/StatusIndicator.svelte';
	import List, { Item, Graphic, Meta, Text, PrimaryText, SecondaryText } from '@smui/list';

	export let data: { pod: Pod; logs: string };
	const { pod, logs } = data;
	const { namespaceName, podName } = $page.params;
	const showEnvVars = false;
</script>

<div class="breadcrumbs">
	<a href={`/namespaces`}>Cluster</a>
	<span>/</span>
	<a href={`/namespaces/${namespaceName}/pods`}>{namespaceName}</a>
	<span>/</span>
	<span>{podName}</span>
</div>

<h2>{podName}</h2>

<p>
	Status: <StatusIndicator status={pod.status.phase} />
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

<!-- 
	<h4>{container.name}</h4>
	<p>Image: {container.image}</p>

{#if showEnvVars}
		<h5>Environment variables</h5>
		{#each container.env as envVar}
			<p>{envVar.name}: {envVar.value}</p>
		{/each}
	{/if} -->

<h3>Logs</h3>
<pre><code>{logs}</code></pre>

<style>
	pre {
		padding: 1rem;
		background-color: black;
		color: white;
		overflow-x: auto;
	}
</style>
