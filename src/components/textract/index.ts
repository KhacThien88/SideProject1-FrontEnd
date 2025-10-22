/**
 * Textract (Text Extraction) Components - Central Export
 */

export { ExtractionInterface } from './ExtractionInterface';
export type { ExtractionInterfaceProps } from './ExtractionInterface';

export { ExtractionHistory } from './ExtractionHistory';
export type { ExtractionHistoryProps } from './ExtractionHistory';

export { ExtractionResultViewer } from './ExtractionResultViewer';
export type { ExtractionResultViewerProps } from './ExtractionResultViewer';

// Re-export for convenience
export {
  ExtractionInterface as TextractInterface,
  ExtractionHistory as TextractHistory,
  ExtractionResultViewer as TextractViewer,
} from './index';
