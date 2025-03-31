/*
 * @lc app=leetcode id=2503 lang=typescript
 *
 * [2503] Maximum Number of Points From Grid Queries
 */

// @lc code=start
function maxPoints(grid: number[][], queries: number[]): number[] {
    // const dp :number[]= []
    const input = queries.map(e => e)
    const m = grid.length
    const n = grid[0].length
    let visited = Array.from(
        { length: m },
        i => i = Array.from(
            { length: n },

            j => j = false
        )
    )
    let needToCheck = [{ x: 0, y: 0 ,v:grid[0][0] }]
    let count = 0
    const tryAdd = (set, x, y) => {

        if (x >= 0 && x < n && y >= 0 && y < m&&!visited[y][x]) {
            set.add({ x, y })
        }
    }
    let dp = {}
    const f = (e: number) => {
        while (1) {
            const newNeedtoCheck: Set<{ x: number, y: number }> = new Set();
            let haveNew = false
            let i 
            for(i = 0;i< needToCheck.length;i++)
            {
                let {x,y,v} = needToCheck[i]
                
                if (!visited[y][x] && v < e) {
                    tryAdd(newNeedtoCheck, x, y + 1)
                    tryAdd(newNeedtoCheck, x, y - 1)
                    tryAdd(newNeedtoCheck, x + 1, y)
                    tryAdd(newNeedtoCheck, x - 1, y)
                    visited[y][x] = true
                    count++
                    haveNew = true

                }else if(v>=e){
                    break;
                }
            }
            needToCheck.splice(0, i);

            i = 0
            Array.from(newNeedtoCheck).sort((a,b )=>grid[a.y][a.x]- grid[b.y][b.x]).forEach(
                k => {
                    while(1){
                        if(i>= needToCheck.length){
                            needToCheck.push({...k, v:grid[k.y][k.x]});
                            break
                        }
                        if(needToCheck[i].v>grid[k.y][k.x]) { needToCheck.splice(i, 0,{...k, v:grid[k.y][k.x]}) ; break;}
                        i++
                    }
                }
            )

            if (!haveNew) break;
        }
        return count;
    }
    queries.sort((a, b) => a - b).forEach(
        (e) => {
            if (!dp[e]) {
                dp[e] = //visited.flat().reduce((pre,cur)=>cur?pre+1:pre,0)
                f(e)
            }
        }
    )
    return input.map(e => dp[e])
}


// @lc code=end

