---
id: about
title: What is DVID?
---

DVID is a *distributed, versioned, image-oriented dataservice* written to support 
[Janelia Research Campus's](http://www.janelia.org) brain imaging, analysis and 
visualization efforts.   It's goal is to provide:

* Easily extensible *data types* that allow tailoring of access speeds, storage space, and APIs.
* The ability to use a variety of key-value stores from local, fast embedded leveldb on a NVMe SSD to a petabyte-scale store like Google Cloud Storage.
* A framework for thinking of distribution and versioning of data similar to distributed version 
control systems like [git](http://git-scm.com).
* A stable [science-driven API](https://github.com/janelia-flyem/dvid/wiki/Simple-Example#dvid-api-documentation) that can be implemented either by native DVID data types and storage engines or by proxying to other connectomics services like Google BrainMaps or OpenConnectome.

![High-level architecture of DVID](/img/dvid-highlevel.png)

DVID aspires to be a "github for large image-oriented data" because each DVID
server can manage multiple repositories, each of which contains an image-oriented repo
with related data like an image volume, labels, and skeletons.  The goal is to provide scientists 
with a github-like web client + server that can push/pull data to a collaborator's DVID server.

Although DVID is easily extensible by adding custom *data types*, each of which fulfill a
minimal interface (e.g., HTTP request handling), DVID's initial focus is on efficiently handling data essential for Janelia's connectomics research:

* image and 64-bit label 3d volumes, including multiscale support
* 2d images in XY, XZ, YZ, and arbitrary orientation
* multiscale 2d images in XY, XZ, and YZ, similar to quadtrees
* low-latency sparse volumes corresponding to each unique label in a volume, that can be merged or split
* point annotations (e.g., synapse elements) that can be quickly accessed via subvolumes or labels
* label graphs
* regions of interest represented via a coarse subdivision of space using block indices
* 2d and 3d image and label data using Google BrainMaps API and other cloud-based services
* supervoxel-aware blobstore that can return tar files for all supervoxel-based data associated with a label
* key-values which can be used like a versioned file system

Each of the above is handled by built-in data types via a
[Level 2 REST HTTP API](http://martinfowler.com/articles/richardsonMaturityModel.html)
implemented by Go language packages within the *datatype* directory.  When dealing with novel data,
we typically use the generic *keyvalue* data type and store JSON-encoded or binary data
until we understand the desired access patterns and API.  When we outgrow the *keyvalue* type's
GET, POST, and DELETE operations, we create a custom data type package with a specialized HTTP API.

DVID can write mutation and activity logs to Kafka.  At Janelia, we process activity logs in kafka to view DVID performance in Kibana.

![Snapshot of Kibana view of DVID performance analysis](/img/dvid-kibana-example.png)

DVID is written in Go and supports different storage backends, a REST HTTP API,
and command-line access (likely minimized in near future).  Some components written in 
C, e.g., storage engines like Leveldb and fast codecs like lz4, are embedded or linked as a library.

DVID has been tested on MacOS X, Linux (Fedora 16, CentOS 6, Ubuntu), and 
[Windows 10+ Bash Shell](https://msdn.microsoft.com/en-us/commandline/wsl/about).  It comes out-of-the-box with an embedded leveldb for storage although you can configure other storage backends.

A [web console](https://github.com/janelia-flyem/dvid-console) is available to browse the repositories and view the DAG, logs, and data instances.

Command-line and HTTP API documentation can be 
found in [help constants within packages](https://github.com/janelia-flyem/dvid/blob/master/datatype/labelvol/labelvol.go#L34) or by visiting the **/api/help**
HTTP endpoint on a running DVID server.

