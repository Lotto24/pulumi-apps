# Pulumi Applications

This repository includes cloud applications and infrastructure which can be installed using [Pulumi](https://pulumi.io).

For any application in this repository, it can be installed via:

```bash
# To install the application directly into your cloud provider
$ pulumi up https://github.com/Lotto/pulumi-apps/tree/lotto24/eks

# To get a copy of the application locally which can be deployed and updated
$ pulumi new https://github.com/Lotto/pulumi-apps/tree/lotto24/eks
```

### Note:
If you want to use the 'master' branch you can just use the commands below.

But since we're on the 'lotto24' branch, we should always use the above

```bash
# To install the application directly into your cloud provider
$ pulumi up https://github.com/Lotto/pulumi-apps/eks

# To get a copy of the application locally which can be deployed and updated
$ pulumi new https://github.com/Lotto/pulumi-apps/eks
```
