import { useState } from 'react';

import './index.css';
import { groupPositions, parseNadeName } from './utils';

let files = require('../assets/maps/**/*.png');

function LazyImage({ src, ...rest }) {
    const [active, setActive] = useState(false);

    return src ? (
        <img
            src={src}
            onClick={() => setActive(t => !t)}
            className={`${active && 'active'}`}
            {...rest}
        />
    ) : (
        <span>loading</span>
    );
}

function Nade({ name, actions }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <li className="nade">
            <p
                className={`nade-name ${expanded && 'nade-name-active'}`}
                onClick={() => setExpanded(t => !t)}
            >
                {parseNadeName(name)}
            </p>
            {expanded && (
                <div>
                    {actions.map(([actName, actImg]) => {
                        return <LazyImage key={actName} src={actImg} alt={actName} />;
                    })}
                </div>
            )}
        </li>
    );
}

/**
 * A site, B site or Middle...
 */
function MapArea({ name, positions }) {
    const groupedPositions = groupPositions(positions);

    return (
        <div className="map-area">
            <h4 className="map-area-name">{name}</h4>
            <ul>
                {Object.entries(groupedPositions).map(([nade, actions]) => {
                    return <Nade key={nade} name={nade} actions={actions} />;
                })}
            </ul>
        </div>
    );
}

/**
 * Ancient, Nuke...
 */
function Map({ map }) {
    const areas = Object.keys(files[map]);

    return (
        <div>
            <h2>{map}</h2>
            <ul>
                {areas.map(area => (
                    <li key={area}>
                        <MapArea name={area} positions={files[map][area]} />
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
