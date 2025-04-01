// runtime: beat 72%, mem: beat 42%
function mostPoints(questions: number[][]): number {
    const n = questions.length;
    const dp : number[]= Array(n).fill(0)// question i can get max score
    const indexScore = 0;
    const indexBrain = 1;
    for(let i = n-1;i >=0;i--){
        const now = questions[i]
        const score = now[indexScore]
        const next = i+ now[indexBrain]+1
        if(next <n){
            dp[i] = Math.max(score+dp[next], dp[i+1] )
        }else if(i+1<n){
            dp[i] = Math.max(score, dp[i+1])
        }else{
            dp[i] = score

        }
    }
    return dp[0]
};
