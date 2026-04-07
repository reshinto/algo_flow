package main

import (
	"reflect"
	"testing"
)

func TestDesignCircularDequeThreeOps(t *testing.T) {
	result := designCircularDeque([]string{"pushBack 1", "pushBack 2", "pushBack 3"}, 3)
	if !reflect.DeepEqual(result, []string{"true", "true", "true"}) {
		t.Errorf("expected [true true true]")
	}
}

func TestDesignCircularDequeOverCapacity(t *testing.T) {
	result := designCircularDeque([]string{"pushBack 1", "pushBack 2", "pushBack 3", "pushBack 4"}, 3)
	if !reflect.DeepEqual(result, []string{"true", "true", "true", "full"}) {
		t.Errorf("expected [true true true full]")
	}
}

func TestDesignCircularDequePopFrontEmpty(t *testing.T) {
	if !reflect.DeepEqual(designCircularDeque([]string{"popFront"}, 3), []string{"empty"}) {
		t.Errorf("expected [empty]")
	}
}

func TestDesignCircularDequePopFrontFifo(t *testing.T) {
	ops := []string{"pushBack 1", "pushBack 2", "pushBack 3", "popFront", "popFront", "popFront"}
	expected := []string{"true", "true", "true", "1", "2", "3"}
	if !reflect.DeepEqual(designCircularDeque(ops, 3), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestDesignCircularDequePushFrontLifo(t *testing.T) {
	ops := []string{"pushFront 1", "pushFront 2", "pushFront 3", "popFront", "popFront", "popFront"}
	expected := []string{"true", "true", "true", "3", "2", "1"}
	if !reflect.DeepEqual(designCircularDeque(ops, 3), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestDesignCircularDequePeekFrontAndRear(t *testing.T) {
	ops := []string{"pushBack 1", "pushFront 2", "peekFront", "peekRear"}
	expected := []string{"true", "true", "2", "1"}
	if !reflect.DeepEqual(designCircularDeque(ops, 3), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestDesignCircularDequePeekEmpty(t *testing.T) {
	if !reflect.DeepEqual(designCircularDeque([]string{"peekFront", "peekRear"}, 3), []string{"empty", "empty"}) {
		t.Errorf("expected [empty empty]")
	}
}
