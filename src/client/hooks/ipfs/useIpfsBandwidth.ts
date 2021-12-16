import { useEffect, useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';

import type { BWOptions } from 'ipfs-core-types/src/stats';

import { BandwidthData, ipfsStatsBw } from '../../../ipfs/stats/bw';
import { Observable } from '../../hof/observable';

const defaultBwStatsOptions: BWOptions = {
    // peer: '',
    // proto: 'http',
    poll: false,
    // interval: '5s',
};

async function getBwObservable(): Promise<Observable<BandwidthData>> {
    const bwStats = await ipfsStatsBw({ poll: false });

    const item = bwStats[Symbol.asyncIterator]();

    const next = await item.next();

    return new Observable(next.value);
}

function useIpfsBandwidth(
    bwStatsOptions = defaultBwStatsOptions,
): BandwidthData | undefined {
    // const m_getBwObservable = React.useMemo(getBwObservable, [bwStatsOptions]);
    const bwStatsObservable = useAsync(getBwObservable, [bwStatsOptions]);
    const [bwStats, setBwStats] = useState(bwStatsObservable.result?.get());

    useEffect(() => {
        return bwStatsObservable.result?.subscribe(setBwStats);
    }, [bwStatsObservable.result]);

    const bwStatsIterable = useMemo(
        () => ipfsStatsBw(bwStatsOptions),
        [bwStatsOptions],
    );

    useMemo(async () => {
        for await (const stats of bwStatsIterable) {
            bwStatsObservable.result?.set(stats);
        }
    }, [bwStatsObservable, bwStatsIterable]);

    return bwStats;
}

export { useIpfsBandwidth };
