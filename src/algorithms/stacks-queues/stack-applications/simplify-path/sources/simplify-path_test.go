package main

import "testing"

func TestSimplifyPathDotAndDoubleDot(t *testing.T) {
	if simplifyPath("/a/./b/../../c/") != "/c" {
		t.Errorf("expected '/c'")
	}
}

func TestSimplifyPathTrailingSlash(t *testing.T) {
	if simplifyPath("/home/") != "/home" {
		t.Errorf("expected '/home'")
	}
}

func TestSimplifyPathNavigateAboveRoot(t *testing.T) {
	if simplifyPath("/../") != "/" {
		t.Errorf("expected '/'")
	}
}

func TestSimplifyPathConsecutiveSlashes(t *testing.T) {
	if simplifyPath("/home//foo/") != "/home/foo" {
		t.Errorf("expected '/home/foo'")
	}
}

func TestSimplifyPathLoneSlash(t *testing.T) {
	if simplifyPath("/") != "/" {
		t.Errorf("expected '/'")
	}
}

func TestSimplifyPathDeepNested(t *testing.T) {
	if simplifyPath("/a/b/c/d") != "/a/b/c/d" {
		t.Errorf("expected '/a/b/c/d'")
	}
}

func TestSimplifyPathMultipleDoubleDots(t *testing.T) {
	if simplifyPath("/a/b/../../c/d/../e") != "/c/e" {
		t.Errorf("expected '/c/e'")
	}
}

func TestSimplifyPathDoubleDotAtRoot(t *testing.T) {
	if simplifyPath("/..") != "/" {
		t.Errorf("expected '/'")
	}
}
