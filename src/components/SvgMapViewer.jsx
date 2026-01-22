import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function SvgMapViewer({ mapUrl, nodes, onNodeClick }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [transform, setTransform] = useState({ x: 40, y: 20, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const lang = i18n.language?.startsWith("zh") ? "zh" : "en";

  const hoveredNode = useMemo(
    () => nodes.find((node) => node.id === hoveredNodeId) ?? null,
    [hoveredNodeId, nodes]
  );

  const handleNodeClick = (node) => {
    console.log("[node click]", node.id, node.name);
    onNodeClick?.(node);
  };

  const getLocalizedField = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] ?? field.en ?? "";
  };

  const startPan = (event) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPanning(true);
    setPanStart({
      x: event.clientX - transform.x,
      y: event.clientY - transform.y,
    });
  };

  const updatePan = (event) => {
    if (!isPanning) return;
    setTransform((prev) => ({
      ...prev,
      x: event.clientX - panStart.x,
      y: event.clientY - panStart.y,
    }));
  };

  const endPan = (event) => {
    if (!isPanning) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsPanning(false);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;

    setTransform((prev) => {
      const nextScale = clamp(prev.scale * zoomFactor, 0.6, 2.4);
      const worldX = (pointerX - prev.x) / prev.scale;
      const worldY = (pointerY - prev.y) / prev.scale;
      return {
        scale: nextScale,
        x: pointerX - worldX * nextScale,
        y: pointerY - worldY * nextScale,
      };
    });
  };

  return (
    <div className="svg-map-shell">
      <div className="svg-map-header">
        <div>
          <p className="svg-map-eyebrow">{t("map.canvasEyebrow")}</p>
          <h3>{t("map.canvasTitle")}</h3>
          <p>{t("map.canvasDescription")}</p>
        </div>
        <div className="svg-map-controls">
          <button
            type="button"
            onClick={() => setTransform({ x: 40, y: 20, scale: 1 })}
          >
            {t("map.resetView")}
          </button>
          <span>{Math.round(transform.scale * 100)}%</span>
        </div>
      </div>
      <div
        className={`svg-map-stage ${isPanning ? "is-panning" : ""}`}
        ref={containerRef}
        onPointerDown={startPan}
        onPointerMove={updatePan}
        onPointerUp={endPan}
        onPointerLeave={endPan}
        onWheel={handleWheel}
      >
        <svg
          viewBox="0 0 900 520"
          width="100%"
          height="100%"
          aria-label={t("map.canvasAriaLabel")}
          role="img"
        >
          <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}>
            <image href={mapUrl} width="900" height="520" />
            <g className="map-node-layer">
              {nodes.map((node) => (
                <g
                  key={node.id}
                  className={`map-node ${
                    hoveredNodeId === node.id ? "is-hovered" : ""
                  } ${node.key ? "is-key" : ""}`}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => handleNodeClick(node)}
                >
                  <circle cx={node.x} cy={node.y} r={26} />
                  <circle className="map-node-core" cx={node.x} cy={node.y} r={8} />
                  <text
                    className="map-node-label"
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                  >
                    {node.label?.[lang] ??
                      node.label?.en ??
                      node.name?.[lang] ??
                      node.name?.en}
                  </text>
                </g>
              ))}
              {hoveredNode ? (
                <g
                  className="map-tooltip"
                  transform={`translate(${hoveredNode.x + 18} ${hoveredNode.y - 44})`}
                >
                  <rect width="200" height="52" rx="10" />
                  <text x="12" y="22">
                    <tspan className="map-tooltip-title">
                      {getLocalizedField(hoveredNode.name)}
                    </tspan>
                    <tspan x="12" y="40" className="map-tooltip-body">
                      {getLocalizedField(hoveredNode.tooltip)}
                    </tspan>
                  </text>
                </g>
              ) : null}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
