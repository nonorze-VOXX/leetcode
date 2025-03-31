package main

/*
 * @lc app=leetcode id=2503 lang=golang
 *
 * [2503] Maximum Number of Points From Grid Queries
 */

// @lc code=start

import (
	"container/heap"
	"sort"
)

type V2 struct {
	y int
	x int
}

// An Item is something we manage in a priority queue.
type Item struct {
	value    V2  // The value of the item; arbitrary.
	priority int // The priority of the item in the queue.
	// The index is needed by update and is maintained by the heap.Interface methods.
	index int // The index of the item in the heap.
}

// A PriorityQueue implements heap.Interface and holds Items.
type PriorityQueue []*Item

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
	// We want Pop to give us the highest, not lowest, priority so we use greater than here.
	return pq[i].priority < pq[j].priority
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].index = i
	pq[j].index = j
}

func (pq *PriorityQueue) Push(x any) {
	n := len(*pq)
	item := x.(*Item)
	item.index = n
	*pq = append(*pq, item)
}

func (pq *PriorityQueue) Pop() any {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil  // don't stop the GC from reclaiming the item eventually
	item.index = -1 // for safety
	*pq = old[0 : n-1]
	return item
}

// update modifies the priority and value of an Item in the queue.
func (pq *PriorityQueue) update(item *Item, value V2, priority int) {
	item.value = value
	item.priority = priority
	heap.Fix(pq, item.index)
}

// This example creates a PriorityQueue with some items, adds and manipulates an item,
// and then removes the items in priority order.
func maxPoints(grid [][]int, queries []int) []int {
	original := make([]int, len(queries))
	for i, v := range queries {
		original[i] = v
	}

	m := len(grid)
	n := len(grid[0])

	visited := make([][]bool, m)
	for ind, _ := range visited {
		visited[ind] = make([]bool, n)

	}
	needToCheck := PriorityQueue{}
	heap.Push(&needToCheck, &Item{value: V2{0, 0}, priority: grid[0][0], index: 0})
	heap.Init(&needToCheck)

	visited[0][0] = true
	count := 0

	sort.Slice(queries, func(i, j int) bool { return queries[i] < queries[j] })

	dp := make([]int, queries[len(queries)-1]+1)
	for _, query := range queries {
		if dp[query] == 0 {
			for {
				if len(needToCheck) == 0 {
					break
				}
				c := heap.Pop(&needToCheck).(*Item)
				if c.priority >= query {
					heap.Push(&needToCheck, c)
					break
				}

				if c.value.x+1 < n && !visited[c.value.y][c.value.x+1] {
					visited[c.value.y][c.value.x+1] = true
					it := &Item{value: V2{c.value.y, c.value.x + 1}, priority: grid[c.value.y][c.value.x+1]}
					heap.Push(&needToCheck, it)
					needToCheck.update(it, it.value, it.priority)
				}
				if c.value.x-1 >= 0 && !visited[c.value.y][c.value.x-1] {
					visited[c.value.y][c.value.x-1] = true
					it := &Item{value: V2{c.value.y, c.value.x - 1}, priority: grid[c.value.y][c.value.x-1]}
					heap.Push(&needToCheck, it)
					needToCheck.update(it, it.value, it.priority)
				}
				if c.value.y+1 < m && !visited[c.value.y+1][c.value.x] {
					visited[c.value.y+1][c.value.x] = true
					it := &Item{value: V2{c.value.y + 1, c.value.x}, priority: grid[c.value.y+1][c.value.x]}
					heap.Push(&needToCheck, it)
					needToCheck.update(it, it.value, it.priority)
				}
				if c.value.y-1 >= 0 && !visited[c.value.y-1][c.value.x] {
					visited[c.value.y-1][c.value.x] = true
					it := &Item{value: V2{c.value.y - 1, c.value.x}, priority: grid[c.value.y-1][c.value.x]}
					heap.Push(&needToCheck, it)
					needToCheck.update(it, it.value, it.priority)
				}
				count++
			}
			dp[query] = count
		}
	}
	var result []int

	for _, query := range original {
		result = append(result, dp[query])
	}
	return result
}

// @lc code=end
