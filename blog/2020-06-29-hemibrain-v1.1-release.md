---
id: release-v1.1
title: FlyEM Hemibrain V1.1 Release
author: Bill Katz
author_title: Senior Engineer @ Janelia Research Campus
author_url: https://www.janelia.org/people/william-katz
author_image_url: https://avatars0.githubusercontent.com/u/185?s=400&v=4
tags: [hemibrain, downloads, release]
---

Version 1.1 of the Hemibrain dataset has been released.  We suggest you familiarize yourself with
the dataset and tools to access it through the initial discussion in our ![previous V1.0 release post](/blog/release).
This post provides updated links and descriptions.

### neuPrint

The [neuPrint Hemibrain website](https://neuprint.janelia.org) should be most visitors' first stop, and it has been
updated with the V1.1 data and sports enhancements since last January.

### Downloads

From the 26+ TB of data, we can generate [a compact (45.5 MB) data model](https://storage.cloud.google.com/hemibrain/v1.1/exported-traced-adjacencies-v1.1.tar.gz) containing the following:

* Table of the neuron IDs, types, and instance names.
* Neuron-neuron connection table with synapse count between each pair.
* Same as above but each connection pair is split by ROI in which the synapses reside.

You can [download all the data injected into neuPrint](https://storage.cloud.google.com/hemibrain-release/neuprint/hemibrain_v1.1_neo4j_inputs.zip) (excluding the 3D data and skeletons) in CSV format.

*Pending* ... The skeletons of the 21,663 traced neurons are [available as a tar file]().  Included is a CSV
file `traced-neurons.csv` listing the *instance* and *type* of each traced body ID.

### Neuroglancer Precomputed Data

Here's a [link to viewing
the v1.1 dataset directly in your browser](https://neuroglancer-demo.appspot.com/#!gs://flyem-views/hemibrain/v1.1/base.json) with
[Google's Neuroglancer web app](https://github.com/google/neuroglancer).

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

To parse the data, use one of the software libraries below or you'll have to write software to parse data using the format specification linked above.

#### Available data:

- EM data
  - Original aligned stack (at original 8x8x8nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/emdata/raw/jpeg`
    JPEG format
  - CLAHE applied over YZ cross sections (at original 8x8x8nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/emdata/clahe_yz/jpeg`
    JPEG format
- Segmentation
  - Volumetric segmentation labels (at original 8x8x8nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/v1.1/segmentation`
    Neuroglancer compressed segmentation format
- ROIs
  - Volumetric ROI labels (at 16x16x16nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/v1.1/rois`
    Neuroglancer compressed segmentation format
- Synapse detections
  - Indexed spatially and by pre-synaptic and post-synaptic cell id
    `gs://neuroglancer-janelia-flyem-hemibrain/v1.1/synapses`
    Neuroglancer annotation format
- Tissue type classifications
  - Volumetric labels (at original 16x16x16nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/mask_normalized_round6`
    Neuroglancer compressed segmentation format
- Mitochondria detections
  - Volumetric labels (at original 16x16x16nm resolution, as well as downsamplings)
    `gs://neuroglancer-janelia-flyem-hemibrain/mito_20190717.27250582`
    Neuroglancer compressed segmentation format

#### Tensorstore

Earlier this year, Google released a new library for efficiently reading and writing large multi-dimensional
arrays.  At this time, there are C++ and python APIs.  An example of [reading the hemibrain
segmentation](https://google.github.io/tensorstore/python/tutorial.html#reading-the-janelia-flyem-hemibrain-dataset) is
in the Tensorstore documentation.

#### CloudVolume

The Seung Lab's [CloudVolume](https://github.com/seung-lab/cloud-volume) python client
allows you to programmatically access Neuroglancer Precomputed data.  CloudVolume currently handles Precomputed images (sharded and unsharded), skeletons (sharded and unsharded) and meshes (unsharded legacy format only). It doesn't handle annotations at the moment, which are usually handled by whatever proofreading system a given lab uses.

### Full Datasets with DVID

For those users who want to download and forge ahead on their own copy of our reconstruction data,
you can download a replica of our production DVID system and the full Hemibrain databases.  

You can quickly download a relatively small DVID executable which then
allows access to grayscale data stored in the cloud, both in JPEG and raw format.  All other data can
be downloaded by type (e.g., synapses, ROIs, segmentation, etc.) so you can choose what you need.

Please refer to the [Hemibrain DVID release page](/docs/hemibrain) for download information.  This is
currently the v1.0 data but will be updated to the v1.1 data shortly.

Please [drop us a note](https://www.janelia.org/people/william-katz) 
if you are running your own fork so we can keep you apprised of continuing work, documentation,
and opportunities to push back your changes to the public server.

#### NeuTu

NeuTu is a proofreading workhorse for the FlyEM team and can be used to proofread with DVID.  It allows users to observe
segmentation and to split or merge bodies if necessary.  It also permits annotation,
ROI creation, and many other features.  Please [visit this NeuTu documentation page](https://janelia-flyem.gitbook.io/neutu/get-started/eager-to-try-something-cool) for how to 
setup DVID with the Hemibrain dataset as described below.
