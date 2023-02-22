const logoGlob = import.meta.glob('../../public/maps/logo-*.webp', {
    eager: true,
    import: 'default',
});

const mapLogos = Object.fromEntries(
    Object.entries(logoGlob).map(([key, val]) => {
        const { mapName } = key.match(/(.*)logo-(?<mapName>.*)\.webp/).groups;
        return [mapName, val];
    }),
);

export function getMapLogo(map) {
    return mapLogos[map];
}
