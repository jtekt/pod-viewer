import kc from '$lib/server/kubeconfig';
import k8s from '@kubernetes/client-node';

export async function load({ params }) {
	const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
	const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

	const { namespaceName, deploymentName } = params;

	const { body: deployment } = await appsV1Api.readNamespacedDeployment(
		deploymentName,
		namespaceName
	);

	const matchLabels = deployment.spec?.selector.matchLabels;
	// Dirty
	const labelSelector = matchLabels ? Object.entries(matchLabels)[0].join('=') : undefined;

	const {
		body: { items: pods }
	} = await coreV1Api.listNamespacedPod(
		namespaceName,
		undefined,
		undefined,
		undefined,
		undefined,
		labelSelector
	);

	const deploymentFormatted = {
		metadata: {
			name: deployment.metadata?.name
		},
		status: {
			replicas: deployment.status?.replicas,
			readyReplicas: deployment.status?.readyReplicas
		}
	};

	const podsFormatted = pods.map((pod) => ({
		metadata: {
			name: pod.metadata?.name
		},

		status: {
			phase: pod.status?.phase
		}
	}));

	return {
		deployment: deploymentFormatted,
		pods: podsFormatted
	};
}
