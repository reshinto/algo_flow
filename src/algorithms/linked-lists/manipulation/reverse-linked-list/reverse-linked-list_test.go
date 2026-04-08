package main

import (
    "reflect"
    "testing"
)

func buildListReverseLinkedList(values []int) *ListNode {
    var head *ListNode
    for idx := len(values) - 1; idx >= 0; idx-- {
        head = &ListNode{value: values[idx], next: head}
    }
    return head
}

func listToSliceReverseLinkedList(head *ListNode) []int {
    result := []int{}
    for head != nil {
        result = append(result, head.value)
        head = head.next
    }
    return result
}

func TestReverseLinkedListFiveNodes(t *testing.T) {
    result := reverseLinkedList(buildListReverseLinkedList([]int{1, 2, 3, 4, 5}))
    if !reflect.DeepEqual(listToSliceReverseLinkedList(result), []int{5, 4, 3, 2, 1}) {
        t.Error("expected [5 4 3 2 1] after reversing [1 2 3 4 5]")
    }
}

func TestReverseLinkedListNullInput(t *testing.T) {
    result := reverseLinkedList(nil)
    if result != nil {
        t.Error("expected nil for null input")
    }
}

func TestReverseLinkedListSingleNode(t *testing.T) {
    result := reverseLinkedList(buildListReverseLinkedList([]int{42}))
    if !reflect.DeepEqual(listToSliceReverseLinkedList(result), []int{42}) {
        t.Error("expected [42] for single-node list")
    }
}

func TestReverseLinkedListTwoNodes(t *testing.T) {
    result := reverseLinkedList(buildListReverseLinkedList([]int{1, 2}))
    if !reflect.DeepEqual(listToSliceReverseLinkedList(result), []int{2, 1}) {
        t.Error("expected [2 1] after reversing [1 2]")
    }
}

func TestReverseLinkedListThreeNodes(t *testing.T) {
    result := reverseLinkedList(buildListReverseLinkedList([]int{3, 1, 4}))
    if !reflect.DeepEqual(listToSliceReverseLinkedList(result), []int{4, 1, 3}) {
        t.Error("expected [4 1 3] after reversing [3 1 4]")
    }
}

func TestReverseLinkedListNewHeadIsLastElement(t *testing.T) {
    result := reverseLinkedList(buildListReverseLinkedList([]int{10, 20, 30}))
    if result == nil || result.value != 30 {
        t.Error("expected new head value to be 30")
    }
}
