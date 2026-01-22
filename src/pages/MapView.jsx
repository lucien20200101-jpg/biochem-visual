import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import SvgMapViewer from "../components/SvgMapViewer";
import mapSvg from "../assets/maps/mini-metabolism.svg";
import { mapNodes } from "../data/mapData";

const getLocalizedField = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] ?? field.en ?? "";
};

const getLocalizedList = (field, lang) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  return field[lang] ?? field.en ?? [];
};

export default function MapView() {
  const { t, i18n } = useTranslation();
  const [selectedNodeId, setSelectedNodeId] = useState(mapNodes[0].id);
  const lang = i18n.language?.startsWith("zh") ? "zh" : "en";

  const localizedNodes = useMemo(
    () =>
      mapNodes.map((node) => ({
        id: node.id,
        key: node.key,
        name: getLocalizedField(node.name, lang),
        description: getLocalizedField(node.description, lang),
        location: getLocalizedField(node.location, lang),
        details: getLocalizedList(node.bullets, lang),
      })),
    [lang]
  );
  const selectedNode = useMemo(
    () =>
      localizedNodes.find((node) => node.id === selectedNodeId) ??
      localizedNodes[0],
    [localizedNodes, selectedNodeId]
  );

  return (
    <section className="map-page">
      <header className="map-page-header">
        <h2>{t("map.title")}</h2>
        <p>{t("map.subtitle")}</p>
      </header>
      <div className="map-page-grid">
        <SvgMapViewer
          mapUrl={mapSvg}
          nodes={mapNodes}
          onSelect={(node) => setSelectedNodeId(node.id)}
        />
        <aside className="map-info-panel" aria-live="polite">
          <div className="map-info-card">
            <p className="map-info-label">{t("map.selectedNode")}</p>
            <h3>{selectedNode.name}</h3>
            <p className="map-info-summary">{selectedNode.description}</p>
            <div className="map-info-meta">
              <div>
                <span className="map-info-title">{t("map.location")}</span>
                <span>{selectedNode.location}</span>
              </div>
              <div>
                <span className="map-info-title">{t("map.status")}</span>
                <span>
                  {selectedNode.key ? t("map.keyCheckpoint") : t("map.standardNode")}
                </span>
              </div>
            </div>
            <div className="map-info-list">
              <p className="map-info-title">{t("map.highlights")}</p>
              <ul>
                {selectedNode.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <button type="button" className="map-info-action">
              {t("map.openReactionTimeline")}
            </button>
          </div>
          <div className="map-info-card is-muted">
            <p className="map-info-title">{t("map.nextStepsTitle")}</p>
            <p>{t("map.nextStepsDescription")}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
