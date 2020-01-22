---
id: tuning
title: Server Tuning
---

### Server tuning for big data (optional but recommended)

Particularly when using leveldb variants, we recommend modifying default "max open files" and
also avoiding extra disk head seeks by turning off *noatime*, which records the last accessed
time for all files.  See [this explanation on the basho page](http://docs.basho.com/riak/latest/ops/advanced/backends/leveldb/#Tuning-LevelDB)

First, make sure you allow a sufficient number of open files.  This can be checked via the 
"ulimit -n" command in Linux and Mac.  We suggest raising this to 65535 on Linux and at least
8192 on a Mac.  Please see [this page for setting ulimit on Mac](https://unix.stackexchange.com/questions/108174/how-to-persist-ulimit-settings-in-macos) or simply include a ulimit command in the `.bashrc` and starting a new terminal.  You might have to modify the
(1024 has proven sufficient for Teravoxel repos on 64-bit Linux using standard leveldb but 
this had to be raised to several thousand even for 50 Gigavoxel repos on Mac.)

    % ulimit -n 65535

You can also set max file open limits for a dvid-specific user [by editing appropriate sys files](http://tuxgen.blogspot.com/2014/01/centosrhel-ulimit-and-maximum-number-of.html) and [here's a way
to do this in ubuntu](http://posidev.com/blog/2009/06/04/set-ulimit-parameters-on-ubuntu/).

Second, disable access-time updates for the mount with your DVID data.  In Linux, you can
add the *noatime* mounting option to /etc/fstab for the partition holding your data.
The line for the mount holding your DVID data should like something like this:

    /dev/mapper/vg0-lv_data    /dvid/data     xfs      noatime,nobarrier     1 2

Then remount the disk:

    % mount /dvid/data -o remount