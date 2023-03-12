import kc from '$lib/server/kc';
import k8s from '@kubernetes/client-node';

export async function load({ params }) {
	const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

	const { namespaceName } = params;

	const {
		body: { items }
	} = await coreV1Api.listNamespacedPod(namespaceName);

	const pods = items.map((item) => ({
		metadata: {
			name: item.metadata?.name
		},
		status: {
			phase: item.status?.phase
		}
	}));

	return { pods };
}
