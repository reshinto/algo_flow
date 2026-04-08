package heaps

import (
	"reflect"
	"testing"
)

func isPathValidHSN(array []int, startIdx int) bool {
	size := len(array)
	parentIdx := startIdx
	for {
		leftIdx := 2*parentIdx + 1
		rightIdx := 2*parentIdx + 2
		if leftIdx >= size {
			break
		}
		if array[parentIdx] > array[leftIdx] {
			return false
		}
		if rightIdx < size && array[parentIdx] > array[rightIdx] {
			return false
		}
		smallestChild := leftIdx
		if rightIdx < size && array[rightIdx] < array[leftIdx] {
			smallestChild = rightIdx
		}
		parentIdx = smallestChild
	}
	return true
}

func TestHeapifySingleNodeRoot(t *testing.T) {
	result := heapifySingleNode([]int{9, 1, 7, 2, 3, 8, 5, 6, 4}, 0)
	if !isPathValidHSN(result, 0) {
		t.Errorf("Path from root is not valid: %v", result)
	}
}

func TestHeapifySingleNodeRootBecomesMin(t *testing.T) {
	result := heapifySingleNode([]int{9, 1, 7, 2, 3, 8, 5, 6, 4}, 0)
	if result[0] != 1 {
		t.Errorf("Expected root=1, got %d", result[0])
	}
}

func TestHeapifySingleNodeNonRoot(t *testing.T) {
	result := heapifySingleNode([]int{1, 9, 2, 3, 4, 5, 6}, 1)
	if !isPathValidHSN(result, 1) {
		t.Errorf("Path from index 1 is not valid: %v", result)
	}
}

func TestHeapifySingleNodeNoOp(t *testing.T) {
	input := []int{1, 2, 3, 4, 5, 6, 7}
	result := heapifySingleNode(input, 0)
	if !reflect.DeepEqual(result, input) {
		t.Errorf("Expected no-op, got %v", result)
	}
}

func TestHeapifySingleNodeSingle(t *testing.T) {
	result := heapifySingleNode([]int{42}, 0)
	if !reflect.DeepEqual(result, []int{42}) {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestHeapifySingleNodeLeaf(t *testing.T) {
	input := []int{1, 2, 3, 4, 5}
	result := heapifySingleNode(input, 4)
	if !reflect.DeepEqual(result, input) {
		t.Errorf("Expected no-op for leaf, got %v", result)
	}
}
