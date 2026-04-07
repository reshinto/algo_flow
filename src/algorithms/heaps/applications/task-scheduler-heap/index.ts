import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { taskSchedulerHeap } from "./sources/task-scheduler-heap.ts?fn";
import { generateTaskSchedulerHeapSteps } from "./step-generator";
import type { TaskSchedulerHeapInput } from "./step-generator";
import { taskSchedulerHeapEducational } from "./educational";

import typescriptSource from "./sources/task-scheduler-heap.ts?raw";
import pythonSource from "./sources/task-scheduler-heap.py?raw";
import javaSource from "./sources/TaskSchedulerHeap.java?raw";
import rustSource from "./sources/task-scheduler-heap.rs?raw";
import cppSource from "./sources/TaskSchedulerHeap.cpp?raw";
import goSource from "./sources/task-scheduler-heap.go?raw";

function executeTaskSchedulerHeap(input: TaskSchedulerHeapInput): number {
  return taskSchedulerHeap(input.tasks, input.cooldown) as number;
}

const taskSchedulerHeapDefinition: AlgorithmDefinition<TaskSchedulerHeapInput> = {
  meta: {
    id: ALGORITHM_ID.TASK_SCHEDULER_HEAP!,
    name: "Task Scheduler Heap",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Find the minimum CPU intervals to complete all tasks with a cooldown constraint using a greedy max-heap simulation (LeetCode 621) — O(n log 26) ≈ O(n)",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log k)",
      worst: "O(n log k)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { tasks: ["A", "A", "A", "B", "B", "B"], cooldown: 2 },
  },
  execute: executeTaskSchedulerHeap,
  generateSteps: generateTaskSchedulerHeapSteps,
  educational: taskSchedulerHeapEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(taskSchedulerHeapDefinition);
