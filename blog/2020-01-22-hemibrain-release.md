---
id: release
title: FlyEM Hemibrain Release
author: Bill Katz
author_title: Senior Engineer @ Janelia Research Campus
author_url: https://www.janelia.org/people/william-katz
author_image_url: https://avatars0.githubusercontent.com/u/185?s=400&v=4
tags: [hemibrain, downloads, release]
---

Welcome to the opening of the dvid.io website and the [release of the Hemibrain dataset](https://www.janelia.org/project-team/flyem/hemibrain)!

For the first blog post, I'll oddly tell you all the ways you can access the dataset
*without* DVID, and end the post with how you can setup your own DVID installation.  The
full Hemibrain DVID dataset is composed of the grayscale image volume (34431 x 39743 x 41407 voxels 
kept in the cloud) with approximately another two terabytes of local data generated as
part of the reconstruction process.
(See [Data Management in Connectomics](https://www.janelia.org/project-team/flyem/blog/data-management-in-connectomics) 
for a blog post on how we manage data.)

DVID was the central database for 50+ users, managing many versions of data throughout
the connectome construction including:

* segmentation: supervoxel identifiers per voxel and their mapping to neuron body IDs
* regions of interest (ROIs) like the Mushroom Body
* meshes (ROIs, supervoxels, and neurons)
* neuron skeletons
* synapses and info to rapidly get synapse counts for any body
* cell/label information
* proofreader assignments for various protocols
* bookmarks (3d point annotations)
* various classifications of volume like mitochondria
* miscellaneous data stored in versioned files

Here's where DVID fits into the reconstruction workflow:
![DVID data management role in connectome reconstruction](/img/dvid-reconstruction-flow.png)

There's a lot of data and much of it may be irrelevant to a biologist trying to
understand the [Connectome of the Adult Drosophila Central Brain](https://www.biorxiv.org/content/10.1101/2020.01.21.911859v1).  For our research at Janelia, DVID ideally
fades into the background and most of what users see are connectomics-focused
applications like [neuPrint](https://www.biorxiv.org/content/10.1101/2020.01.16.909465v1),
[NeuTu](https://janelia-flyem.gitbook.io/neutu), and [Neuroglancer](https://github.com/google/neuroglancer),
which is actually embedded in other apps as well.  All these connectomics-focused apps
use DVID as a backend although Neuroglancer can use a number of backends and can be optimized for particular versions of data (like the Hemibrain dataset snapshot at its release) via 
its "precomputed" storage format.  

Let's briefly cover the various ways you can download or interact 
with the newly released data.

### neuPrint

The first obvious stop is the [neuPrint Hemibrain website](https://neuprint.janelia.org).
It's a nice web interface to query and visualize the released connectomics data without
having to download anything locally.

### Downloads

From the 26+ TB of data, we can generate [a compact (25 MB) data model](https://storage.googleapis.com/hemibrain/v1.0/conn_summary.tgz) containing the adjacency matrix.  We annotate brain region information for each connection to make the model richer.

You can [download all the data injected into neuPrint](https://storage.cloud.google.com/hemibrain-release/neuprint/hemibrain_v1.0_neo4j_inputs.zip) (excluding the 3D data and skeletons) in CSV format.

The skeletons of the 21,663 traced neurons are [available as a tar file](https://storage.cloud.google.com/hemibrain-release/skeletons.tar.gz).  Included is a CSV
file `traced-neurons.csv` listing the *instance* and *type* of each traced body ID.

### Neuroglancer

Our great collaborators at Google have not only produced exceptional automatic neuron
segmentation to guide our proofreading, but the Neuroglancer web app has become
a fixture in the connectomics community.  Jeremy Maitin-Shepard has enhanced his
Neuroglancer tool for this Hemibrain data release.  Here's a [link to viewing
the dataset directly in your browser](https://hemibrain-dot-neuroglancer-demo.appspot.com/#!gs://neuroglancer-janelia-flyem-hemibrain/v1.0/neuroglancer_demo_states/base.json).

The hemibrain EM data and proofread reconstruction is available at the
Google Cloud Storage bucket `gs://neuroglancer-janelia-flyem-hemibrain`
in the [Neuroglancer precomputed
format](https://github.com/google/neuroglancer/blob/master/src/neuroglancer/datasource/precomputed/README.md)
for interactive visualization with
[Neuroglancer](https://github.com/google/neuroglancer) and
programmatic access using libraries like
[Cloudvolume](https://github.com/seung-lab/cloud-volume) (see below). 
You can also download the data directly using the Google [gsutil](https://cloud.google.com/storage/docs/gsutil) tool (use the `-m` option, e.g., `gsutil -m cp -r gs://bucket mydir`
for bulk transfers).

Available data:

- EM data
  - Original aligned stack (at original 8x8x8nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/emdata/raw/jpeg`
    JPEG format
  - CLAHE applied over YZ cross sections (at original 8x8x8nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/emdata/clahe_yz/jpeg`
    JPEG format
- Segmentation
  - Volumetric segmentation labels (at original 8x8x8nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/v1.0/segmentation`
    Neuroglancer compressed segmentation format
- ROIs
  - Volumetric ROI labels (at 16x16x16nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/v1.0/rois`
    Neuroglancer compressed segmentation format
- Tissue type classifications
  - Volumetric labels (at original 16x16x16nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/mask_normalized_round6`
    Neuroglancer compressed segmentation format
- Mitochondria detections
  - Volumetric labels (at original 16x16x16nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/mito_20190717.27250582`
    Neuroglancer compressed segmentation format
- Synapse detections
  - Indexed spatially and by pre-synaptic and post-synaptic cell id
    `gs://neuroglancer-janelia-flyem-hemibrain/v1.0/synapses`
    Neuroglancer annotation format

### Tensorstore (Added 2020-04-03)

Google just released a new library for efficiently reading and writing large multi-dimensional
arrays.  At this time, there are C++ and python APIs.  An example of [reading the hemibrain
segmentation](https://google.github.io/tensorstore/python/tutorial.html#reading-the-janelia-flyem-hemibrain-dataset) is
in the Tensorstore documentation.

### CloudVolume

The Seung Lab's [CloudVolume](https://github.com/seung-lab/cloud-volume) python client
allows you to programmatically access Neuroglancer Precomputed data.  CloudVolume currently handles Precomputed images (sharded and unsharded), skeletons (sharded and unsharded) and meshes (unsharded legacy format only). It doesn't handle annotations at the moment, which are usually handled by whatever proofreading system a given lab uses.

### NeuTu

NeuTu is a proofreading workhorse for the FlyEM team.  It allows users to observe
segmentation and to split or merge bodies if necessary.  It also permits annotation,
ROI creation, and many other features.  Please [visit this NeuTu documentation page](https://janelia-flyem.gitbook.io/neutu/get-started/eager-to-try-something-cool) for how to 
setup DVID with the Hemibrain dataset as described below.

### Full Datasets with DVID

For those users who want to download and forge ahead on their own copy of our reconstruction data,
you can download a replica of our production DVID system and the full Hemibrain databases.  

_<Clarification added 2020-03-24>_ You can quickly download a relatively small DVID executable which then
allows access to grayscale data stored in the cloud, both in JPEG and raw format.  All other data can
be downloaded by type (e.g., synapses, ROIs, segmentation, etc.) so you can choose what you need.

Please refer to the [Hemibrain DVID release page](/docs/hemibrain) for download information.

We'll be updating the documentation on this website over time.  
Please [drop us a note](https://www.janelia.org/people/william-katz) 
if you are running your own fork so we can keep you apprised of continuing work, documentation,
and opportunities to push back your changes to the public server.
