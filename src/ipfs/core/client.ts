import type {
    IPFSHTTPClient,
    Options as IpfsClientOptions,
} from 'ipfs-http-client/types/src/types';

type UrlProtocols = 'http' | 'https';
type UrlString = `${UrlProtocols}://${string}`;

const defaultClientOptions: IpfsClientOptions = {
    url: 'http://localhost:5001/api/v0',
    protocol: 'http',
    host: 'localhost',
    port: 5001,
    // path: 'api/v0', // says it's not supported, even though it's documented at https://www.npmjs.com/package/ipfs-http-client#user-content-usage as of 2021 DEC 15
    // agent: http.Agent({ keepAlive: true, maxSockets: 6 }), // node only
};

let ipfsClient: IPFSHTTPClient;
const getIpfsClient = async (
    options: IpfsClientOptions | UrlString = defaultClientOptions,
): Promise<IPFSHTTPClient> => {
    if (!ipfsClient) {
        const { create } = await import('ipfs-http-client');
        ipfsClient = create(options);
    }

    return ipfsClient;
};

export { getIpfsClient };
