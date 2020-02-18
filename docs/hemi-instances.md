---
id: hemi-instances
title: Data Instances
---

The Hemibrain databases include many data instances necessary for the FlyEM Team's reconstruction
of the dataset.  The most useful data are described below.  To interact with a data instance through
the HTTP API, look at its documentation by either clicking on its label type in the DVID console or
using a URL like [http://localhost:8000/api/help/labelmap](http://localhost:8000/api/help/labelmap) 
where `localhost:8000` is the main DVID server and `labelmap` is the data type of the instance you 
are trying to query.

|Data Instance|Data Type|Description|
|-------------|---------|-----------|
|bookmark_annotations     |  annotation  |  |
|segmentation_todo        |  annotation  |  |
|synapses                 |  annotation  | The synapse data organized spatially, by tag, and by label. |
|bookmarks                |  keyvalue  |  |
|roi_data                 |  keyvalue  |  |
|rois                     |  keyvalue  |  |
|roisSmoothedDecimated    |  keyvalue  | Key = ROI name.Value = Smoothed, decimated ROI surface mesh. |
|segmentation_annotations |  keyvalue  | See Note 1. |
|segmentation_meshes      |  keyvalue  | Key = label ID + ".ngmesh". Value = Neuroglancer mesh. |
|segmentation_skeletons   |  keyvalue  | Key = label ID + "_swc".  Value = SWC file. |
|mito_20190501.24734943   |  labelmap  |  |
|segmentation             |  labelmap  | The supervoxel and agglomerated label of every voxel. |
|segmentation_roi_voxels  |  labelmap  | See Note 2. |
|voxel-classes            |  labelmap  |  |
|synapses_labelsz         |  labelsz   | See Note 3. |
|AB(L) to vACA(R)         |  roi       | Each ROI is composed of run-length encoded spans of 32^3 voxel blocks.|

Notes:

1. Labeled neurons can have a number of properties like class/instance (name is deprecated), status, and comment.
2. Each voxel in `segmentation_roi_voxels` has a label corresponding to its position in a list of ROIs, 
where the label 1 is for `AB(L)`, label 2 is for `AB(R)`, etc.  The list of ROIs: `["AB(L)", "AB(R)", "AL(L)", "AL(R)", "AME(R)", "AOTU(R)", "ATL(L)", "ATL(R)", "AVLP(R)", "BU(L)", "BU(R)", "CA(L)", "CA(R)", "CAN(R)", "CRE(L)", "CRE(R)", "EB", "EPA(L)", "EPA(R)", "FB", "FLA(R)", "GNG", "GOR(L)", "GOR(R)", "IB", "ICL(L)", "ICL(R)", "IPS(R)", "LAL(L)", "LAL(R)", "LH(R)", "LO(R)", "LOP(R)", "ME(R)", "NO", "PB", "PED(R)", "PLP(R)", "PRW", "PVLP(R)", "SAD", "SCL(L)", "SCL(R)", "SIP(L)", "SIP(R)", "SLP(R)", "SMP(L)", "SMP(R)", "SPS(L)", "SPS(R)", "VES(L)", "VES(R)", "WED(R)", "a'L(L)", "a'L(R)", "aL(L)", "aL(R)", "b'L(L)", "b'L(R)", "bL(L)", "bL(R)", "gL(L)", "gL(R)"]`.
3. Index of labels sorted by number of synapses by type: `PostSyn` (post-synaptic), `PreSyn` (pre-synaptic), etc.