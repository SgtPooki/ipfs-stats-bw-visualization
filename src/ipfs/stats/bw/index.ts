// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BWOptions, BWResult } from 'ipfs-core-types/src/stats';

import { getIpfsClient } from '../../core/client';

async function* ipfsStatsBw(options?: BWOptions): AsyncIterable<BWResult> {
    const ipfs = await getIpfsClient();

    for await (const stats of ipfs.stats.bw(options)) {
        yield stats;
    }
}

export { ipfsStatsBw };
