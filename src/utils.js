import { actionOrder, nadeMeta, nadeTypes } from './const';

export function groupPositions(positions) {
    const positionList = Object.keys(positions);

    const group = {};

    if (!Array.isArray(positionList)) {
        return group;
    }

    return positionList.reduce((acc, item) => {
        const tokens = item.split('-');
        const position = tokens.slice(0, 3).join('-');
        const action = tokens.slice(3).join('-');

        if (!acc[position]) {
            acc[position] = [];
        }

        acc[position].push([action || 'result', positions[item]]);

        return acc;
    }, group);
}

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

export function alphabeticalSort(a, b) {
    return a.localeCompare(b);
}

export function sortActions(actions) {
    const getWeight = t => {
        const act = t[0];
        return actionOrder[act] ?? 100;
    };

    return actions.sort((a, b) => getWeight(a) - getWeight(b));
}
