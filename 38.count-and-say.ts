function countAndSay(n: number): string {
    if(n===1) return "1"
    let ns = countAndSay(n-1), ans = '', c = 1, now = ns[0]
    for(let i = 1 ; i < ns.length;i++)
        if(ns[i] === now) c++
        else{
            ans= ans+ c + now
            now = ns[i]
            c= 1
        }
    ans= ans+ c + now
    return ans
};
