export default function GlobeLayer() {
  return (
    <div className="globe-layer" id="globeLayer" aria-hidden="true">
      <div className="space-stars" id="spaceStars"></div>
      <div className="globe-stage" id="globeStage" role="img" aria-label="Interactive globe of incorporation jurisdictions">
        <canvas id="globeCanvas"></canvas>
        <div id="globeMarkers"></div>
        <div className="globe-tip" id="globeTip" aria-hidden="true"></div>
        <div className="globe-fallback" id="globeFallback"></div>
      </div>
    </div>
  );
}
