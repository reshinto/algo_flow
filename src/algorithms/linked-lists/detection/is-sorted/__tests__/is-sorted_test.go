package main

import "testing"

func buildListIsSorted(values []int) *ListNode {
    var head *ListNode
    for idx := len(values) - 1; idx >= 0; idx-- {
        head = &ListNode{value: values[idx], next: head}
    }
    return head
}

func TestIsSortedSortedList(t *testing.T) {
    if !isSorted(buildListIsSorted([]int{1, 3, 5, 7, 9})) {
        t.Error("expected true for sorted list [1, 3, 5, 7, 9]")
    }
}

func TestIsSortedEmptyList(t *testing.T) {
    if !isSorted(nil) {
        t.Error("expected true for empty list")
    }
}

func TestIsSortedSingleNode(t *testing.T) {
    if !isSorted(buildListIsSorted([]int{42})) {
        t.Error("expected true for single-node list [42]")
    }
}

func TestIsSortedUnsortedList(t *testing.T) {
    if isSorted(buildListIsSorted([]int{1, 5, 3, 7})) {
        t.Error("expected false for unsorted list [1, 5, 3, 7]")
    }
}

func TestIsSortedListWithDuplicates(t *testing.T) {
    if !isSorted(buildListIsSorted([]int{2, 2, 3, 3, 5})) {
        t.Error("expected true for list with duplicates [2, 2, 3, 3, 5]")
    }
}

func TestIsSortedTwoNodeSorted(t *testing.T) {
    if !isSorted(buildListIsSorted([]int{1, 2})) {
        t.Error("expected true for two-node sorted list [1, 2]")
    }
}

func TestIsSortedTwoNodeUnsorted(t *testing.T) {
    if isSorted(buildListIsSorted([]int{5, 2})) {
        t.Error("expected false for two-node unsorted list [5, 2]")
    }
}

func TestIsSortedFirstPairUnsorted(t *testing.T) {
    if isSorted(buildListIsSorted([]int{5, 1, 2, 3})) {
        t.Error("expected false when first pair is unsorted [5, 1, 2, 3]")
    }
}

func TestIsSortedLongSortedList(t *testing.T) {
    if !isSorted(buildListIsSorted([]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})) {
        t.Error("expected true for long sorted list")
    }
}

func TestIsSortedLastPairUnsorted(t *testing.T) {
    if isSorted(buildListIsSorted([]int{1, 2, 3, 2})) {
        t.Error("expected false when last pair is unsorted [1, 2, 3, 2]")
    }
}
