// runtime: 69%
function getMaximumXor(nums: number[], maximumBit: number): number[] {
    let now = nums[0]
    const ma = (1<<maximumBit)-1
    let xor = [now^ma]

    for(let i =1;i< nums.length;i++){
        now = now^nums[i]
        xor.push(now^ma)
    }

    return xor.reverse()
    
};
