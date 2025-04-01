// runtime:100%
function canSortArray(nums: number[]): boolean {
    const BinCount = 
        e=> {
            let c = 0
            while(e!==0){
                c+=(e%2);
                e= e>>1;
            }
            return c
        }

    const obc =nums.map( BinCount ) 
    let i = 0
    while(i<nums.length){
        if(i<1) i++
        else {
            if(nums[i] >=nums[i-1]){
                i++
            }else{
                let t = nums[i-1]
                nums[i-1]= nums[i]
                nums[i]= t
                if(obc[i]!==obc[i-1])
                    return false
                i--;
            }
        }
    }
    return true
};
