import { createSignal, For } from 'solid-js';
import { sortActions, getNadeMeta, parseNadeName } from '../utils';

function NadeImage(props) {
    return (
        <div class="nade-img" onClick={props.onClick}>
            <img src={props.src} alt={props.alt} classList={{ active: props.active }} />
            <span class="nade-img-meta">{props.alt}</span>
        </div>
    );
}

/**
 * Smoke, flash...
 */
export function Nade({ name, actions, meta = {} }) {
    const [expanded, setExpanded] = createSignal(false);
    const [active, setActive] = createSignal('');

    const sortedActions = sortActions(actions);

    const toggleExpanded = () => setExpanded(t => !t);

    const handleNadeClick = actName => {
        if (active() === actName) {
            setActive('');
        } else {
            setActive(actName);
        }
    };

    return (
        <li class="nade">
            <p
                class="nade-name"
                classList={{ 'nade-name-active': expanded() }}
                onClick={toggleExpanded}
            >
                {parseNadeName(name)}
                {meta.type && <span class="nade-name-meta"> ({meta.type})</span>}
            </p>
            {expanded() && (
                <div class="nade-actions">
                    <For each={sortedActions}>
                        {([actName, actImg]) => (
                            <NadeImage
                                src={actImg}
                                alt={meta[actName] ?? getNadeMeta(actName)}
                                active={active() === actName}
                                onClick={[handleNadeClick, actName]}
                            />
                        )}
                    </For>
                </div>
            )}
        </li>
    );
}
