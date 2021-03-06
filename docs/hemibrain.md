---
id: hemibrain
title: The Dataset
---

The Hemibrain dataset, initially released in January 2020, was managed by DVID for most of its
production. We can provide a replica of our production DVID system and the
databases, complete save for some irrelevant data for outside use.  Due to 
the large download sizes and our changing the underlying system, we suggest using
[neuPrint and the variety of software libraries explained in our Hemibrain release
blog entry](http://dvid.io/blog/release-v1.2) unless you need additional data or 
versions not present in the analysis-oriented formats.

The following descriptions are from the original Hemibrain v1.0 release.  
Please [drop us a note](https://www.janelia.org/people/william-katz) if you would like access to the
updated V1.2 DVID dataset.

## The grayscale image volume

The [grayscale data is available through your own local DVID server](https://storage.cloud.google.com/hemibrain-release/hemibrain-grayscale.tar.bz2)
(165 MB) with data storage provided by Google-owned cloud storage (`gs://hemibrain-raw-grayscale`).  Both raw and 3D JPEG grayscale data are available in that Google Cloud Storage bucket.
Just follow the README instructions after unpacking the downloaded tarball.

## All other reconstruction data

While the above grayscale server uses data in the cloud, our production
DVID server for reconstruction requires a reasonably powerful server
(depending on the anticipated user load) and a slightly more involved installation process.
First, you'll have to download the DVID system (identical to the above grayscale
download save a different TOML configuration file).
Then, you'll have to download databases to local disks before starting the server.

### Step 1: Download the DVID system

First, download the [DVID packaged tarball file](https://storage.cloud.google.com/hemibrain-dvid-segmentation/hemibrain-dvid.tar.bz2)
(168 MB, preconfigured for this dataset) and untar it:

```bash
% tar xjvf hemibrain-dvid.tar.bz2
```

If you download through the browser, it's possible it will automatically uncompress the file and
you'll already have a `tar` file without the `bz2` extension.  When untarring the file, you may
get `Ignoring unknown extended header keyword` errors if you are on Ubuntu.  That's OK and is just extra
Mac tar file data that can be ignored.

Within the untarred directory `hemibrain-dvid` is a configuration file 
`hemibrain-release.toml`.  This configuration assumes you are
downloading the databases to a sibling directory `databases` like
the following directory structure:
```
/mydir
    /databases
    /hemibrain-dvid (directory containing the untarred dvid release)
    hemibrain-dvid.tar.bz2
```

If you choose to store the databases at different locations, edit
`hemibrain-release.toml` to point to the appropriate directories.  This
will also allow you to distribute the databases to different disk drives.
We recommend using [NVMe SSD drives](https://www.enterprisestorageforum.com/storage-hardware/nvme-5-key-facts-about-nonvolatile-memory-express.html) 
due to their exceptional performance.

If you are also running a grayscale dvid server, you must change the ports
on either that one or this dvid server since both are by default using ports
8000 and 8001.  For example, change the grayscale dvid server TOML file to
use ports 9000 and 9001 then restart that server.  You will then be able 
to access the grayscale image volume on port 9000 and all the other
reconstruction data on port 8000.

### Step 2: Download the databases that you need

Our original databases have data at 50+ timepoints, but for this release, we've reduced the
data to three versions: one of the earliest versions in 2018, an intermediate version
after revising the synapses, and the final version published as
part of our Hemibrain release.  This brings down the size of the databases to 1.2 TB.
You can choose which of the databases you'd like to download (segmentation,
other labelmaps, synapses, meshes, etc).  If you choose not to download a database, the
data from that database won't be available but the DVID system will still work.

The databases are available in the following Google Cloud Storage bucket:
gs://hemibrain-dvid-segmentation/databases

We suggest using the Google gsutil tool:
https://cloud.google.com/storage/docs/gsutil

Create a `databases` directory that is a sibling of the untarred DVID package,
then download the databases you want.  The following commands assume you are in
the directory you downloaded the DVID packaged tarball file.

```bash
% mkdir databases   # should be sibling of the untarred hemibrain-dvid directory
% gsutil -m cp -r gs://hemibrain-dvid-segmentation/databases/metadata databases
% gsutil -m cp -r gs://hemibrain-dvid-segmentation/databases/segmentation databases
% gsutil -m cp -r gs://hemibrain-dvid-segmentation/databases/mutlog databases
...
% chown -R me:mygroup databases  # makes sure you can actually write to those DBs
```

You are required to download the small "metadata" database but can choose some 
combination of the other databases.  The full dataset is comprised of the following
databases:

|Size|Database|Description|
|------|--------------|---|
|718 GB|   segmentation|Highly compressed supervoxel `uint64` ids per voxel|
|3.5 GB|   mutlog|Required if using segmentation. Supplies the supervoxel-to-label mappings|
|225 GB|   other-labelmaps|Mitochondria, ROIs, etc.|
|145 GB|   meshes | Neuroglancer format |
| 47 GB|   synapses| Pre- and post-synaptic annotations|
| 10 GB|   keyvalues| Similar to a versioned file system with JSON files, etc|
| 38 GB|   annotations| 3d point annotations like bookmarks|
|1.7 GB|   rois |Regions of Interest|

### Step 3: Run the server

From within the `hemibrain-dvid` directory, launch dvid using the appropriate
executable for your platform.

1) For Linux:

```bash
    % linux/bin/dvid serve hemibrain-release.toml
```

2) For Mac

```bash
    % mac/bin/dvid serve hemibrain-release.toml
```

If you are running macOS Cataline (10.15) or newer, Apple has [increased 
software protections that can lead to your being unable to run the program](https://developer.apple.com/news/?id=10032019a).

In order to workaround the problem, please execute the following
from the `hemibrain-dvid` directory:

```bash
% xattr -r -d com.apple.quarantine mac/lib mac/bin
```

If you are successful, the server will log messages to /tmp/hemibrain-release.log
or whatever directory is specified for logging in the hemibrain-release.toml
file in this directory.  You can modify that TOML file to configure
your server including the ports it runs on.  You can use the browser to 
inspect the dvid server using [http://localhost:8000](http://localhost:8000).

Other useful commands to try:

    % tail -f /tmp/hemibrain-release.log

    % <os>/bin/dvid about
    
    % <os>/bin/dvid help