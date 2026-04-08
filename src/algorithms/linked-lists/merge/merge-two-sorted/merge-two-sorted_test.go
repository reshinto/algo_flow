package main

import (
    "reflect"
    "testing"
)

func buildListMergeTwoSorted(values []int) *ListNode {
    var head *ListNode
    for idx := len(values) - 1; idx >= 0; idx-- {
        head = &ListNode{value: values[idx], next: head}
    }
    return head
}

func listToSliceMergeTwoSorted(head *ListNode) []int {
    result := []int{}
    for head != nil {
        result = append(result, head.value)
        head = head.next
    }
    return result
}

func TestMergeTwoSortedInterleaved(t *testing.T) {
    result := mergeTwoSorted(buildListMergeTwoSorted([]int{1, 3, 5, 7}), buildListMergeTwoSorted([]int{2, 4, 6, 8}))
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{1, 2, 3, 4, 5, 6, 7, 8}) {
        t.Error("expected [1 2 3 4 5 6 7 8] from interleaved merge")
    }
}

func TestMergeTwoSortedBothEmpty(t *testing.T) {
    result := mergeTwoSorted(nil, nil)
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{}) {
        t.Error("expected empty slice for two empty lists")
    }
}

func TestMergeTwoSortedEmptyWithNonempty(t *testing.T) {
    result := mergeTwoSorted(nil, buildListMergeTwoSorted([]int{1, 2, 3}))
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{1, 2, 3}) {
        t.Error("expected [1 2 3] when merging empty with [1 2 3]")
    }
}

func TestMergeTwoSortedNonemptyWithEmpty(t *testing.T) {
    result := mergeTwoSorted(buildListMergeTwoSorted([]int{1, 2, 3}), nil)
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{1, 2, 3}) {
        t.Error("expected [1 2 3] when merging [1 2 3] with empty")
    }
}

func TestMergeTwoSortedSingleNodes(t *testing.T) {
    result := mergeTwoSorted(buildListMergeTwoSorted([]int{1}), buildListMergeTwoSorted([]int{2}))
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{1, 2}) {
        t.Error("expected [1 2] from single-node merge")
    }
}

func TestMergeTwoSortedNonoverlappingABeforeB(t *testing.T) {
    result := mergeTwoSorted(buildListMergeTwoSorted([]int{1, 2, 3}), buildListMergeTwoSorted([]int{4, 5, 6}))
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{1, 2, 3, 4, 5, 6}) {
        t.Error("expected [1 2 3 4 5 6] when A is entirely before B")
    }
}

func TestMergeTwoSortedNonoverlappingBBeforeA(t *testing.T) {
    result := mergeTwoSorted(buildListMergeTwoSorted([]int{4, 5, 6}), buildListMergeTwoSorted([]int{1, 2, 3}))
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{1, 2, 3, 4, 5, 6}) {
        t.Error("expected [1 2 3 4 5 6] when B is entirely before A")
    }
}

func TestMergeTwoSortedDuplicateValues(t *testing.T) {
    result := mergeTwoSorted(buildListMergeTwoSorted([]int{1, 3, 5}), buildListMergeTwoSorted([]int{1, 4, 5}))
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{1, 1, 3, 4, 5, 5}) {
        t.Error("expected [1 1 3 4 5 5] from lists with duplicate values")
    }
}

func TestMergeTwoSortedSingleNodesReversed(t *testing.T) {
    result := mergeTwoSorted(buildListMergeTwoSorted([]int{5}), buildListMergeTwoSorted([]int{3}))
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{3, 5}) {
        t.Error("expected [3 5] from merging [5] with [3]")
    }
}

func TestMergeTwoSortedUnequalLengths(t *testing.T) {
    result := mergeTwoSorted(buildListMergeTwoSorted([]int{10, 20, 30}), buildListMergeTwoSorted([]int{15, 25}))
    if !reflect.DeepEqual(listToSliceMergeTwoSorted(result), []int{10, 15, 20, 25, 30}) {
        t.Error("expected [10 15 20 25 30] from unequal-length merge")
    }
}
