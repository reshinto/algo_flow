package main

import (
    "reflect"
    "testing"
)

func buildListRemoveDuplicatesSorted(values []int) *ListNode {
    var head *ListNode
    for idx := len(values) - 1; idx >= 0; idx-- {
        head = &ListNode{value: values[idx], next: head}
    }
    return head
}

func listToSliceRemoveDuplicatesSorted(head *ListNode) []int {
    result := []int{}
    for head != nil {
        result = append(result, head.value)
        head = head.next
    }
    return result
}

func TestRemoveDuplicatesSortedConsecutive(t *testing.T) {
    result := removeDuplicatesSorted(buildListRemoveDuplicatesSorted([]int{1, 1, 2, 3, 3, 3, 4, 5, 5}))
    if !reflect.DeepEqual(listToSliceRemoveDuplicatesSorted(result), []int{1, 2, 3, 4, 5}) {
        t.Error("expected [1 2 3 4 5] after removing consecutive duplicates")
    }
}

func TestRemoveDuplicatesSortedNoDuplicates(t *testing.T) {
    result := removeDuplicatesSorted(buildListRemoveDuplicatesSorted([]int{1, 2, 3, 4, 5}))
    if !reflect.DeepEqual(listToSliceRemoveDuplicatesSorted(result), []int{1, 2, 3, 4, 5}) {
        t.Error("expected list unchanged when no duplicates")
    }
}

func TestRemoveDuplicatesSortedAllSame(t *testing.T) {
    result := removeDuplicatesSorted(buildListRemoveDuplicatesSorted([]int{7, 7, 7, 7}))
    if !reflect.DeepEqual(listToSliceRemoveDuplicatesSorted(result), []int{7}) {
        t.Error("expected [7] for all-duplicate list")
    }
}

func TestRemoveDuplicatesSortedEmptyList(t *testing.T) {
    result := removeDuplicatesSorted(nil)
    if result != nil {
        t.Error("expected nil for empty list")
    }
}

func TestRemoveDuplicatesSortedSingleElement(t *testing.T) {
    result := removeDuplicatesSorted(buildListRemoveDuplicatesSorted([]int{5}))
    if !reflect.DeepEqual(listToSliceRemoveDuplicatesSorted(result), []int{5}) {
        t.Error("expected [5] for single-element list")
    }
}

func TestRemoveDuplicatesSortedTwoElementDuplicates(t *testing.T) {
    result := removeDuplicatesSorted(buildListRemoveDuplicatesSorted([]int{3, 3}))
    if !reflect.DeepEqual(listToSliceRemoveDuplicatesSorted(result), []int{3}) {
        t.Error("expected [3] after deduplication of [3 3]")
    }
}

func TestRemoveDuplicatesSortedTwoDifferentElements(t *testing.T) {
    result := removeDuplicatesSorted(buildListRemoveDuplicatesSorted([]int{1, 2}))
    if !reflect.DeepEqual(listToSliceRemoveDuplicatesSorted(result), []int{1, 2}) {
        t.Error("expected [1 2] unchanged for two different elements")
    }
}

func TestRemoveDuplicatesSortedMixedRunLengths(t *testing.T) {
    result := removeDuplicatesSorted(buildListRemoveDuplicatesSorted([]int{1, 2, 2, 3, 3, 3, 4}))
    if !reflect.DeepEqual(listToSliceRemoveDuplicatesSorted(result), []int{1, 2, 3, 4}) {
        t.Error("expected [1 2 3 4] after mixed run deduplication")
    }
}
