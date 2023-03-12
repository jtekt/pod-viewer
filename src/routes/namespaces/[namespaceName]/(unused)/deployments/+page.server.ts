import k8s from '@kubernetes/client-node';
import kc from '$lib/server/kubeconfig';

export async function load({ params }) {
	const { namespaceName } = params;

	const api = kc.makeApiClient(k8s.AppsV1Api);

	const {
		body: { items }
	} = await api.listNamespacedDeployment(namespaceName);

	console.log(items[0].status);

	const deployments = items.map(({ metadata, status }) => ({
		metadata: {
			name: metadata?.name
		},
		status: {
			availableReplicas: status?.availableReplicas, // Not sure if this is relevant
			readyReplicas: status?.readyReplicas,
			replicas: status?.replicas
		}
	}));
	return { deployments };
}
