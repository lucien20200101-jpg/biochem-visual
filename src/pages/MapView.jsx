import { useMemo, useState } from "react";
import SvgMapViewer from "../components/SvgMapViewer";
import mapSvg from "../assets/maps/mini-metabolism.svg";
import { mapMeta, mapNodes } from "../data/mapData";

export default function MapView() {
  const [selectedNode, setSelectedNode] = useState(mapNodes[0]);
  const details = useMemo(
    () => selectedNode?.details ?? [],
    [selectedNode]
  );

  return (
    <section className="map-page">
      <header className="map-page-header">
        <h2>{mapMeta.title}</h2>
        <p>{mapMeta.subtitle}</p>
      </header>
      <div className="map-page-grid">
        <SvgMapViewer
          mapUrl={mapSvg}
          nodes={mapNodes}
          onSelect={setSelectedNode}
        />
        <aside className="map-info-panel" aria-live="polite">
          <div className="map-info-card">
            <p className="map-info-label">Selected node</p>
            <h3>{selectedNode.label}</h3>
            <p className="map-info-summary">{selectedNode.description}</p>
            <div className="map-info-meta">
              <div>
                <span className="map-info-title">Location</span>
                <span>{selectedNode.location}</span>
              </div>
              <div>
                <span className="map-info-title">Status</span>
                <span>{selectedNode.key ? "Key checkpoint" : "Standard node"}</span>
              </div>
            </div>
            <div className="map-info-list">
              <p className="map-info-title">Highlights</p>
              <ul>
                {details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <button type="button" className="map-info-action">
              Open reaction timeline
            </button>
          </div>
          <div className="map-info-card is-muted">
            <p className="map-info-title">Next steps</p>
            <p>
              Swap in the full pathway SVG and hydrate these panels with real
              metabolite metadata.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
