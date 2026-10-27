const SPREADSHEET_ID = "1heHkfiFFjMSD75hL2pbzX3jiNOaQaiPwduOpaF-VKGw";
const SHEET_NAME = "Sheet1";

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: "Student registration backend is running."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = JSON.parse(e.postData.contents);

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();

    if (!name || !email) {
      throw new Error("Name and email are required.");
    }

    const sheet = SpreadsheetApp
      .openById(SPREADSHEET_ID)
      .getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("Spreadsheet sheet not found.");
    }

    const applicationId =
      "APP" + Date.now().toString().slice(-8);

    sheet.appendRow([
      applicationId,
      name,
      email,
      new Date()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        applicationId: applicationId
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}