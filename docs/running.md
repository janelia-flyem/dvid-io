---
id: running
title: Running DVID
---

Once the [configuration file is set](docs/configuring), you can run DVID using this command:

    % dvid serve /path/to/config.toml

This will start DVID and have it listen on the specified HTTP and RPC ports.  If the `httpAddress` was `:8000`, you can point your web browser to `localhost:8000` and see whatever web app was specified in the `webClient` path.

When using DVID for non-trivial reasons, we suggest using the following command:

    % nohup dvid serve /path/to/config.toml >> /path/to/dvid.log &

Several points can be made about the above server startup command:

* You can use "nohup" to manually start the server but it continues even if the admin user logs out.  The serve command can also be added as a service if you want automatic startup.
* The standard output and error for the serve command is appended to the log file that we also have in our config.toml.  We do this so any stack dump or error is in somewhat the same order as our other time-stamped logging.
* Note that we try to send logging data to a different drive system than those used for the storage engines themselves.  This will decrease contention on drives between logging and actual database requests.
* Once your database gets large enough, you might have to increase the number of open files allowed on your system.  Please see [Server Tuning](/docs/tuning) on how to set the maximum number of files.
