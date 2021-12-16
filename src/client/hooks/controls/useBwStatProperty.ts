import { useEffect, useState } from 'react';

import { BWResult } from 'ipfs-core-types/src/stats';

import { Observable } from '../../hof/observable';

// type BwStatPropertyOption = 'rateIn' | 'rateOut';

// const options: BwStatPropertyOption[] = [
const options = [
    // 'totalIn', // @todo: add support for bigint
    // 'totalOut', // @todo: add support for bigint
    'rateIn',
    'rateOut',
];

type BwStatPropertyOption = typeof options[number];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const defaultOption: typeof options[number] = 'rateIn';

const globalHookId = 'global';
// const propertySelection = ;
const bwStatPropertyObservables = new Map<
    string,
    Observable<BwStatPropertyOption>
>();

type useBwStatPropertyResponse = {
    property: BwStatPropertyOption;
    options: typeof options;
    updateProperty: (newValue: BwStatPropertyOption) => void;
};

/**
 * This hook shares the property value by default, via the globalHookId of 'global'.
 *
 * If you want a different instance, you need to pass a unique id.
 */
function useBwStatProperty(
    instanceId = globalHookId,
): useBwStatPropertyResponse {
    if (!bwStatPropertyObservables.has(instanceId)) {
        bwStatPropertyObservables.set(
            instanceId,
            new Observable(defaultOption),
        );
    }
    // guard clause above
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const propertySelection = bwStatPropertyObservables.get(instanceId)!;

    const [property, setProperty] = useState(propertySelection.get());

    useEffect(() => {
        return propertySelection.subscribe(setProperty);
    }, [propertySelection]);

    const updateProperty = (newValue: BwStatPropertyOption) =>
        propertySelection.set(newValue);

    return {
        property,
        options,
        updateProperty,
    };
}

export type { BwStatPropertyOption };
export { useBwStatProperty };
