---
id: configuring
title: Configuring DVID
---

Before running DVID, you can specify the various ports, storage backends, email notification address and mail server in case of crashes, and other run-time options.

DVID configuration is specified in a [TOML](https://github.com/toml-lang/toml) file.  It's an easily readable configuration format that maps unambiguously to a hash table.  There are [simple](https://github.com/janelia-flyem/dvid/blob/master/scripts/distro-files/config-simple.toml) and [more complex](https://github.com/janelia-flyem/dvid/blob/master/scripts/distro-files/config-full.toml) example configuration files within the DVID source code repository.

A filled-in example might look like this:

    [server]
    httpAddress = "localhost:8000"
    rpcAddress = "localhost:8001"
    webClient = "/path/to/webclient"
    
    # to return Timing-Allow-Origin headers in response
    # allowTiming = true

    # How new data instance ids are generated.
    # Is one of "random" or "sequential".  If "sequential" can set "start_instance_id" property.
    # Use of "random" is a cheap way to have multiple frontend DVIDs use a shared store without
    # key collisions.
    instance_id_gen = "sequential"
    instance_id_start = 100  # new ids start at least from this.

    # Email server to use for notifications and server issuing email-based authorization tokens.
    [email]
    notify = ["foo@someplace.edu"] # Who to send email in case of panic
    username = 
    password = 
    server = 
    port = 25

    [logging]
    logfile = "/demo/logs/dvid.log"
    max_log_size = 500 # MB
    max_log_age = 30   # days

    # Backends can be specified in three ways:
    #
    # backend.default  = default storage engine if not otherwise specified
    # backend.metadata = store to use for metadata
    # backend.<datatype> = store to use for the given "datatype"
    # backend."<name>:<uuid>" = store to use for a particular data instance, 
    #   where uuid is the full UUID of the repo's root.
    #
    # If no backend is specified, DVID will return an error unless there is only
    # one store, which will automatically be backend.default.

    [backend]
        [backend.default]
        store = "raid6"

        [backend.labelmap]
        store = "ssd"

        [backend."grayscale:99ef22cd85f143f58a623bd22aad0ef7]
        store = "imaging"

    
    # List the different storage systems available for metadata, data instances, etc.
    # Any nickname can be used for a backend.  In this case, it's "raid6" to reflect
    # that the directory is on a RAID-6 drive system, "ssd" for a directory mounted on
    # a SSD, and "kvautobus" for an internal Janelia HTTP dataservice.  Note that all
    # store properties like "engine" and "path" should be lower-case by convention.

    [store]
        [store.raid6]
        engine = "basholeveldb"
        path = "/data/dbs/basholeveldb"
 
        [store.ssd]
        engine = "basholeveldb"
        path = "/datassd/dbs/basholeveldb"
 
        [store.imaging]
        engine = "badger"
        path = "/datassd/dbs/imaging-db"

The only required configuration is the `[store]` section.  In particular, you must specify at least one store.  If you specify more than one store, you must also include the `[backend]` section and set a `[backend.default]` to the default store.

The `[server]` section allows you to set the RPC and HTTP ports as well as the path to a web app that comes up when you point a web browser to the root HTTP address.  The `httpAddress` option allows for binding to unique IP addresses. This is crucial for hosting on cloud services such as AWS.  Note that some port addresses could be protected on your machine, so if you have trouble getting `http://myserver:port/api/help` in your web browser, try a different (particularly larger) port.  The defaults port 8000 (http) and 8001 (rpc) work well.

The `webClient` property is a path to static website code for DVID administration, etc.  We suggest you download the [dvid console](https://github.com/janelia-flyem/dvid-console) project and set the `webClient` path to its location.  The stock dvid console lets you browse data repos and provides nice graphical representations of the data versions.

If you've configured the `[email]` section and there is a catchable panic, the DVID server will try to email an admin and continue on.  Here's an example email you'll hopefully never receive but could be useful during debugging new features:

    Subject: DVID panic report
    Date: Friday, July 17, 2015 at 3:19:06 PM Eastern Daylight Time From: admin@foo.org
    To: DVID admin
    
    Panic detected on request c06u27.int.janelia.org/67bmYZ78V0-10888375: runtime error: index out of range
    IP: 10.8.1.45:64608, URL: /api/node/ee7dc/annotations/keyrange/0
    Stack trace:
    goroutine 17099711 [running]: github.com/janelia-flyem/dvid/server.func·005()
    /groups/flyem/home/katzw/work/go/src/github.com/janelia-flyem/dvid/server/web.go:399 +0xd6 github.com/janelia-flyem/dvid/datatype/keyvalue.(*Data).ServeHTTP(0xc2081dc648, 0xc2081a1760, 0x20, 0xc215091788, 0x7f2504847080, 0xc2082904b0, 0xc20bd41110)
    /groups/flyem/home/katzw/work/go/src/github.com/janelia- flyem/dvid/datatype/keyvalue/keyvalue.go:430 +0x2143 github.com/janelia-flyem/dvid/server.func·009(0x7f2504847080, 0xc2082904b0, 0xc20bd41110)
    /groups/flyem/home/katzw/work/go/src/github.com/janelia-flyem/dvid/server/web.go:536 +0x649 net/http.HandlerFunc.ServeHTTP(0xc2243fda00, 0x7f2504847080, 0xc2082904b0, 0xc20bd41110)
    ...
    created by net/http.(*Server).Serve
    /opt/buildem/src/golang-1.4.2/src/net/http/server.go:1751 +0x35e
    
    Sincerely,
    DVID at c06u27.int.janelia.org
