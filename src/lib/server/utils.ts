import { V1Pod } from '@kubernetes/client-node';

export const formaPodtState = (pod: V1Pod) => {
	let state = pod.status?.phase;
	const containerStatuses = pod.status?.containerStatuses;

	if (!containerStatuses) return state;

	// If at least one container is waiting, then state becomes the reason
	const waitingContainer = containerStatuses.find((c) => c.state?.waiting);
	if (waitingContainer) state = waitingContainer.state?.waiting?.reason;

	return state;
};
