import { For } from 'solid-js';
import { Map } from './components';
import { getMapList } from './utils';

function App() {
    const mapList = getMapList();

    return (
        <main>
            <h1>Katuli4ka</h1>
            <div>
                <For each={mapList}>{map => <Map map={map} />}</For>
            </div>
        </main>
    );
}

export default App;
