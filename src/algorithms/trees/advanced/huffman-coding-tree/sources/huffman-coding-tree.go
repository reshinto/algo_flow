// Huffman Coding Tree — build optimal prefix-free encoding from character frequencies
package main

import "sort"

type HuffmanNode struct {
	freq    int
	charVal rune
	isLeaf  bool
	left    *HuffmanNode
	right   *HuffmanNode
}

type CharFreq struct {
	Char rune
	Freq int
}

func generateHuffmanCodes(node *HuffmanNode, code string, encodings map[rune]string) {
	if node == nil {
		return
	}
	if node.isLeaf {
		if code == "" {
			code = "0"
		}
		encodings[node.charVal] = code // @step:encode-char
		return
	}
	generateHuffmanCodes(node.left, code+"0", encodings)  // @step:traverse-left
	generateHuffmanCodes(node.right, code+"1", encodings) // @step:traverse-right
}

func huffmanCodingTree(frequencies []CharFreq) map[rune]string {
	minHeap := make([]*HuffmanNode, 0, len(frequencies))
	for _, entry := range frequencies {
		minHeap = append(minHeap, &HuffmanNode{freq: entry.Freq, charVal: entry.Char, isLeaf: true})
	} // @step:initialize

	// Sort ascending to simulate a min-heap
	sort.Slice(minHeap, func(idxA, idxB int) bool {
		return minHeap[idxA].freq < minHeap[idxB].freq
	}) // @step:select-min-freq

	for len(minHeap) > 1 {
		// Extract two minimums
		leftNode := minHeap[0]
		minHeap = minHeap[1:] // @step:select-min-freq
		rightNode := minHeap[0]
		minHeap = minHeap[1:] // @step:select-min-freq

		// Merge into a new internal node
		merged := &HuffmanNode{
			freq:  leftNode.freq + rightNode.freq,
			left:  leftNode,
			right: rightNode,
		} // @step:build-node

		// Re-insert maintaining sorted order
		insertPos := len(minHeap)
		for pos, node := range minHeap {
			if node.freq > merged.freq {
				insertPos = pos
				break
			}
		}
		minHeap = append(minHeap[:insertPos], append([]*HuffmanNode{merged}, minHeap[insertPos:]...)...) // @step:build-node
	}

	var huffmanRoot *HuffmanNode
	if len(minHeap) > 0 {
		huffmanRoot = minHeap[0]
	}
	encodings := make(map[rune]string)
	generateHuffmanCodes(huffmanRoot, "", encodings)
	return encodings // @step:complete
}
