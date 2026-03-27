type Worksheet = {
  rows: unknown[][];
}

type Workbook = {
  SheetNames: string[];
  Sheets: Record<string, Worksheet>;
}

function decodeArrayBuffer(data: Uint8Array): string {
  try {
    return new TextDecoder('utf-8').decode(data);
  } catch {
    return '';
  }
}

function parseDelimited(text: string): unknown[][] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line) => {
    const delimiter = line.includes('\t') ? '\t' : ',';
    return line.split(delimiter).map((cell) => cell.trim());
  });
}

export function read(data: Uint8Array, _options?: { type?: string }): Workbook {
  const text = decodeArrayBuffer(data);
  const rows = parseDelimited(text);
  const sheetName = 'Sheet1';
  return {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: { rows },
    },
  };
}

export const utils = {
  sheet_to_json(sheet: Worksheet, options?: { header?: number }): unknown[][] {
    if (options?.header === 1) {
      return sheet.rows;
    }
    return sheet.rows;
  },
};

const xlsxShim = {
  read,
  utils,
};

export default xlsxShim;
