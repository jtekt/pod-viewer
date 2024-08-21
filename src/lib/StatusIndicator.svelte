<script lang="ts">
	export let status: any;
</script>

<span class={status.state}>{status.state}</span>

<style>
	span:is(.Failed, .Unknown, .ImagePullBackOff) {
		background-color: rgb(223, 154, 154);
	}

	span:is(.Succeeded, .Running) {
		background-color: rgb(160, 223, 154);
	}

	span:is(.Pending) {
		background-color: rgb(154, 184, 223);
	}

	span {
		color: black;
		padding: 0.5em 0.75em;
		border-radius: 1000px;
		background-color: rgb(223, 213, 154);
	}
</style>
