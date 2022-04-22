/* A view is the general extend of your web map. Think of it as a view extend. Here we are defining the
View extent properties
Think of the new ol.View({}) as the anchor, here we define the center and the zoom.
The center defines the default location on the map where the view will be loaded from
The zoom defines the scale at which the map will be zoomed in or out. A lower number means you zoomed into the area 
For zoom always define a number that will cover your area of interest withinn the view extend
All anchors are declared as a variable */

// NB: Pressing Shift + Alt + A Toggles  a block comment
// Pressing Ctrl + / Toggles a line comment
var mapView = new ol.View({
    center: ol.proj.fromLonLat([36.8975517,-1.3044917]),
    zoom: 17,
});


/* We need a Map DOM to display our map layers to the web page. For this connection we use the new ol.Map({}) anchor. We 
here you specify the target which is the same as your map div on the html file. The view is the map view you just 
defined above.  */
var map =new ol.Map({
    target:'map',
    view: mapView,
});

// The Map DOM requires base layer. Here we use the OSM Layers Service. For this we anchor it to the new ol.layer.Tile({}) 
// for this we declare the title, visible, and source. (the title will display on your layerswticher), if visible is set to 
// true it will display the layer automatically
var osmTile = new ol.layer.Tile({
    title:'Open Street Maps', 
    visible: true,
    type: 'base',
    source: new ol.source.OSM()

});

// we add/display the layers to the map DOM using the map.addLayer() anchor
// map.addLayer(osmTile);

var nonetile = new ol.layer.Tile({
    title :'None',
    type : 'base',
    visible: false
});

// adds a basegroup layer with two base map layers nonetile and osmtile
var basegroup =new ol.layer.Group({
    title: 'Base Maps',
    fold : true,
    layers: [nonetile, osmTile]
});

map.addLayer(basegroup);


/* var school = new ol.layer.Tile({
    title: 'Schools Deputy Respondents',
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/webgis/wms',
        params :{'LAYERS': 'webgis:school_gps','TILED':true},
        servertype: 'geoserver',
        visible:true,
    })
});


//Adds the waterpoint layer to the map div
map.addLayer(school); */

 var waterpoint = new ol.layer.Tile({
    title: 'Key Water Points',
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/webgis/wms',
        params :{'LAYERS': 'webgis:key_waterpoints','TILED':true},
        servertype: 'geoserver',
        visible:true,
    })
});

//Adds the waterpoint layer to the map div
// map.addLayer(waterpoint);

// var building = new ol.layer.Tile({
//     title: 'Buildings',
//     source: new ol.source.TileWMS({
//         url: 'http://localhost:8080/geoserver/webgis/wms',
//         params :{'LAYERS': 'webgis:buildings','TILED':true},
//         servertype: 'geoserver',
//         visible:true,
//     })
// });
// //Adds the building layer to the map div
// // map.addLayer(building);




// =========================

// add a vector fill style
var bldfillstyle= new ol.style.Fill({
    color : [188,188,188, 0.8]
}); 

var acc_fillstyle= new ol.style.Fill({
    color : [61,133,198, 0.6]
}); 

var wpfillStyle = new ol.style.Fill({
    color:[11,83,148]
})


var fillstyle= new ol.style.Fill({
    color : [255, 0, 0, 0.8]
});

// add a vector stroke style
var strokestyle= new ol.style.Stroke({
    color : [99,69,177],
    width : 1.2

});

var cmpstrokestyle= new ol.style.Stroke({
    color : [76,17,48],
    width : 3
});

// adds vector circle styles
var circlestyle =new ol.style.Circle({
    fill: new ol.style.Fill({
        color: [204,0,0] 
    }),
    radius:5,
    stroke: strokestyle
});

var gbcirclestyle =new ol.style.Circle({
    fill: new ol.style.Fill({
        color: [127,96,0] 
    }),
    radius:7,
    stroke: strokestyle
});

var wpcircleStyle = new ol.style.Circle({
    fill:wpfillStyle,
    radius:7,
    stroke: strokestyle
});


// Add geosjson layer
/* to add a Geosjson layer we anchor it to new ol.layer.VectorImage({}) 
function, the we declare the source >> here we also achor the source
to new ol.source.Vector we also define the url and te format whish we declare as new ol.format.GeoJSON() */
var building_geojson =new ol.layer.VectorImage({
    source : new ol.source.Vector({
        url:'./resources/data/kijiji_camp_buildings.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title:'Kijiji Camp Buildings',
    style : new ol.style.Style({
        fill : bldfillstyle,
        stroke: strokestyle
        // image : circlestyle
    })
    
});
// map.addLayer(building_geojson);

var latrine =new ol.layer.VectorImage({
    source : new ol.source.Vector({
        url:'./resources/data/kijiji_latrines.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title:'Latrines',
    style : new ol.style.Style({
        fill : bldfillstyle,
        stroke: strokestyle,
        image : circlestyle,
    })
    
});

var garbage_site =new ol.layer.VectorImage({
    source : new ol.source.Vector({
        url:'./resources/data/kijiji_garbage_collection_sites.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title:'Garbage Collection Points',
    style : new ol.style.Style({
        fill : bldfillstyle,
        stroke: strokestyle,
        image : gbcirclestyle
    })
    
});

var accessibility_200m_wp =new ol.layer.VectorImage({
    source : new ol.source.Vector({
        url:'./resources/data/200m_accessibility_improved_watersource.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title:'200m Accessibility to Improved Water Sources',
    style : new ol.style.Style({
        fill : acc_fillstyle
        // stroke: cmpstrokestyle,
        // image : gbcirclestyle
    })
    
});

var kijiji_camp =new ol.layer.VectorImage({
    source : new ol.source.Vector({
        url:'./resources/data/kijiji_camp.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title:'Kijiji Camp Boundary',
    style : new ol.style.Style({
        // fill : bldfillstyle,
        stroke: cmpstrokestyle,
        // image : gbcirclestyle
    })
    
});

var wp_geojson = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url:'./resources/data/key_waterpoints.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title:'Key Water Points',
    style: new ol.style.Style({
        fill:wpfillStyle,
        stroke:strokestyle,
        image:wpcircleStyle
    })
});

// ===================

// Adds geoserver files as layers to the "Overlays" Group on layersitcher
var overlaygroup = new ol.layer.Group({
    title:'Overlays',
    fold: true,
    layers: [kijiji_camp,accessibility_200m_wp,building_geojson,wp_geojson,latrine,garbage_site]
}); 

map.addLayer(overlaygroup);
 
//add layerswitcher
var layerswitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    groupSelectStyle: 'children'
});

// Layerswitcher is a map control and to add it to map DOM we use the map.addControl()
map.addControl(layerswitcher);

/* Adds a scale line */

var scalecontrol = new ol.control.ScaleLine({
    bar:true,
    text: true
});

// adds the scale line to the Map DOM
map.addControl(scalecontrol);

// adds  mouse position

var mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    projection: 'EPSG:4326',
    coordinateFormat: function(coordinate){return ol.coordinate.format(coordinate,'{y}, {x}',4);}
});

map.addControl(mousePosition);