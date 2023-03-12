<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	export let data: { deployments: any[] };
</script>

<h2>Deployments</h2>
<DataTable style="max-width: 100%;">
	<Head>
		<Row>
			<Cell>Name</Cell>
			<Cell>Replicas</Cell>
		</Row>
	</Head>
	<Body>
		{#each data.deployments as deployment}
			<Row>
				<Cell>
					<a href={`/deployments/${deployment.metadata.name}`}>
						{deployment.metadata.name}
					</a>
				</Cell>
				<Cell>{deployment.status.readyReplicas} / {deployment.status.replicas}</Cell>
			</Row>
		{/each}
	</Body>
</DataTable>
