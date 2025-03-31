/*
 * @lc app=leetcode id=2033 lang=typescript
 *
 * [2033] Minimum Operations to Make a Uni-Value Grid
 */
// @lc code=start
function minOperations(grid: number[][], x: number): number {
    let flatGrid = grid.flat();
    let mod  = flatGrid.map(e => (e-grid[0][0])/x).sort((a,b)=>a-b)
    let allWork = mod.reduce((pre,cur)=>pre&&Number.isInteger(cur), true)
    if(!allWork) return -1
    let mid = mod[Math.round(mod.length/2)-1]
    let result = mod.reduce((pre,cur)=> pre+ Math.abs(cur-mid) , 0)
    return result
};
// @lc code=end

