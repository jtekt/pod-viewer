<script lang="ts">
	export let status: string;
</script>

<span class={status}>{status}</span>

<style>
	span:not(.Running) {
		background-color: rgb(223, 154, 154);
	}

	span.Running {
		background-color: rgb(160, 223, 154);
	}

	span {
		padding: 0.5em 0.75em;
		border-radius: 1000px;
	}
</style>
