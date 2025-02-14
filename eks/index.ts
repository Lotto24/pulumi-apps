import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import * as eks from "@pulumi/eks";

// Get configuration for the stack
const config = new pulumi.Config();
const instanceType = config.get("instanceType") as aws.ec2.InstanceType;
const desiredCapacity = config.getNumber("desiredCapacity");
const minSize = config.getNumber("minSize");
const maxSize = config.getNumber("maxSize");
const storageClass = config.get("storageClass") as eks.EBSVolumeType;

// Create a VPC for our cluster.
const vpc = new awsx.ec2.Vpc("eksvpc", {});

// Create an EKS cluster with the given configuration.
const cluster = new eks.Cluster("cluster", {
    vpcId: vpc.vpcId,
    subnetIds: vpc.publicSubnetIds,
    instanceType: instanceType,
    desiredCapacity: desiredCapacity,
    minSize: minSize,
    maxSize: maxSize,
    storageClasses: storageClass,
});

// Add the vpc-cni EKS addoncat
// Seems that this is being needed by the aws-node daemonset
new aws.eks.Addon("vpc-cni-addon", {
    clusterName: cluster.eksCluster.name,
    addonName: "vpc-cni",
    addonVersion: "v1.15.1-eksbuild.1",
});


// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig;

pulumi.log.info(`
Use can access the cluster like this:

$ pulumi stack output kubeconfig > kubeconfig.json
$ KUBECONFIG=./kubeconfig.json kubectl get nodes
`);
