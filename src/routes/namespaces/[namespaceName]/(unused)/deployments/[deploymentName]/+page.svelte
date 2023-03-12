<script lang="ts">
	import type Deployment from '../deployment';
	import type { Pod } from '../../../pods/pod';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import StatusIndicator from '$lib/StatusIndicator.svelte';
	export let data: { deployment: Deployment; pods: Pod[] };
</script>

<h2>{data.deployment.metadata.name}</h2>

<p>Replicas: {data.deployment.status.readyReplicas} / {data.deployment.status.replicas}</p>

<h3>Pods</h3>

<DataTable style="max-width: 100%;">
	<Head>
		<Row>
			<Cell>Name</Cell>
			<Cell>Phase</Cell>
		</Row>
	</Head>
	<Body>
		{#each data.pods as pod}
			<Row>
				<Cell>
					<a href={`/pods/${pod.metadata.name}`}>
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
