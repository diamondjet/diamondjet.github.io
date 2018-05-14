var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var icicle;
function init(){
  var heightb = (document.getElementById("p").clientHeight) / 5;
  var height = ((document.body.clientHeight)-(document.getElementById("p").clientHeight)*3.5)+"px";
  d3.select("#container").style("height", height);
  // init data
  // end
  // init Icicle
  icicle = new $jit.Icicle({
    // id of the visualization container
    injectInto: 'infovis',
    // whether to add transition animations
    animate: animate,
    // nodes offset
    offset: 0,
    // whether to add cushion type nodes
    cushion: true,
    //show only three levels at a time
    constrained: true,
    levelsToShow: 3,
    
    // Add events to nodes
    Events: {
      enable: true,
      onMouseEnter: function(node) {
        //add border and replot node
        node.setData('border', 'brown');
        icicle.fx.plotNode(node, icicle.canvas);
        icicle.labels.plotLabel(icicle.canvas, node, icicle.controller);
      },
      onMouseLeave: function(node) {
        node.removeData('border');
        icicle.fx.plot();
      },
      onClick: function(node){
        if (node) {
          //perform the enter animation
          
          icicle.enter(node);
          icicle.config.levelsToShow = 2;
        }
      },
      onRightClick: function(){
        //perform the out animation
        icicle.config.levelsToShow = 3;
        icicle.out();
        setTimeout(function() {
            icicle.out();
            setTimeout(function() {
                icicle.out();
            },1600);
        },1600);
      }
    },
    // Add canvas label styling
    Label: {
      size: heightb,
      color: 'black',
      style: 'bold',
      family: 'Verdana'
    },
    Tips: {  
      enable: true, 
      offsetX: 20,  
      offsetY: 20,  
      onShow: function(tip, node) {  
        tip.innerHTML = node.name;
        tip.style.fontSize = "1em";
        tip.style.backgroundColor = "white";
        tip.style.padding = "2px";
      }  
    },
    onCreateLabel: function(domElement, node){  
    domElement.innerHTML = node.name;  
    var style = domElement.style;  
    style.fontSize = '0.9em';  
    style.display = '';  
    style.cursor = 'pointer';  
    style.color = '#333';  
    style.overflow = 'hidden';  
  },  
  // Change some label dom properties.  
  // This method is called each time a label is plotted.  
  onPlaceLabel: function(domElement, node){  
    var style = domElement.style,  
        width = node.getData('width'),  
        height = node.getData('height');  
    if(false) {  
      style.display = 'none';  
    } else {  
      style.display = '';  
      style.width = width + 'px';  
      style.height = height + 'px';  
    }  
  }  
});
  // load data
  icicle.loadJSON(json);
  icicle.layout.orientation = "h";
  // compute positions and plot
  icicle.refresh();
  //end
}
