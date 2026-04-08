package main

import (
    "reflect"
    "testing"
)

func buildListDeleteByValue(values []int) *ListNode {
    var head *ListNode
    for idx := len(values) - 1; idx >= 0; idx-- {
        head = &ListNode{value: values[idx], next: head}
    }
    return head
}

func listToSliceDeleteByValue(head *ListNode) []int {
    result := []int{}
    for head != nil {
        result = append(result, head.value)
        head = head.next
    }
    return result
}

func TestDeleteByValueMiddle(t *testing.T) {
    result := deleteByValue(buildListDeleteByValue([]int{1, 2, 3, 4, 5}), 3)
    if !reflect.DeepEqual(listToSliceDeleteByValue(result), []int{1, 2, 4, 5}) {
        t.Error("expected [1 2 4 5] after deleting 3 from middle")
    }
}

func TestDeleteByValueHead(t *testing.T) {
    result := deleteByValue(buildListDeleteByValue([]int{1, 2, 3}), 1)
    if !reflect.DeepEqual(listToSliceDeleteByValue(result), []int{2, 3}) {
        t.Error("expected [2 3] after deleting head")
    }
}

func TestDeleteByValueLast(t *testing.T) {
    result := deleteByValue(buildListDeleteByValue([]int{1, 2, 3, 4}), 4)
    if !reflect.DeepEqual(listToSliceDeleteByValue(result), []int{1, 2, 3}) {
        t.Error("expected [1 2 3] after deleting last node")
    }
}

func TestDeleteByValueEmptyList(t *testing.T) {
    result := deleteByValue(nil, 5)
    if result != nil {
        t.Error("expected nil for empty list")
    }
}

func TestDeleteByValueTargetNotFound(t *testing.T) {
    result := deleteByValue(buildListDeleteByValue([]int{1, 2, 3}), 99)
    if !reflect.DeepEqual(listToSliceDeleteByValue(result), []int{1, 2, 3}) {
        t.Error("expected list unchanged when target not found")
    }
}

func TestDeleteByValueSingleNodeMatch(t *testing.T) {
    result := deleteByValue(buildListDeleteByValue([]int{7}), 7)
    if !reflect.DeepEqual(listToSliceDeleteByValue(result), []int{}) {
        t.Error("expected empty list after deleting only node")
    }
}

func TestDeleteByValueSingleNodeNoMatch(t *testing.T) {
    result := deleteByValue(buildListDeleteByValue([]int{7}), 5)
    if !reflect.DeepEqual(listToSliceDeleteByValue(result), []int{7}) {
        t.Error("expected [7] when single-node value differs from target")
    }
}

func TestDeleteByValueFirstOccurrenceOnly(t *testing.T) {
    result := deleteByValue(buildListDeleteByValue([]int{1, 2, 2, 3}), 2)
    if !reflect.DeepEqual(listToSliceDeleteByValue(result), []int{1, 2, 3}) {
        t.Error("expected only first occurrence deleted [1 2 3]")
    }
}
