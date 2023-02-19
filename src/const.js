const nadeActions = {
    position: 'pos',
    farPosition: 'pos-far',
    alignment: 'algn',
    zoomedAlignment: 'algn-close',
    result: 'result',
};

export const nadeTypes = {
    sm: 'smoke',
};

export const nadeMeta = {
    [nadeActions.position]: 'Position',
    [nadeActions.farPosition]: 'Spot',
    [nadeActions.alignment]: 'Align',
    [nadeActions.zoomedAlignment]: 'Align (zoomed)',
    [nadeActions.result]: 'Result',
};

export const actionOrder = {
    [nadeActions.farPosition]: 0,
    [nadeActions.position]: 1,
    [nadeActions.alignment]: 2,
    [nadeActions.zoomedAlignment]: 3,
    [nadeActions.result]: 4,
};
