export default interface Deployment {
	metadata: {
		name: string;
	};
	status: {
		replicas: number;
		readyReplicas: number;
	};
}
