import { actionOrder, nadeMeta, nadeTypes } from '../const';

export { getMapLogo } from './getMapLogo';
export { getMapMetadata } from './getMapMetadata';
export { getMapList, getMapPositions } from './getMapFiles';

/**
 * example: b-long-sm -> Long Smoke
 */
export function parseNadeName(name) {
    const tokens = name.split('-');
    const nadeTarget = tokens[1];
    const nadeType = nadeTypes[tokens[2]] || tokens[2];

    return nadeTarget + ' ' + nadeType;
}

export function getNadeMeta(m) {
    return nadeMeta[m] ?? m;
}

export function sortActions(actions) {
    const getWeight = t => {
        const act = t[0];
        return actionOrder[act] ?? 100;
    };

    return actions.sort((a, b) => getWeight(a) - getWeight(b));
}
