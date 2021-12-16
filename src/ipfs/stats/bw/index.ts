// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BWOptions, BWResult } from 'ipfs-core-types/src/stats';

import { getIpfsClient } from '../../core/client';

type BandwidthData = BWResult & {
    date: Date;
};
const noData: BWResult = {
    totalIn: BigInt(0),
    totalOut: BigInt(0),
    rateIn: 0,
    rateOut: 0,
};

async function* ipfsStatsBw(options?: BWOptions): AsyncIterable<BandwidthData> {
    console.log('inside ipfsStatsBw');
    const ipfs = await getIpfsClient();

    const iterator = ipfs.stats.bw(options)[Symbol.asyncIterator]();

    let next = await iterator.next();

    while (!next.done) {
        try {
            yield { ...next.value, date: new Date() };
            next = await iterator.next();
        } catch (err) {
            yield { ...noData, date: new Date() };
        }
    }
}

export type { BandwidthData };
export { ipfsStatsBw };
