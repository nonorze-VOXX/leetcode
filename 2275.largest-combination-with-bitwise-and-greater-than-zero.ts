// runtime 100%
function largestCombination(candidates: number[]): number {
    if(candidates.length===1) return 1
    let counter = Array(24).fill(0)
    candidates.forEach(e=>{
        for(let i = 0;i< 24;i++)
        {
            counter[i]+=e%2
            e= e>>1
        }
    })
    
    return counter.reduce((pre,cur)=> pre>cur? pre:cur, 0)
    
};
