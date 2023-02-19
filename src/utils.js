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

const nadeTypes = {
    sm: 'smoke',
};

export function parseNadeName(name) {
    const tokens = name.split('-');
    return tokens[1] + ' ' + nadeTypes[tokens[2]];
}
