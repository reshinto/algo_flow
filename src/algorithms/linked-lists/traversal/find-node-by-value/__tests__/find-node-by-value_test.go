package main

import "testing"

func buildListFindNodeByValue(values []int) *ListNode {
    var head *ListNode
    for idx := len(values) - 1; idx >= 0; idx-- {
        head = &ListNode{value: values[idx], next: head}
    }
    return head
}

func TestFindNodeByValueAtHead(t *testing.T) {
    result := findNodeByValue(buildListFindNodeByValue([]int{5, 2, 3, 4}), 5)
    if result == nil || result.value != 5 {
        t.Error("expected node with value 5 when target is at head")
    }
}

func TestFindNodeByValueInMiddle(t *testing.T) {
    result := findNodeByValue(buildListFindNodeByValue([]int{1, 2, 7, 4, 5}), 7)
    if result == nil || result.value != 7 {
        t.Error("expected node with value 7 when target is in middle")
    }
}

func TestFindNodeByValueAtEnd(t *testing.T) {
    result := findNodeByValue(buildListFindNodeByValue([]int{1, 2, 3, 9}), 9)
    if result == nil || result.value != 9 {
        t.Error("expected node with value 9 when target is at end")
    }
}

func TestFindNodeByValueNotFound(t *testing.T) {
    result := findNodeByValue(buildListFindNodeByValue([]int{1, 2, 3, 4}), 42)
    if result != nil {
        t.Error("expected nil when target is not found")
    }
}

func TestFindNodeByValueEmptyList(t *testing.T) {
    result := findNodeByValue(nil, 5)
    if result != nil {
        t.Error("expected nil for empty list")
    }
}

func TestFindNodeByValueSingleNodeMatch(t *testing.T) {
    result := findNodeByValue(buildListFindNodeByValue([]int{42}), 42)
    if result == nil || result.value != 42 {
        t.Error("expected node with value 42 for single-node match")
    }
}

func TestFindNodeByValueSingleNodeNoMatch(t *testing.T) {
    result := findNodeByValue(buildListFindNodeByValue([]int{42}), 7)
    if result != nil {
        t.Error("expected nil when single-node value differs from target")
    }
}
