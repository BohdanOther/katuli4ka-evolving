import metadata from '../../public/metadata.json';

export function getMapMetadata(map) {
    return metadata[map];
}
