import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { meetingRoomsII } from "./sources/meeting-rooms-ii.ts?fn";
import { generateMeetingRoomsIISteps } from "./step-generator";
import type { MeetingRoomsIIInput } from "./step-generator";
import { meetingRoomsIIEducational } from "./educational";

import typescriptSource from "./sources/meeting-rooms-ii.ts?raw";
import pythonSource from "./sources/meeting-rooms-ii.py?raw";
import javaSource from "./sources/MeetingRoomsII.java?raw";
import rustSource from "./sources/meeting-rooms-ii.rs?raw";
import cppSource from "./sources/MeetingRoomsII.cpp?raw";
import goSource from "./sources/meeting-rooms-ii.go?raw";

function executeMeetingRoomsII(input: MeetingRoomsIIInput): number {
  return meetingRoomsII(input.intervals) as number;
}

const meetingRoomsIIDefinition: AlgorithmDefinition<MeetingRoomsIIInput> = {
  meta: {
    id: ALGORITHM_ID.MEETING_ROOMS_II!,
    name: "Meeting Rooms II",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Find the minimum number of meeting rooms required to host all meetings without overlap using a min-heap of end times",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      intervals: [
        [0, 30],
        [5, 10],
        [15, 20],
        [2, 7],
      ],
    },
  },
  execute: executeMeetingRoomsII,
  generateSteps: generateMeetingRoomsIISteps,
  educational: meetingRoomsIIEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(meetingRoomsIIDefinition);
