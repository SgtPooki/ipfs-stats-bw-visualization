import { AbortOptions } from 'ipfs-core-types';

import { getIpfsNode } from '../core';

const getConfig = async (key: string, options?: AbortOptions) => {
    const ipfs = await getIpfsNode();
    const config = await ipfs.config.get(key, options);
    console.log(config);

    return config;
};

export { getConfig };
