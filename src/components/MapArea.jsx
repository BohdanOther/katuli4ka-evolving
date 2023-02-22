import { For } from 'solid-js';
import { Nade } from './Nade';

/**
 * A site, B site or Middle...
 */
export function MapArea({ name, meta, positions }) {
    return (
        <div class="map-area">
            <h4 class="map-area-name">{name}</h4>
            <ul>
                <For each={Object.entries(positions)}>
                    {([nade, actions]) => (
                        <Nade name={nade} actions={actions} meta={meta?.[nade]} />
                    )}
                </For>
            </ul>
        </div>
    );
}
