import type { IPFSHTTPClient, Options } from 'ipfs-http-client/types/src/types';

let ipfsClient: IPFSHTTPClient;
const getIpfsClient = async (options?: Options) => {
    if (!ipfsClient) {
        const { create } = await import('ipfs-http-client');
        ipfsClient = create(options);
    }

    return ipfsClient;
};

export  {getIpfsClient};
