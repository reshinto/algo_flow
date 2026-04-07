// Online Stock Span — for each day's price, count consecutive days (including today) where price <= today's price
package main

import "fmt"

type priceSpanPair struct {
	price int
	span  int
}

func onlineStockSpan(prices []int) []int {
	result := make([]int, len(prices)) // @step:initialize
	// Stack holds price+span pairs in monotonic decreasing order by price
	stack := []priceSpanPair{} // @step:initialize

	for priceIdx, currentPrice := range prices {
		// @step:visit
		spanCount := 1 // @step:visit

		// Pop all stack entries with price <= currentPrice, accumulating their spans
		for len(stack) > 0 && stack[len(stack)-1].price <= currentPrice { // @step:compare
			spanCount += stack[len(stack)-1].span // @step:maintain-monotonic
			stack = stack[:len(stack)-1] // @step:maintain-monotonic
		}

		stack = append(stack, priceSpanPair{price: currentPrice, span: spanCount}) // @step:push
		result[priceIdx] = spanCount // @step:resolve
	}

	return result // @step:complete
}

func main() {
	prices := []int{100, 80, 60, 70, 60, 75, 85}
	fmt.Println(onlineStockSpan(prices))
}
