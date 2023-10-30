import { useEffect, useRef, useState } from 'react';
import './index.css'

import Map from 'ol/Map.js';

import View from 'ol/View.js';

import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

import { MousePosition } from 'ol/control';

import { createStringXY } from 'ol/coordinate';

function App() {

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:3857',
    className: 'custom-mouse-position',
  });

  const mapTargetElement = useRef(null)
  const [map, setMap] = useState()

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({ source: new OSM() }),
      ],
      controls: [mousePositionControl],
      view: new View({
        center: ([14132069.8514, 4515189.5402]),
        zoom: 18,
        minZoom: 0,
        maxZoom: 28,
      }),
    })
    map.setTarget(mapTargetElement.current || "")
    setMap(map)
    return () => map.setTarget("")
  }, [])

  return (
    <>
      <div
        ref={mapTargetElement}
        className="map"
        style={{
          width: "100%",
          height: "600px",
          position: "relative",
        }} >
      </div>
    </>
  )
}
export default App; 