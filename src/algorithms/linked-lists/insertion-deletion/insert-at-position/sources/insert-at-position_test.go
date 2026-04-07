package main

import (
    "reflect"
    "testing"
)

func buildListInsertAtPosition(values []int) *ListNode {
    var head *ListNode
    for idx := len(values) - 1; idx >= 0; idx-- {
        head = &ListNode{value: values[idx], next: head}
    }
    return head
}

func listToSliceInsertAtPosition(head *ListNode) []int {
    result := []int{}
    for head != nil {
        result = append(result, head.value)
        head = head.next
    }
    return result
}

func TestInsertAtPosition2(t *testing.T) {
    result := insertAtPosition(buildListInsertAtPosition([]int{1, 3, 5, 7}), 4, 2)
    if !reflect.DeepEqual(listToSliceInsertAtPosition(result), []int{1, 3, 4, 5, 7}) {
        t.Error("expected [1 3 4 5 7] after inserting 4 at position 2")
    }
}

func TestInsertAtPositionHead(t *testing.T) {
    result := insertAtPosition(buildListInsertAtPosition([]int{2, 3, 4}), 1, 0)
    if !reflect.DeepEqual(listToSliceInsertAtPosition(result), []int{1, 2, 3, 4}) {
        t.Error("expected [1 2 3 4] after inserting at head")
    }
}

func TestInsertAtPositionEnd(t *testing.T) {
    result := insertAtPosition(buildListInsertAtPosition([]int{1, 2, 3}), 4, 3)
    if !reflect.DeepEqual(listToSliceInsertAtPosition(result), []int{1, 2, 3, 4}) {
        t.Error("expected [1 2 3 4] after inserting at end")
    }
}

func TestInsertAtPositionEmptyListAtZero(t *testing.T) {
    result := insertAtPosition(nil, 5, 0)
    if !reflect.DeepEqual(listToSliceInsertAtPosition(result), []int{5}) {
        t.Error("expected [5] after inserting into empty list at position 0")
    }
}

func TestInsertAtPositionSingleNodeAt1(t *testing.T) {
    result := insertAtPosition(buildListInsertAtPosition([]int{10}), 20, 1)
    if !reflect.DeepEqual(listToSliceInsertAtPosition(result), []int{10, 20}) {
        t.Error("expected [10 20] after inserting into single-node list at position 1")
    }
}

func TestInsertAtPositionBeyondLength(t *testing.T) {
    result := insertAtPosition(buildListInsertAtPosition([]int{1, 2}), 3, 10)
    if !reflect.DeepEqual(listToSliceInsertAtPosition(result), []int{1, 2}) {
        t.Error("expected [1 2] unchanged when position exceeds length")
    }
}

func TestInsertAtPositionZeroValue(t *testing.T) {
    result := insertAtPosition(buildListInsertAtPosition([]int{1, 2}), 0, 1)
    if !reflect.DeepEqual(listToSliceInsertAtPosition(result), []int{1, 0, 2}) {
        t.Error("expected [1 0 2] after inserting 0 at position 1")
    }
}
