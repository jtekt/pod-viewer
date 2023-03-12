<script lang="ts">
	import type { Pod } from './pod';
	import { page } from '$app/stores';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import StatusIndicator from '$lib/StatusIndicator.svelte';

	export let data: { pods: Pod[] };
	const { pods } = data;
	const { namespaceName } = $page.params;
</script>

<div class="breadcrumbs">
	<a href={`/namespaces`}>Cluster</a>
	<span>/</span>
	<span>{namespaceName}</span>
</div>

<h2>{namespaceName} pods</h2>

{#if pods.length}
	<DataTable style="width: 100%;">
		<Head>
			<Row>
				<Cell style="width: 100%;">Name</Cell>
				<Cell>Phase</Cell>
			</Row>
		</Head>
		<Body>
			{#each pods as pod}
				<Row>
					<Cell>
						<a href={`/namespaces/${namespaceName}/pods/${pod.metadata.name}`}>
							{pod.metadata.name}
						</a>
					</Cell>
					<Cell>
						<StatusIndicator status={pod.status.phase} />
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
