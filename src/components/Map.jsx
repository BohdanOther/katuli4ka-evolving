import { For } from 'solid-js';
import { MapArea } from './MapArea';
import { getMapPositions, getMapLogo, getMapMetadata } from '../utils';

/**
 * Ancient, Nuke...
 */
export function Map({ map }) {
    const logo = getMapLogo(map);
    const meta = getMapMetadata(map);
    const positionList = getMapPositions(map);

    return (
        <div>
            <h2 class="map-name">
                <img src={logo} />
                {map}
            </h2>
            <ul class="map-areas">
                <For each={positionList}>
                    {position => (
                        <li>
                            <MapArea name={position.name} meta={meta} positions={position.list} />
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
}
