package main

import "testing"

func makeDCNode(value int, left *BinaryNode, right *BinaryNode) *BinaryNode {
	return &BinaryNode{value: value, left: left, right: right}
}

func dcLeaf(value int) *BinaryNode {
	return &BinaryNode{value: value}
}

func TestDistributeCoinsNullRoot(t *testing.T) {
	if distributeCoins(nil) != 0 {
		t.Error("null root should return 0")
	}
}

func TestDistributeCoinsSingleNodeOneCoin(t *testing.T) {
	if distributeCoins(dcLeaf(1)) != 0 {
		t.Error("single node with 1 coin should return 0")
	}
}

func TestDistributeCoinsRootTwoCoins(t *testing.T) {
	root := makeDCNode(2, dcLeaf(0), nil)
	if distributeCoins(root) != 1 {
		t.Error("root with 2 coins and child with 0 should need 1 move")
	}
}

func TestDistributeCoinsRootThreeCoins(t *testing.T) {
	root := makeDCNode(3, dcLeaf(0), dcLeaf(0))
	if distributeCoins(root) != 2 {
		t.Error("root with 3 coins and two zero children should need 2 moves")
	}
}

func TestDistributeCoinsAllCoinsAtDeepLeaf(t *testing.T) {
	root := makeDCNode(0, makeDCNode(0, dcLeaf(3), nil), dcLeaf(0))
	if distributeCoins(root) != 4 {
		t.Error("all coins at deep leaf should need 4 moves")
	}
}
