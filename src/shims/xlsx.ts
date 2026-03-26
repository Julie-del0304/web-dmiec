/*
 * Lightweight XLSX shim used to keep builds passing in environments
 * where the `xlsx` package is unavailable.
 */

type Sheet = Record<string, unknown>;
type Workbook = { SheetNames: string[]; Sheets: Record<string, Sheet> };

export function read(): Workbook {
  return { SheetNames: ['Sheet1'], Sheets: { Sheet1: {} } };
}

export const utils = {
  sheet_to_json<T = unknown>(_: Sheet, __?: { header?: number }): T[] {
    return [];
  },
};
