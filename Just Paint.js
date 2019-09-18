/*global $ */
$(function() {
    
    var Colors = {0: "black", 1: "red", 2: "green", 3: "blue",
                  4: "orange", 5: "yellow",  6: "white",
                  7: "brown", 8: "saddlebrown", 9: "gray",
                 10: "lightseagreen"};
    
    for (var i in Colors) {
        $("#colors").html($("#colors").html() + "<button id='"+ Colors[i] +"' class='color'></button>");
        $("#"+Colors[i]+"").css({"background-color": Colors[i]});
    }
    
    $("#lang").click(function() {
        Arabic();
    });
    $("#clear").click(function() {
        
    });
    $("#save").click(function() {
        
    });
    $("#saveDev").click(function() {
        
    });
    
    
});

function Arabic() {
    var name = String($("#lang").text());
    if(name === "عـــربـــي") {
        $("#lang").text("English");
        $("html").attr("lang", "ar");
        $("body").css({"font-family": "El Messiri"});
        $("article").html('<div><button id="saveDev"></button></div>'
                        + '<div><button id="save"></button></div>'
                        + '</div><div><button id="clear"></button></div>'
                        + '<div><input type="range" max="20" step="2" value="12"><label></label>&nbsp;');
        $("button").css({"font-family": "El Messiri"});
        $("h1").text("ارسم لوحتك");
        $("label").text("حجم الفرشة");
        $("#clear").text("تنظيف اللوحة");
        $("#save").text("حفظ");
        $("#saveDev").text("حفظ إلى جهازي");
    } else {
        $("#lang").text("عـــربـــي");
        $("html").attr("lang", "en");
        $("body").css({"font-family": "Dosis"});
        $("article").html('<div>&nbsp;<label></label><input type="range" max="20" step="2" value="12"></div>'
                        + '<div><button id="clear"></button></div>'
                        + '<div><button id="save"></button></div>'
                        + '<div><button id="saveDev"></button></div>');
        $("button").css({"font-family": "Dosis"});
        $("#lang").css({"font-family": "El Messiri"});
        $("h1").text("Just Paint");
        $("label").text("Brush Stroke");
        $("#clear").text("Clear");
        $("#save").text("Save");
        $("#saveDev").text("Save to my device");
    }
    $("").text("");
}

/*
var c = document.getElementById("board");
var ctx = c.getContext("2d");
var img = document.getElementById("scream");
ctx.drawImage(img,10,10);

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

// Converts canvas to an image with callback
function convertCanvasToImage(canvas, callback) {
  var image = new Image();
  image.onload = function(){
    callback(image);
  }
  image.src = canvas.toDataURL("image/png");
}
*/