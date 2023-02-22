const relPath = '../../public/maps/';
const mapFiles = {};

const raw = import.meta.glob('../../public/maps/**/*.png', { eager: true, import: 'default' });

for (const path in raw) {
    const [map, area, nade] = path.slice(relPath.length).split('/');

    if (!mapFiles[map]) {
        mapFiles[map] = {};
    }

    if (!mapFiles[map][area]) {
        mapFiles[map][area] = {};
    }

    mapFiles[map][area][nade.slice(0, -4)] = raw[path];
}

export function getMapList() {
    return Object.keys(mapFiles);
}

function groupPositions(positions) {
    const positionList = Object.keys(positions);

    if (!Array.isArray(positionList)) {
        return {};
    }

    return positionList.reduce((acc, item) => {
        const tokens = item.split('-');
        const position = tokens.slice(0, 3).join('-');
        const actionName = tokens.slice(3).join('-') || 'result';

        if (!acc[position]) {
            acc[position] = [];
        }

        acc[position].push([actionName, positions[item]]);

        return acc;
    }, {});
}

export function getMapPositions(map) {
    const posMap = mapFiles[map];
    const sortedPositions = Object.keys(posMap).sort((a, b) => a.localeCompare(b));
    return sortedPositions.map(p => ({ name: p, list: groupPositions(posMap[p]) }));
}
