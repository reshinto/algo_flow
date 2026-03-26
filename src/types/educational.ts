/**
 * Educational content sections displayed in the explanation panel.
 * Every registered algorithm must provide all fields.
 */

/**
 * Structured educational material for a single algorithm.
 * Sections map directly to the explanation panel's tab layout.
 */
export interface EducationalContent {
  overview: string;
  howItWorks: string;
  timeAndSpaceComplexity: string;
  bestAndWorstCase: string;
  realWorldUses: string[];
  strengthsAndLimitations: {
    strengths: string[];
    limitations: string[];
  };
  whenToUseIt: string;
}
