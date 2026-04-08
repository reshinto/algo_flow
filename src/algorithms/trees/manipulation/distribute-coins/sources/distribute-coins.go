// Distribute Coins — DFS: each node sends or receives excess coins from children

package main

type BinaryNode struct {
	value int // number of coins at this node
	left  *BinaryNode
	right *BinaryNode
}

func dfs(node *BinaryNode, totalMoves *int) int {
	if node == nil {
		return 0 // @step:initialize
	}

	// Get excess from left and right children
	leftExcess := dfs(node.left, totalMoves)   // @step:traverse-left
	rightExcess := dfs(node.right, totalMoves) // @step:traverse-right

	// Each move on the edge to a child counts
	excess := leftExcess + rightExcess
	if excess < 0 {
		excess = -excess
	}
	absLeft := leftExcess
	if absLeft < 0 {
		absLeft = -absLeft
	}
	absRight := rightExcess
	if absRight < 0 {
		absRight = -absRight
	}
	*totalMoves += absLeft + absRight // @step:accumulate

	// Excess this node sends upward: (coins here) + (excess from children) - 1 (keep 1)
	return node.value + leftExcess + rightExcess - 1 // @step:visit
}

func distributeCoins(root *BinaryNode) int {
	totalMoves := 0             // @step:initialize
	dfs(root, &totalMoves)      // @step:initialize
	return totalMoves           // @step:complete
}
