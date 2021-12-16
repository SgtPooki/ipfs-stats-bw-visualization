const nodes: any[] = [];

const spawnNode = async () => {
    let Ctl: any;
    try {
        Ctl = await import('ipfsd-ctl');
    } catch (e) {
        console.log('could not import ipfsd-ctl');
        console.error(e);
        process.exit(1);
    }

    let ipfs: any;
    try {
        ipfs = await import('ipfs');
    } catch (e) {
        console.log('could not import ipfs');
        console.error(e);
        process.exit(2);
    }

    let ipfsHttpModule: any;
    try {
        ipfsHttpModule = await import('ipfs-http-client');
    } catch (e) {
        console.log('could not import ipfsHttpModule');
        console.error(e);
        process.exit(3);
    }

    return Ctl.createController({
        ipfsHttpModule,
        ipfsBin: ipfs.path(),
    });
    // const id = await ipfsd.api.id()

    // console.log(id)

    // await ipfsd.stop()
};
// Create common setup and teardown
const createCommon = () => ({
    // Do some setup common to all tests
    setup: async () => {
        // Use ipfsd-ctl or other to spawn an IPFS node for testing
        try {
            const node = await spawnNode();
            nodes.push(node);

            return node.api;
        } catch (e) {
            console.log('could not spawn node');
            console.error(e);
            process.exit(4);
        }
    },
    // Dispose of nodes created by the IPFS factory and any other teardown
    teardown: () => {
        return Promise.all(nodes.map((n) => n.stop()));
    },
});

try {
    import('interface-ipfs-core').then((tests) => {
        // tests.block(createCommon)
        // tests.config(createCommon)
        // tests.dag(createCommon)
        tests.repo(createCommon);
    });
} catch (e) {
    console.log('Could not run tests...');
    console.error(e);
    process.exit(255);
}

export {};
