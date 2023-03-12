interface EnvVar {
	name: string;
	value: string;
}

interface Container {
	name: string;
	image: string;
	env: EnvVar[];
}

export interface Pod {
	metadata: {
		name: string;
	};
	spec: {
		containers: Container[];
	};
	status: {
		phase: string;
	};
}
