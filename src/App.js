import { useState } from 'react';

import metadata from '../assets/metadata.json';

import './index.css';
import { sortActions, alphabeticalSort, getNadeMeta, groupPositions, parseNadeName } from './utils';

const files = require('../assets/maps/**/*.png');

function LazyImage({ src, alt }) {
    const [active, setActive] = useState(false);

    return (
        <div className="nade-img">
            <img
                src={src}
                alt={alt}
                onClick={() => setActive(t => !t)}
                className={`${active && 'active'}`}
            />
            <span className="nade-img-meta">{alt}</span>
        </div>
    );
}

/**
 * Smoke, flash...
 */
function Nade({ name, actions, meta = {} }) {
    const [expanded, setExpanded] = useState(false);

    const sortedActions = sortActions(actions);

    return (
        <li className="nade">
            <p
                className={`nade-name ${expanded && 'nade-name-active'}`}
                onClick={() => setExpanded(t => !t)}
            >
                {parseNadeName(name)}
                {meta.type && <span className="nade-name-meta"> ({meta.type})</span>}
            </p>
            {expanded && (
                <div className="nade-actions">
                    {sortedActions.map(([actName, actImg]) => {
                        return (
                            <LazyImage
                                key={actName}
                                src={actImg}
                                alt={meta[actName] ?? getNadeMeta(actName)}
                            />
                        );
                    })}
                </div>
            )}
        </li>
    );
}

/**
 * A site, B site or Middle...
 */
function MapArea({ name, positions, meta }) {
    const groupedPositions = groupPositions(positions);

    return (
        <div className="map-area">
            <h4 className="map-area-name">{name}</h4>
            <ul>
                {Object.entries(groupedPositions).map(([nade, actions]) => {
                    return <Nade key={nade} name={nade} actions={actions} meta={meta[nade]} />;
                })}
            </ul>
        </div>
    );
}

/**
 * Ancient, Nuke...
 */
function Map({ map }) {
    const areas = Object.keys(files[map]).sort(alphabeticalSort);
    const meta = metadata[map];

    return (
        <div>
            <h2 className="map-name">{map}</h2>
            <ul>
                {areas.map(area => (
                    <li key={area}>
                        <MapArea name={area} positions={files[map][area]} meta={meta} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function App() {
    const mapList = Object.keys(files);

    return (
        <main>
            <h1>Katuli4ka</h1>
            <div>
                {mapList.map(map => (
                    <Map key={map} map={map} />
                ))}
            </div>
        </main>
    );
}
