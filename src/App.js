import { useState } from 'react';

import metadata from '../assets/metadata.json';

import './index.css';
import { sortActions, alphabeticalSort, getNadeMeta, groupPositions, parseNadeName } from './utils';

const files = require('../assets/maps/**/*.png');

const logos = {
    ancient: require('../assets/maps/logo-ancient.webp'),
    inferno: require('../assets/maps/logo-inferno.webp'),
};

function LazyImage({ src, alt, active, onClick }) {
    return (
        <div className="nade-img" onClick={onClick}>
            <img src={src} alt={alt} className={`${active && 'active'}`} />
            <span className="nade-img-meta">{alt}</span>
        </div>
    );
}

/**
 * Smoke, flash...
 */
function Nade({ name, actions, meta = {} }) {
    const [expanded, setExpanded] = useState(false);
    const [active, setActive] = useState('');

    const sortedActions = sortActions(actions);

    // const handleNavigate = useCallback(
    //     event => {
    //         if (!active) {
    //             return;
    //         }

    //         console.log(actions);

    //         const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    //         switch (key) {
    //             case 'ArrowLeft':
    //                 console.log('left');
    //                 break;
    //             case 'ArrowRight':
    //                 console.log('right');
    //                 break;
    //         }
    //     },
    //     [active],
    // );

    // useEffect(() => {
    //     document.addEventListener('keydown', handleNavigate);

    //     return () => {
    //         document.removeEventListener('keydown', handleNavigate);
    //     };
    // }, [active, handleNavigate]);

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
                                active={active === actName}
                                onClick={() => {
                                    if (active !== actName) {
                                        setActive(actName);
                                    } else {
                                        setActive('');
                                    }
                                }}
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
                    return <Nade key={nade} name={nade} actions={actions} meta={meta?.[nade]} />;
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
            <h2 className="map-name">
                <img src={logos[map]} />
                {map}
            </h2>
            <ul className="map-areas">
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
