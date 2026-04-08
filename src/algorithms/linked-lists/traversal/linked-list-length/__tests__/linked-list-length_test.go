package main

import "testing"

func buildListLinkedListLength(values []int) *ListNode {
    var head *ListNode
    for idx := len(values) - 1; idx >= 0; idx-- {
        head = &ListNode{value: values[idx], next: head}
    }
    return head
}

func TestLinkedListLengthFiveNodes(t *testing.T) {
    result := linkedListLength(buildListLinkedListLength([]int{1, 2, 3, 4, 5}))
    if result != 5 {
        t.Errorf("expected 5, got %d", result)
    }
}

func TestLinkedListLengthNullInput(t *testing.T) {
    result := linkedListLength(nil)
    if result != 0 {
        t.Errorf("expected 0 for null input, got %d", result)
    }
}

func TestLinkedListLengthSingleNode(t *testing.T) {
    result := linkedListLength(buildListLinkedListLength([]int{42}))
    if result != 1 {
        t.Errorf("expected 1 for single-node list, got %d", result)
    }
}

func TestLinkedListLengthThreeNodes(t *testing.T) {
    result := linkedListLength(buildListLinkedListLength([]int{10, 20, 30}))
    if result != 3 {
        t.Errorf("expected 3 for 3-node list, got %d", result)
    }
}

func TestLinkedListLengthTenNodes(t *testing.T) {
    result := linkedListLength(buildListLinkedListLength([]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}))
    if result != 10 {
        t.Errorf("expected 10 for 10-node list, got %d", result)
    }
}
