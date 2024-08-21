<script lang="ts">
	import type { Pod } from './pod';
	import { page } from '$app/stores';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';

	import StatusIndicator from '$lib/StatusIndicator.svelte';

	export let data: { pods: Pod[] };
	const { pods } = data;

	const { namespaceName } = $page.params;
	let search = '';

	$: filteredPods = search
		? pods.filter((pod) => pod.metadata.name.toLocaleLowerCase().includes(String(search)))
		: pods;
</script>

<p>
	<a href={`/namespaces`}>Cluster</a>
	<span>/</span>
	<span>{namespaceName}</span>
</p>

<h2>{namespaceName}</h2>
<p>
	<Textfield bind:value={search} label="Search" input$emptyValueUndefined>
		<Icon class="material-icons" slot="trailingIcon">search</Icon>
	</Textfield>
</p>
{#if pods.length}
	<DataTable style="width: 100%;">
		<Head>
			<Row>
				<Cell style="width: 100%;">Name</Cell>
				<Cell>Status</Cell>
			</Row>
		</Head>
		<Body>
			{#each filteredPods as pod}
				<Row>
					<Cell>
						<a href={`/namespaces/${namespaceName}/pods/${pod.metadata.name}`}>
							{pod.metadata.name}
						</a>
					</Cell>
					<Cell>
						<StatusIndicator status={pod.status} />
					</Cell>
				</Row>
			{/each}
		</Body>
	</DataTable>
{:else}
	<p>No pod in namespace {namespaceName}</p>
{/if}

<style>
</style>
