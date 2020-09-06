window.onload = () => {

    const board = document.querySelector('.board')
    const colorsContainer = document.querySelector('#colors-container')
    const ctrlContainer = document.querySelector('#ctrl-container')
    const ctrlAll = document.querySelectorAll('.ctrl')
    const clearBTN = document.querySelector('#clear')
    const saveBTN = document.querySelector('#save')
    const downloadBTN = document.querySelector('#download')

    const COLORS = [
        "black",
        "red",
        "green",
        "blue",
        "orange",
        "skyblue",
        "purple",
        "brown",
        "saddlebrown",
        "gray",
        "lightseagreen",
        '#345',
        '#e37c77',
        '#325a96',
    ]

    const createColorBTN = id => {
        const btn = document.createElement('button')

        btn.id = 'c' + id
        btn.className = 'color'
        btn.style.backgroundColor = COLORS[id]

        btn.addEventListener('click', () => console.log(btn))

        return btn
    }

    for (const id in COLORS) colorsContainer.appendChild(createColorBTN(id))



    clearBTN.addEventListener('click', () => { })
    saveBTN.addEventListener('click', () => { })
    downloadBTN.addEventListener('click', () => { })

}

/*
function Arabic() {
    var name = String($("#lang").text());
    if (name === "عـــربـــي") {
        $("#lang").text("English");
        $("html").attr("lang", "ar");
        $("body").css({ "font-family": "El Messiri" });
        $("article").html('<div><button id="saveDev"></button></div>'
            + '<div><button id="save"></button></div>'
            + '</div><div><button id="clear"></button></div>'
            + '<div><input type="range" max="20" step="2" value="12"><label></label>&nbsp;');
        $("button").css({ "font-family": "El Messiri" });
        $("h1").text("ارسم لوحتك");
        $("label").text("حجم الفرشة");
        $("#clear").text("تنظيف اللوحة");
        $("#save").text("حفظ");
        $("#saveDev").text("حفظ إلى جهازي");
    } else {
        $("#lang").text("عـــربـــي");
        $("html").attr("lang", "en");
        $("body").css({ "font-family": "Dosis" });
        $("article").html('<div>&nbsp;<label></label><input type="range" max="20" step="2" value="12"></div>'
            + '<div><button id="clear"></button></div>'
            + '<div><button id="save"></button></div>'
            + '<div><button id="saveDev"></button></div>');
        $("button").css({ "font-family": "Dosis" });
        $("#lang").css({ "font-family": "El Messiri" });
        $("h1").text("Just Paint");
        $("label").text("Brush Stroke");
        $("#clear").text("Clear");
        $("#save").text("Save");
        $("#saveDev").text("Save to my device");
    }
    $("").text("");
}
*/

/*
var c = document.getElementById("board");
var ctx = c.getContext("2d");
var img = document.getElementById("scream");
ctx.drawImage(img, 10, 10);

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

/*
// File#: _1_swipe-content
(function () {
    var SwipeContent = function (element) {
        this.element = element;
        this.delta = [false, false];
        this.dragging = false;
        this.intervalId = false;
        initSwipeContent(this);
    };

    function initSwipeContent(content) {
        content.element.addEventListener('mousedown', handleEvent.bind(content));
        content.element.addEventListener('touchstart', handleEvent.bind(content));
    };

    function initDragging(content) {
        //add event listeners
        content.element.addEventListener('mousemove', handleEvent.bind(content));
        content.element.addEventListener('touchmove', handleEvent.bind(content));
        content.element.addEventListener('mouseup', handleEvent.bind(content));
        content.element.addEventListener('mouseleave', handleEvent.bind(content));
        content.element.addEventListener('touchend', handleEvent.bind(content));
    };

    function cancelDragging(content) {
        //remove event listeners
        if (content.intervalId) {
            (!window.requestAnimationFrame) ? clearInterval(content.intervalId) : window.cancelAnimationFrame(content.intervalId);
            content.intervalId = false;
        }
        content.element.removeEventListener('mousemove', handleEvent.bind(content));
        content.element.removeEventListener('touchmove', handleEvent.bind(content));
        content.element.removeEventListener('mouseup', handleEvent.bind(content));
        content.element.removeEventListener('mouseleave', handleEvent.bind(content));
        content.element.removeEventListener('touchend', handleEvent.bind(content));
    };

    function handleEvent(event) {
        switch (event.type) {
            case 'mousedown':
            case 'touchstart':
                startDrag(this, event);
                break;
            case 'mousemove':
            case 'touchmove':
                drag(this, event);
                break;
            case 'mouseup':
            case 'mouseleave':
            case 'touchend':
                endDrag(this, event);
                break;
        }
    };

    function startDrag(content, event) {
        content.dragging = true;
        // listen to drag movements
        initDragging(content);
        content.delta = [parseInt(unify(event).clientX), parseInt(unify(event).clientY)];
        // emit drag start event
        emitSwipeEvents(content, 'dragStart', content.delta, event.target);
    };

    function endDrag(content, event) {
        cancelDragging(content);
        // credits: https://css-tricks.com/simple-swipe-with-vanilla-javascript/
        var dx = parseInt(unify(event).clientX),
            dy = parseInt(unify(event).clientY);

        // check if there was a left/right swipe
        if (content.delta && (content.delta[0] || content.delta[0] === 0)) {
            var s = getSign(dx - content.delta[0]);

            if (Math.abs(dx - content.delta[0]) > 30) {
                (s < 0) ? emitSwipeEvents(content, 'swipeLeft', [dx, dy]) : emitSwipeEvents(content, 'swipeRight', [dx, dy]);
            }

            content.delta[0] = false;
        }
        // check if there was a top/bottom swipe
        if (content.delta && (content.delta[1] || content.delta[1] === 0)) {
            var y = getSign(dy - content.delta[1]);

            if (Math.abs(dy - content.delta[1]) > 30) {
                (y < 0) ? emitSwipeEvents(content, 'swipeUp', [dx, dy]) : emitSwipeEvents(content, 'swipeDown', [dx, dy]);
            }

            content.delta[1] = false;
        }
        // emit drag end event
        emitSwipeEvents(content, 'dragEnd', [dx, dy]);
        content.dragging = false;
    };

    function drag(content, event) {
        if (!content.dragging) return;
        // emit dragging event with coordinates
        (!window.requestAnimationFrame)
            ? content.intervalId = setTimeout(function () { emitDrag.bind(content, event); }, 250)
            : content.intervalId = window.requestAnimationFrame(emitDrag.bind(content, event));
    };

    function emitDrag(event) {
        emitSwipeEvents(this, 'dragging', [parseInt(unify(event).clientX), parseInt(unify(event).clientY)]);
    };

    function unify(event) {
        // unify mouse and touch events
        return event.changedTouches ? event.changedTouches[0] : event;
    };

    function emitSwipeEvents(content, eventName, detail, el) {
        var trigger = false;
        if (el) trigger = el;
        // emit event with coordinates
        var event = new CustomEvent(eventName, { detail: { x: detail[0], y: detail[1], origin: trigger } });
        content.element.dispatchEvent(event);
    };

    function getSign(x) {
        if (!Math.sign) {
            return ((x > 0) - (x < 0)) || +x;
        } else {
            return Math.sign(x);
        }
    };

    window.SwipeContent = SwipeContent;

    //initialize the SwipeContent objects
    var swipe = document.getElementById('board');
    if (swipe.length > 0) {
        for (var i = 0; i < swipe.length; i++) {
            (function (i) { new SwipeContent(swipe[i]); })(i);
        }
    }
}());
*/