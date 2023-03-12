<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';

	import type Namespace from './namespace';
	export let data: { namespaces: Namespace[] };
	const { namespaces } = data;
	let search = '';

	$: filteredNamespaces = search
		? namespaces.filter((ns) => ns.metadata.name.toLocaleLowerCase().includes(String(search)))
		: namespaces;
</script>

<div class="breadcrumbs">
	<span>Cluster</span>
	<span>/</span>
</div>

<h2>Namespaces</h2>

<p>
	<Textfield bind:value={search} label="Search">
		<Icon class="material-icons" slot="trailingIcon">search</Icon>
	</Textfield>
</p>

<DataTable style="width: 100%;">
	<Head>
		<Row>
			<Cell style="width: 100%;">Name</Cell>
			<Cell>Status</Cell>
		</Row>
	</Head>
	<Body>
		{#each filteredNamespaces as namespace}
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
