// runtime: 77%
function compressedString(word: string): string {
    const n = word.length
    let comp = ''
    let now =0;
    let i = 1;
    while (n > now) {
        let c = word[now]
        for (i=1; word[now+i] === c && i < 9;)  { i++}
        now+=i
        comp = comp + i + c
    }
    return comp
};
