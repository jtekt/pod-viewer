<script lang="ts">
	export let phase: string;
</script>

<span class={phase}>{phase}</span>

<style>
	span:is(.Failed, .Unknown) {
		background-color: rgb(223, 154, 154);
	}

	span:is(.Succeeded, .Running) {
		background-color: rgb(160, 223, 154);
	}

	span:is(.Pending) {
		background-color: rgb(154, 184, 223);
	}

	span {
		padding: 0.5em 0.75em;
		border-radius: 1000px;
	}
</style>
