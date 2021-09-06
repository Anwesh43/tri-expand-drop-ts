const w : number = window.innerWidth
const h : number = window.innerHeight 
const lines : number = 3 
const parts : number = 3 
const scGap : number = 0.03 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 7.9 
const backColor : string = "#BDBDBD"
const colors : Array<string> = [
    "#B71C1C",
    "#0D47A1",
    "#0D47A1",
    "#00C853",
    "#FF6D00"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawTriExpandDrop(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const sc3 : number = ScaleUtil.divideScale(scale, 2, parts)
        context.save()
        context.translate(w / 2, h / 2 + (h / 2 + size) * sc3)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1 - 2 * j, 1)
            context.translate(-size * 0.5 * sc2, -size / 2)
            DrawingUtil.drawLine(context, 0, 0, 0, size * sc1)
            context.restore()
        }
        for (var j = 0; j < lines; j++) {
            context.save()
            context.translate(-size * 0.5 * sc1, -size / 2 + size * 0.5 * j)
            DrawingUtil.drawLine(context, -size * 0.5 * sc1, 0, size * sc2 * 0.5, 0)
            context.restore()
        }
        context.restore()
    }

    static drawTEDNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        DrawingUtil.drawTriExpandDrop(context, scale)
    }
}