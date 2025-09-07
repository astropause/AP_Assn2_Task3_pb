require([
  "esri/Map",
  "esri/layers/CSVLayer",
  "esri/views/MapView",
  "esri/widgets/Legend"
], function(Map, CSVLayer, MapView, Legend) {
  var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";
  
  const template = {
    title: "Crime committed at {ILEADSStreet}"
};

const renderer = {
  type: "heatmap",
  colorStops: [
    { color: "rgba(255, 105, 180, 0)", ratio: 0 },   // transparent hot pink
    { color: "#ff69b4", ratio: 0.083 },              // hot pink
    { color: "#ff82a8", ratio: 0.166 },              // lighter pink
    { color: "#ff9c9c", ratio: 0.249 },              // peach-pink
    { color: "#ffb66e", ratio: 0.332 },              // orange-yellow
    { color: "#ffd040", ratio: 0.415 },              // golden yellow
    { color: "#ffea13", ratio: 0.498 },              // bright yellow
    { color: "#e5f33f", ratio: 0.581 },              // yellow-green
    { color: "#c0f97a", ratio: 0.664 },              // lime
    { color: "#8cfdc0", ratio: 0.747 },              // aqua green
    { color: "#52ffe9", ratio: 0.83 },               // turquoise
    { color: "#1dffff", ratio: 0.913 },              // cyan
    { color: "#00ffff", ratio: 1 },                  // pure cyan
  ],
  maxDensity: 0.08,
  minDensity: 0,
};
  
  const layer = new CSVLayer({
    url: url,
    title: "St. Louis Crime Heatmap",
    copyright: "St. Louis Police Department",
		latitudeField:"Lat",
    longitudeField:"Lon",
		popupTemplate: template,
		renderer: renderer
  });
  
  const map = new Map({
    basemap: "gray-vector",
    layers: [layer]
  });
  
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-90.1982, 38.6274], // St. Louis Coordinates
    zoom: 12 
  });

  view.ui.add(
    new Legend({
      view: view
    }),
    "bottom-left"
  );
});