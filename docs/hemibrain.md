---
id: hemibrain
title: The Dataset
---

The Hemibrain dataset, released in January 2020, was managed by DVID for most of its
production. We are providing a replica of our production DVID system and the
databases, complete save for some irrelevant data for outside use.  The downloads
are available through Google Cloud Storage using the [gsutil tool](https://cloud.google.com/storage/docs/gsutil).

gs://hemibrain-release

Subdirectories include:
* neuprint
* dvid-grayscale (very small because data is kept on the cloud)

gs://hemibrain-dvid-segmentation

Subdirectories include:
* databases
* dvid

We recommend using the `-m` option as in this example of downloading the `DVID + grayscale`
package:

```
% gsutil -m cp -R gs://hemibrain-dvid-release/dvid-grayscale .
```
