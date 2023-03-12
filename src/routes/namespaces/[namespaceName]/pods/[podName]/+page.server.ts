import kc from '$lib/server/kubeconfig';
import k8s from '@kubernetes/client-node';

export async function load({ params }) {
	const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

	const { podName, namespaceName } = params;

	const { body: pod } = await coreV1Api.readNamespacedPod(podName, namespaceName);
	const { body: logs } = await coreV1Api.readNamespacedPodLog(podName, namespaceName);

	const containers = pod.spec?.containers;

	return {
		logs,
		pod: {
			metadata: {
				name: pod.metadata?.name
			},
			spec: {
				containers: containers?.map((container) => ({
					name: container.name,
					env: container.env?.map(({ name, value }) => ({ name, value })),
					image: container.image
				}))
			},
			status: {
				phase: pod.status?.phase
			}
		}
	};
}
