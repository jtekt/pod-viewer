<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

	import type Namespace from './namespace';
	export let data: { namespaces: Namespace[] };
	const { namespaces } = data;
</script>

<h2>Namespaces</h2>

<DataTable style="width: 100%;">
	<Head>
		<Row>
			<Cell style="width: 100%;">Name</Cell>
			<Cell>Status</Cell>
		</Row>
	</Head>
	<Body>
		{#each namespaces as namespace}
			<Row>
				<Cell>
					<a href={`/namespaces/${namespace.metadata.name}/pods/`}>
						{namespace.metadata.name}
					</a>
				</Cell>
				<Cell>
					<span class="status">
						{namespace.status.phase}
					</span>
				</Cell>
			</Row>
		{/each}
	</Body>
</DataTable>

<style>
</style>
