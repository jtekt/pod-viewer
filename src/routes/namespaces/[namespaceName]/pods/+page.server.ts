import kc from '$lib/server/kc';
import { formaPodtState } from '$lib/server/utils.js';
import k8s from '@kubernetes/client-node';

export async function load({ params }) {
	const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

	const { namespaceName } = params;

	const {
		body: { items }
	} = await coreV1Api.listNamespacedPod(namespaceName);

	const pods = items.map((pod) => {
		return {
			metadata: {
				name: pod.metadata?.name
			},
			status: {
				phase: pod.status?.phase,
				startTime: pod.status?.startTime,
				state: formaPodtState(pod)
			}
		};
	});

	return { pods };
}
