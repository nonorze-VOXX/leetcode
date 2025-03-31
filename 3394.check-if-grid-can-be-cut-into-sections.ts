/*
 * @lc app=leetcode id=3394 lang=typescript
 *
 * [3394] Check if Grid can be Cut into Sections
 */

// @lc code=start
function checkValidCuts(n: number, rectangles: number[][]): boolean {
    const sortFn= (a,b)=>
    {
        if(a.start<b.start)
        {
            return -1
        }else if(a.start === b.start)
        {
            return a.end - a.start <b.end-b.start? 1: -1
        }else{
            return 1
        }
    }

    let rectanglesX = rectangles.map((e)=>{return {start: e[0], end:e[2]}}).sort( sortFn)
    let rectanglesY = rectangles.map((e)=>{return {start: e[1], end:e[3]}}).sort(sortFn)
    const decideFn = (pre:{start:number,end:number,ok:boolean, slicePoint:Set<number>},cur:{start:number, end:number})=>{
        if(!pre.ok){
            return pre
        }
        if(pre.start === cur.start)
        {
            return (pre.end<cur.end)?  {start:pre.start, end:cur.end, ok:true , slicePoint:pre.slicePoint} :  pre;
        }else if(pre.end > cur.start&&cur.end<=pre.end){
            return pre
        }else if(pre.end > cur.start&&cur.end>pre.end){
            return {start:pre.start, end:cur.end, ok:true,slicePoint: pre.slicePoint}
        } else{
            pre.slicePoint.add(pre.start)
            pre.slicePoint.add(pre.end)
            return {start:cur.start, end:cur.end, ok:true, slicePoint: pre.slicePoint}
        }
    }
    const x = rectanglesX.reduce(decideFn, {start:0,end:0, ok:true, slicePoint:new Set([0])})
    const y = rectanglesY.reduce(decideFn, {start:0,end:0, ok:true, slicePoint:new Set([0])})

    return (x.slicePoint.size>2|| y.slicePoint.size>2)
};
// @lc code=end

