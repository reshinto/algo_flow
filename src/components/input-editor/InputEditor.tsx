/** Dispatches to category-specific input editors based on the current algorithm's category. */
import { useAppStore } from "@/store";
import { CATEGORY } from "@/utils/constants";

import ArrayInputEditor from "./ArrayInputEditor";
import ArraysEditor from "./ArraysEditor";
import DPEditor from "./DPEditor";
import GenericIntrospectEditor from "./GenericIntrospectEditor";
import HashMapsEditor from "./HashMapsEditor";
import KmpSearchInputEditor from "./KmpSearchInputEditor";
import MatrixInputEditor from "./MatrixInputEditor";
import SearchingInputEditor from "./SearchingInputEditor";

export default function InputEditor() {
  const definition = useAppStore((state) => state.definition);
  const input = useAppStore((state) => state.input);
  const setInput = useAppStore((state) => state.setInput);

  if (!definition) return null;

  const category = definition.meta.category;

  switch (category) {
    case CATEGORY.SORTING:
      return (
        <ArrayInputEditor
          values={input as number[]}
          onChange={(values) => setInput(values)}
          label="Array values (comma-separated)"
        />
      );

    case CATEGORY.SEARCHING: {
      const searchInput = input as Record<string, unknown>;
      const hasArray = "array" in searchInput && Array.isArray(searchInput.array);
      const hasSortedArray = "sortedArray" in searchInput && Array.isArray(searchInput.sortedArray);
      const hasTarget = "targetValue" in searchInput && typeof searchInput.targetValue === "number";

      if ((hasSortedArray || hasArray) && hasTarget) {
        return (
          <SearchingInputEditor
            input={searchInput}
            onChange={setInput}
            arrayKey={hasSortedArray ? "sortedArray" : "array"}
            autoSort={hasSortedArray}
          />
        );
      }
      return <GenericIntrospectEditor input={input} onChange={setInput} />;
    }

    case CATEGORY.ARRAYS:
      return <ArraysEditor algorithmId={definition.meta.id} input={input} onChange={setInput} />;

    case CATEGORY.DYNAMIC_PROGRAMMING:
      return <DPEditor input={input} onChange={setInput} />;

    case CATEGORY.PATHFINDING:
      /* Grid editing is handled directly in the GridVisualizer component */
      return null;

    case CATEGORY.TREES:
      return null;

    case CATEGORY.STACKS_QUEUES:
      return <GenericIntrospectEditor input={input} onChange={setInput} />;

    case CATEGORY.HEAPS:
      return <GenericIntrospectEditor input={input} onChange={setInput} />;

    case CATEGORY.LINKED_LISTS:
      return <GenericIntrospectEditor input={input} onChange={setInput} />;

    case CATEGORY.SETS:
      return <GenericIntrospectEditor input={input} onChange={setInput} />;

    case CATEGORY.MATRICES: {
      const matrixInput = input as Record<string, unknown>;
      // Pascal's Triangle uses a scalar numRows — delegate to generic editor.
      if ("numRows" in matrixInput && typeof matrixInput.numRows === "number") {
        return <GenericIntrospectEditor input={input} onChange={setInput} />;
      }
      // Valid Sudoku uses "board" as its matrix key.
      if ("board" in matrixInput && Array.isArray(matrixInput.board)) {
        return (
          <MatrixInputEditor
            matrix={matrixInput.board as number[][]}
            onChange={(board) => setInput({ ...matrixInput, board })}
          />
        );
      }
      // Some matrix algorithms use "grid" as their input key (e.g. Island Count)
      // while others use "matrix". Preserve any extra fields (e.g. targetK).
      if ("grid" in matrixInput && Array.isArray(matrixInput.grid)) {
        return (
          <MatrixInputEditor
            matrix={matrixInput.grid as number[][]}
            onChange={(grid) => setInput({ ...matrixInput, grid })}
          />
        );
      }
      return (
        <MatrixInputEditor
          matrix={(matrixInput.matrix ?? []) as number[][]}
          onChange={(matrix) => setInput({ ...matrixInput, matrix })}
        />
      );
    }

    case CATEGORY.STRINGS:
      return (
        <KmpSearchInputEditor
          input={input as { text: string; pattern: string }}
          onChange={setInput}
        />
      );

    case CATEGORY.HASH_MAPS:
      return <HashMapsEditor input={input} onChange={setInput} />;

    default:
      return null;
  }
}
