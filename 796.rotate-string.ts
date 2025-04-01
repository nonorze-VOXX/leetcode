// runtime: 100%
function rotateString(s: string, goal: string): boolean {
    const sl = s.length
    if(sl !== goal.length) return false
    let pre = 0;
    
    for(let i =0 ; i < sl;i++)
    {
        if(s[i]===goal[0]) {
            let flag = false
            for(let j =0;j< sl;j++){
                if(goal[j] !== s[(j+i) % sl]){
                    flag = true
                    break
                }
            }
            if( flag) continue
            return true
        }
    }
    return false
};
