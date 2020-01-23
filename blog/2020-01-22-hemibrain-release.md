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
*without* DVID, and end the post with why you might eventually want to use it.  The
full Hemibrain DVID dataset is just under two terabytes of data and was the central
database for the 50+ users during the reconstruction process.  (See [Data Management in Connectomics](https://www.janelia.org/project-team/flyem/blog/data-management-in-connectomics) for
a blog post on how we manage data.)

In addition to the grayscale image volume (34431 x 39743 x 41407 voxels), DVID managed
many versions of data throughout the connectome construction including:

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

The skeletons of the traced neurons are [available as a tar file](https://storage.cloud.google.com/hemibrain-release/skeletons.tar.bz2).  Included is a CSV
file `traced-neurons.csv` listing the *instance* and *type* of each traced body ID.

### Neuroglancer

Our great collaborators at Google have not only produced exceptional automatic neuron
segmentation to guide our proofreading, but the Neuroglancer web app has become
a fixture in the connectomics community.  Jeremy Maitin-Shepard has enhanced his
Neuroglancer tool for this Hemibrain data release.  Here's a [link to viewing
the dataset directly in your browser](http://hemibrain-dot-neuroglancer-demo.appspot.com/#!%7B%22dimensions%22:%7B%22x%22:%5B8e-9%2C%22m%22%5D%2C%22y%22:%5B8e-9%2C%22m%22%5D%2C%22z%22:%5B8e-9%2C%22m%22%5D%7D%2C%22position%22:%5B17114%2C20543%2C18610%5D%2C%22crossSectionScale%22:54.23751620061224%2C%22crossSectionDepth%22:-37.62185354999912%2C%22projectionScale%22:64770.91726975332%2C%22layers%22:%5B%7B%22type%22:%22image%22%2C%22source%22:%22precomputed://gs://neuroglancer-janelia-flyem-hemibrain/emdata/clahe_yz/jpeg%22%2C%22name%22:%22emdata%22%7D%2C%7B%22type%22:%22segmentation%22%2C%22source%22:%22precomputed://gs://neuroglancer-janelia-flyem-hemibrain/v1.0/segmentation%22%2C%22tab%22:%22segments%22%2C%22name%22:%22segmentation%22%7D%2C%7B%22type%22:%22segmentation%22%2C%22source%22:%7B%22url%22:%22precomputed://gs://neuroglancer-janelia-flyem-hemibrain/v1.0/rois%22%2C%22subsources%22:%7B%22default%22:true%2C%22properties%22:true%2C%22mesh%22:true%7D%2C%22enableDefaultSubsources%22:false%7D%2C%22tab%22:%22segments%22%2C%22pick%22:false%2C%22selectedAlpha%22:0%2C%22saturation%22:0%2C%22objectAlpha%22:0.8%2C%22ignoreNullVisibleSet%22:false%2C%22colorSeed%22:2685294016%2C%22meshSilhouetteRendering%22:3%2C%22name%22:%22roi%22%7D%2C%7B%22type%22:%22annotation%22%2C%22source%22:%22precomputed://gs://neuroglancer-janelia-flyem-hemibrain/v1.0/synapses%22%2C%22tab%22:%22rendering%22%2C%22shader%22:%22#uicontrol%20vec3%20preColor%20color%28default=%5C%22red%5C%22%29%5Cn#uicontrol%20vec3%20postColor%20color%28default=%5C%22blue%5C%22%29%5Cn#uicontrol%20float%20preConfidence%20slider%28min=0%2C%20max=1%2C%20default=0%29%5Cn#uicontrol%20float%20postConfidence%20slider%28min=0%2C%20max=1%2C%20default=0%29%5Cn%5Cnvoid%20main%28%29%20%7B%5Cn%20%20setColor%28defaultColor%28%29%29%3B%5Cn%20%20setEndpointMarkerColor%28%5Cn%20%20%20%20vec4%28preColor%2C%200.5%29%2C%5Cn%20%20%20%20vec4%28postColor%2C%200.5%29%29%3B%5Cn%20%20setEndpointMarkerSize%282.0%2C%202.0%29%3B%5Cn%20%20setLineWidth%282.0%29%3B%5Cn%20%20if%20%28prop_pre_synaptic_confidence%28%29%3C%20preConfidence%20%7C%7C%5Cn%20%20%20%20%20%20prop_post_synaptic_confidence%28%29%3C%20postConfidence%29%20discard%3B%5Cn%7D%5Cn%22%2C%22ignoreNullSegmentFilter%22:false%2C%22linkedSegmentationLayer%22:%7B%22pre_synaptic_cell%22:%22segmentation%22%2C%22post_synaptic_cell%22:%22segmentation%22%7D%2C%22filterBySegmentation%22:%5B%22post_synaptic_cell%22%2C%22pre_synaptic_cell%22%5D%2C%22name%22:%22synapse%22%7D%2C%7B%22type%22:%22segmentation%22%2C%22source%22:%22precomputed://gs://neuroglancer-janelia-flyem-hemibrain/mito_20190717.27250582%22%2C%22tab%22:%22segments%22%2C%22pick%22:false%2C%22selectedAlpha%22:0.82%2C%22name%22:%22mito%22%2C%22visible%22:false%7D%2C%7B%22type%22:%22segmentation%22%2C%22source%22:%22precomputed://gs://neuroglancer-janelia-flyem-hemibrain/mask_normalized_round6%22%2C%22tab%22:%22segments%22%2C%22pick%22:false%2C%22selectedAlpha%22:0.53%2C%22segments%22:%5B%222%22%5D%2C%22name%22:%22mask%22%2C%22visible%22:false%7D%5D%2C%22showSlices%22:false%2C%22selectedLayer%22:%7B%22layer%22:%22segmentation%22%2C%22visible%22:true%2C%22size%22:290%7D%2C%22layout%22:%22xy-3d%22%2C%22selection%22:null%7D).

The hemibrain EM data and proofread reconstruction is available at the
Google Cloud Storage bucket `gs://neuroglancer-janelia-flyem-hemibrain`
in the [Neuroglancer precomputed
format](https://github.com/google/neuroglancer/blob/master/src/neuroglancer/datasource/precomputed/README.md)
for interactive visualization with
[Neuroglancer](https://github.com/google/neuroglancer) and
programmatic access using libraries like
[Cloudvolume](https://github.com/seung-lab/cloud-volume) (see below). 
You can also download the data directly using the Google [gsutil](https://cloud.google.com/storage/docs/gsutil) tool (use the `-m` option, e.g., `gsutil -m cp -r gs:\\bucket mydir`
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

### CloudVolume

The Seung Lab's [CloudVolume](https://github.com/seung-lab/cloud-volume) python client
allows you to programmatically access Neuroglancer Precomputed data.  CloudVolume currently handles Precomputed images (sharded and unsharded), skeletons (sharded and unsharded) and meshes (unsharded legacy format only). It doesn't handle annotations at the moment, which are usually handled by whatever proofreading system a given lab uses.

### NeuTu

NeuTu is a proofreading workhorse for the FlyEM team.  It allows users to observe
segmentation and to split or merge bodies if necessary.  It also permits annotation,
ROI creation, and many other features.  Please [visit this NeuTu documentation page](https://janelia-flyem.gitbook.io/neutu/get-started/eager-to-try-something-cool) for how to 
setup DVID with the Hemibrain dataset as described below.

### Full Datasets with DVID

For those users who want to download their own copy of our data and forge ahead on their 
own branch of reconstruction, they can download a replica of our production DVID system 
and the full Hemibrain databases.  Because the amount of data approaches 2 TB, 
we've put the data into separate databases that can be selectively downloaded 
depending on your interests.  If you choose not to download a database, that particular 
data won't be available but the DVID system will still work.

Download links and documentation will be available within the next day or two.  Stay tuned
to this blog for updates.  And do [drop us a note](https://www.janelia.org/people/william-katz) 
if you plan to take this route so we can keep you apprised of continuing work on the DVID system.
