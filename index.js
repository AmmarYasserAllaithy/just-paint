window.onload = () => {

    /**
     * DECLARE & INITIALIZE DOM ELEMENTS REFERENCES
     */
    const colorsContainer = document.querySelector('#colors-container')
    const colorPicker = document.querySelector('#colorPicker')
    const seekbar = document.querySelector('#seekbar')
    const eraseBTN = document.querySelector('#erase')
    const clearBTN = document.querySelector('#clear')
    const saveBTN = document.querySelector('#save')
    const downloadBTN = document.querySelector('#download')
    const canvas = document.querySelector('.board')
    const cursor = document.querySelector('.cursor');

    const ctx = canvas.getContext('2d')

    /**
     * DECLARE & INITIALIZE VARIABLES
     */
    let isMobile = false

    // This is the flag that we are going to use to trigger drawing 
    let paint = false

    // Stores the initial position of the cursor 
    let coord = { x: 0, y: 0 }
    let cnvsBCRect = { left: 0, top: 0 }

    // This is the drawing Color 
    let lineColor = colorPicker.value;

    // This is the drawing Color 
    let lineWidth = seekbar.value

    let dataImg = null


    /**
     * DEFINE FUNCTIONS
     */
    const detectDevice = () => isMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
    detectDevice()


    // Resizes the canvas to the available size of the window. 
    const resize = () => {
        saveCanvasData()
        ctx.canvas.width = window.innerWidth
        ctx.canvas.height = window.innerHeight
            - document.querySelector('header').clientHeight
            - (isMobile ? 20 : 4)
        initCanvas()
    }

    // Updates the coordinates of the cursor when an event e is triggered to the coordinates 
    // where the said event is triggered. 
    const getPosition = e => {
        let cX = isMobile ? e.touches[0].pageX : e.clientX
        let cY = isMobile ? e.touches[0].pageY : e.clientY

        cnvsBCRect = canvas.getBoundingClientRect()    // Gets CSS pos, and width/height

        coord.x = Math.round(cX - cnvsBCRect.left)
        coord.y = Math.round(cY - cnvsBCRect.top)

        validateCoords()
    }

    const validateCoords = () => {
        coord.x = coord.x < 0 ? 0 : coord.x > canvas.width ? canvas.width : coord.x
        coord.y = coord.y < 0 ? 0 : coord.y > canvas.height ? canvas.height : coord.y
    }

    // The following functions toggle the flag to start and stop drawing 
    const startPainting = event => {
        paint = true
        getPosition(event)
    }

    const stopPainting = () => paint = false;

    const sketch = event => {
        if (!paint) return;
        ctx.beginPath()

        ctx.lineWidth = lineWidth

        // Sets the end of the lines drawn to a round shape. 
        ctx.lineCap = 'round'

        ctx.strokeStyle = lineColor

        // The cursor to start drawing moves to this coordinate 
        ctx.moveTo(coord.x, coord.y)

        // The position of the cursor gets updated as we move the mouse around. 
        getPosition(event)

        // A line is traced from start coordinate to this coordinate 
        ctx.lineTo(coord.x, coord.y)

        // Draws the line.
        ctx.stroke()
    }

    const strOf = num => {
        let str = parseInt(num).toString(16)
        return str.length == 2 ? str : '0' + str
    }

    const getHexOf = rgb => {
        rgb = rgb.replace(/[^0-9,]/g, '').split(",")
        return '#' + strOf(rgb[0]) + strOf(rgb[1]) + strOf(rgb[2])
    }

    const createColorBTN = color => {
        const btn = document.createElement('button')

        btn.className = 'color'
        btn.style.backgroundColor = color
        btn.addEventListener('click', () => {
            colorPicker.value = getHexOf(lineColor = btn.style.backgroundColor)
            eraserMode(false)
        })

        return btn
    }

    const eraserMode = erase => {
        if (erase) {
            lineColor = "#fff"
            eraseBTN.className += ' erase'
        } else eraseBTN.className = eraseBTN.className.replace('erase', '')
        renderCursor()
    }

    /**
     * SAVE & DOWNLOAD FUNCTIONALITY
     */
    const initCanvas = () => {
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Draw white rect
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        restoreCanvasData()
    }

    const createImgFor = dataURL => {
        let img = document.createElement('img')

        img.src = dataURL
        img.style.display = "inline-block"
        img.style.width = "calc(50% - 0.7em)"
        img.style.margin = "0.35em"
        img.style.borderRadius = "6px"
        img.style.boxShadow = "1px 1px 5px rgb(0, 0, 0, 0.15)"

        //! Revert
        img.addEventListener('click', () => {
            initCanvas()
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        })

        //! Download
        img.addEventListener('dblclick', () => {
            let a = document.createElement('a')
            a.download = 'just-paint.png'
            a.href = img.src
            a.click()
        })

        return img
    }

    const append = elem => {
        document.body.appendChild(elem)
        window.scrollTo({ top: document.body.clientHeight, behavior: 'smooth' })
    }

    const saveCanvasData = () => dataImg = createImgFor(canvas.toDataURL('image/png'))

    var restoreCanvasData = () => {
        if (dataImg != null) dataImg.onload = () => ctx.drawImage(dataImg, 0, 0)
    }

    /**
     * INIT CUSTOM CURSOR
     */
    const renderCursor = () => {
        let x = coord.x + cnvsBCRect.left - lineWidth / 2
        let y = coord.y + cnvsBCRect.top - lineWidth / 2

        cursor.style.transform = `translate(${x}px, ${y}px)`
        cursor.style.width = cursor.style.height = lineWidth + 'px'
        cursor.style.backgroundColor = lineColor
    }
    requestAnimationFrame(renderCursor)


    /**
     * REGISTER EVENTS
     */
    window.addEventListener('resize', resize);

    colorPicker.addEventListener('input', () => {
        lineColor = colorPicker.value
        renderCursor()
    })

    if (isMobile) colorPicker.addEventListener('click', () => lineColor = colorPicker.value)
    else colorPicker.addEventListener('change', () => colorsContainer.appendChild(createColorBTN(lineColor)))

    seekbar.addEventListener('input', () => {
        lineWidth = seekbar.value
        seekbar.style.height = lineWidth
        renderCursor()
    })

    document.querySelectorAll('#colorPicker, .ctrl').forEach(elem => elem.addEventListener('click', () => eraserMode(false)))

    eraseBTN.addEventListener('click', () => eraserMode(true))

    clearBTN.addEventListener('click', initCanvas)

    saveBTN.addEventListener('click', () => append(createImgFor(canvas.toDataURL('image/png')))) //! ("image/jpeg", 1.0)

    downloadBTN.addEventListener('click', () => alert('Under construction, Not finished yet'))

    canvas.addEventListener(isMobile ? 'touchstart' : 'mousedown', startPainting)
    canvas.addEventListener(isMobile ? 'touchend' : 'mouseup', stopPainting)
    canvas.addEventListener(isMobile ? 'touchmove' : 'mousemove', e => {
        sketch(e)
        getPosition(e)
        renderCursor()
    })

    resize() // Resizes the canvas once the window loads
}