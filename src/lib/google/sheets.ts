import { google } from "googleapis";
import { setGoogleCredentials } from "./auth";

export interface SheetData {
  values: any[][];
  headers: string[];
  rowCount: number;
}

export interface SheetMetadata {
  id: string;
  name: string;
  url: string;
  sheets: {
    title: string;
    index: number;
    rowCount: number;
    columnCount: number;
  }[];
}

/**
 * Get spreadsheet metadata
 */
export async function getSpreadsheetMetadata(
  spreadsheetId: string,
  accessToken: string,
  refreshToken?: string
): Promise<SheetMetadata> {
  try {
    const auth = setGoogleCredentials(accessToken, refreshToken);
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const spreadsheet = response.data;

    return {
      id: spreadsheet.spreadsheetId!,
      name: spreadsheet.properties?.title || "Untitled",
      url: spreadsheet.spreadsheetUrl!,
      sheets: (spreadsheet.sheets || []).map((sheet, index) => ({
        title: sheet.properties?.title || `Sheet${index + 1}`,
        index,
        rowCount: sheet.properties?.gridProperties?.rowCount || 0,
        columnCount: sheet.properties?.gridProperties?.columnCount || 0,
      })),
    };
  } catch (error: any) {
    console.error("Error fetching spreadsheet metadata:", error);
    throw new Error(`Failed to fetch spreadsheet: ${error.message}`);
  }
}

/**
 * Read data from a spreadsheet
 */
export async function readSpreadsheet(
  spreadsheetId: string,
  range: string,
  accessToken: string,
  refreshToken?: string
): Promise<SheetData> {
  try {
    const auth = setGoogleCredentials(accessToken, refreshToken);
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const values = response.data.values || [];

    if (values.length === 0) {
      return {
        values: [],
        headers: [],
        rowCount: 0,
      };
    }

    const headers = values[0] as string[];
    const dataRows = values.slice(1);

    return {
      values: dataRows,
      headers,
      rowCount: dataRows.length,
    };
  } catch (error: any) {
    console.error("Error reading spreadsheet:", error);
    throw new Error(`Failed to read spreadsheet: ${error.message}`);
  }
}

/**
 * List user's accessible spreadsheets
 */
export async function listUserSpreadsheets(
  accessToken: string,
  refreshToken?: string
): Promise<{ id: string; name: string; url: string }[]> {
  try {
    const auth = setGoogleCredentials(accessToken, refreshToken);
    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
      pageSize: 100,
      fields: "files(id, name, webViewLink)",
      orderBy: "modifiedTime desc",
    });

    return (response.data.files || []).map((file) => ({
      id: file.id!,
      name: file.name!,
      url: file.webViewLink!,
    }));
  } catch (error: any) {
    console.error("Error listing spreadsheets:", error);
    throw new Error(`Failed to list spreadsheets: ${error.message}`);
  }
}

/**
 * Extract spreadsheet ID from various URL formats
 */
export function extractSpreadsheetId(url: string): string | null {
  const patterns = [
    /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
    /^([a-zA-Z0-9-_]{44})$/, // Direct ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}
