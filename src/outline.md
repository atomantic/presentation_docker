## Outline

Title slide

- Qualification/joke

Part 1 - Why Containers?

* Advantages
    * Better Developer Environment setup
    * Ops only has to care that the docker container is Running
    * Restart is easy
    * The entire container is locked at build
    * we can test security upgrades on VMs independent of containers

Part 2 - Getting Started

* PM2 Docker base: https://registry.hub.docker.com/u/atomantic/pm2/
        $(boot2docker shellinit)
        docker run -i centos:7 /bin/bash
            yum update -y
            rpm -Uvh http://download.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
            yum install -y npm
            npm install -g pm2
            yum install -y make
            yum install -y git-core
            exit
        docker commit -m 'node.js and pm2' -a "Adam Eivy" 9b93f815330f atomantic/pm2
        docker push atomantic/pm2

Part 3 - Build / Deployment

Part 4 - Development

* Dockerfile
* Dockerfile.local
* Dockerfile.rpm

Part 5 - Problems

* Running on IaaS
    * kernel panic
    * 2.6.32-431.el6 to 2.6.32-504.8.1.el6.
    * upgrade (quarterly)
    * IaaS HA.... no
* RPM
* Develop Using Docker
* in order to add non-user directory shares, you have to stop and restart the VM
* don't run docker setup in the VM until the previous one finishes
