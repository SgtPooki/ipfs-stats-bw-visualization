import type { BWOptions } from 'ipfs-core-types/src/stats';

import { ipfsStatsBw } from '../../../ipfs/stats/bw';

import { create } from 'ipfs-http-client';
// import { BandwidthLogger } from '../test';
// import { ipfsStatsBw } from './ipfs/stats/bw'


const bwStatsOptions: BWOptions = {
    poll: true,
    // interval: 1000s,
};

function BandwidthLogger() {
    (async () => {
        for await (const stats of ipfsStatsBw(bwStatsOptions)) {
            console.log(stats);
        }
    })();

    return <span>Logging</span>;
}

export { BandwidthLogger };
