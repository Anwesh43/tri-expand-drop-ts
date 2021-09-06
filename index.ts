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