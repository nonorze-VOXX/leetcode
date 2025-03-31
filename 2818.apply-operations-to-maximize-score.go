/*
 * @lc app=leetcode id=2818 lang=golang
 *
 * [2818] Apply Operations to Maximize Score
 */

package main

import (
	"math"
	"sort"
)

// @lc code=start
func prime(k int, table []int) int {
	if table[k] != 0 || k == 1 || k == 0 {
		return table[k]
	}
	c := 0
	sq := math.Sqrt(float64(k))
	now := k

	for i := 2; i <= int(math.Ceil(sq)); i++ {
		m := now % i
		if m == 0 {
			for {
				now /= i
				if now%i != 0 {
					break
				}
			}
			c++
		}
	}
	if now != 1 {
		c++
	}
	table[k] = c
	return c

}

type t struct {
	original int
	prime    int
	index    int
}

type Stack struct {
	list []int
}

func New() *Stack {
	s := new(Stack)
	s.list = make([]int, 0, 8)
	return s
}

func (s *Stack) IsEmpty() bool {
	return len(s.list) == 0
}
func (s *Stack) Pop() int {
	if s.IsEmpty() {
		return -1
	}
	tmp := s.list[len(s.list)-1]
	s.list = s.list[:len(s.list)-1]
	return tmp
}

func (s *Stack) Push(element int) {
	s.list = append(s.list, element)
}
func (s *Stack) Top() int {
	return s.list[len(s.list)-1]
}

func (s *Stack) ToSlice() []int {
	return s.list
}

func maximumScore(nums []int, k int) int {
	numslen := len(nums)
	table := make([]int, 100010)
	table[1] = 0
	table[2] = 1
	table[3] = 1
	table[4] = 1
	table[5] = 1
	mod := (1000000000 + 7)
	primeArr := make([]int, len(nums))
	tArr := make([]t, len(nums))
	for i, v := range nums {
		p := prime(v, table)
		tArr[i] = t{v, p, i}
		primeArr[i] = p
	}
	sort.Slice(tArr, func(i, j int) bool {
		return tArr[i].original > tArr[j].original
	})
	leftBigger := make([]int, len(nums))
	rightBigger := make([]int, len(nums))

	stack := Stack{}
	for i := 0; i < numslen; i++ {
		for !stack.IsEmpty() && primeArr[stack.Top()] < primeArr[i] {
			stack.Pop()
		}
		if stack.IsEmpty() {
			leftBigger[i] = -1
		} else {
			leftBigger[i] = stack.Top()
		}
		stack.Push(i)
	}
	stack = Stack{}
	for i := numslen - 1; i >= 0; i-- {
		for !stack.IsEmpty() && primeArr[stack.Top()] <= primeArr[i] {
			stack.Pop()
		}
		if stack.IsEmpty() {
			rightBigger[i] = -1
		} else {
			rightBigger[i] = stack.Top()
		}
		stack.Push(i)
	}

	use := 0
	ans := 1
	for loo := 0; loo < k; {
		ans = ans % mod
		if use >= len(tArr) {
			ans *= tArr[0].original
			loo++
			continue
		}

		l := 0
		var lb int = 0
		lb = leftBigger[tArr[use].index]
		if lb != -1 {
			l = tArr[use].index - lb - 1
		} else if lb == -1 {
			l = tArr[use].index
		}
		r := 0
		rb := rightBigger[tArr[use].index]
		if rb != -1 {
			if primeArr[rb] <= primeArr[tArr[use].index] {
				r = rb - tArr[use].index
			} else {
				r = rb - tArr[use].index - 1
			}
		} else if rb == -1 {
			r = numslen - 1 - tArr[use].index
		}
		mulTime := (l + 1) * (r + 1)
		var smaller int
		if mulTime < k-loo {
			smaller = mulTime
		} else {
			smaller = k - loo
		}

		tmp := tArr[use].original
		loo += smaller
		for smaller != 0 {
			if smaller&1 == 1 {
				ans = ans * tmp % mod
			}
			smaller >>= 1
			tmp = (tmp * tmp) % mod
		}

		use++
	}

	return ans

}

// @lc code=end
