// runtime: 85%
function minChanges(s: string): number {
    let counter = 0
    for(let i = 0;i< s.length;) if(s[i++]!==s[i++]) counter++
    return counter;
};
