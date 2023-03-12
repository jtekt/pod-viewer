import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();

if (process.env.NODE_ENV === 'development') {
	const files = import.meta.glob('../../../*', { as: 'raw' });
	const kubeconfigFileContent = await files['../../../kubeconfig']();
	kc.loadFromString(kubeconfigFileContent);
} else {
	kc.loadFromCluster();
}

export default kc;
