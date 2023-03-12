import kc from '$lib/server/kubeconfig';
import k8s from '@kubernetes/client-node';

export async function load({ params }) {
	const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

	const {
		body: { items }
	} = await coreV1Api.listNamespace();

	return {
		namespaces: items.map((item) => ({
			metadata: {
				name: item.metadata?.name
			},
			status: {
				phase: item.status?.phase
			}
		}))
	};
}
