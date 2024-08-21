import kc from '$lib/server/kc';
import { formaPodtState } from '$lib/server/utils.js';
import k8s from '@kubernetes/client-node';

export async function load({ params }) {
	const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

	const { podName, namespaceName } = params;

	let logs = 'Logs not available';

	const { body: pod } = await coreV1Api.readNamespacedPod(podName, namespaceName);

	try {
		const { body } = await coreV1Api.readNamespacedPodLog(podName, namespaceName);
		logs = body;
	} catch (error: any) {
		console.error(error?.body?.message);
	}

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
				phase: pod.status?.phase,
				startTime: pod.status?.startTime,
				state: formaPodtState(pod)
			}
		}
	};
}
