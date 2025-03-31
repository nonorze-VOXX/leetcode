/*
 * @lc app=leetcode id=763 lang=typescript
 *
 * [763] Partition Labels
 */

// @lc code=start
function partitionLabels(s: string): number[] {
    let contain  = new Set()
    let ans:number[]  = []
    let flIndex = {}
    for ( let i =0; i<s.length; i++)
    {
        let cha = s[i]
        if(! contain.has(cha)){
            contain.add(cha)
            flIndex[cha] = {first:i}
        }
        flIndex[cha].last = i
    }
    let last = 0;
    let first = 0;
    Object.keys(flIndex).forEach(
        e=>{
            let {first:v, last: l}=  flIndex[e]
             if( v > last){
                ans.push(last- first+1)
                first = v
                last= l
            }
            else
            if( l>last){
                last= l
            }
        }
    )
    ans.push(last- first+1)
    return ans 
};
// @lc code=end

