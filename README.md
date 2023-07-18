# Pod viewer

A simple application to view the status and logs of pods in a Kubernetes cluster.

![](./docs/screenshot.PNG)

## Usage

Pod viewer requires a service account and corresponding cluster role binding so as to retrive pod data from Kubernetes.
Here is an implementation example:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-service-account
  namespace: my-namespace
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: my-cluster-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: my-service-account
    namespace: my-namespace
```

Pod viewer can then be deployed using a manifest such as [that provided in this repository](/kubernetes_manifest.yml)
