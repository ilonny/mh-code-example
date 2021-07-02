export const selectCurrentDocument = (state: any) =>
  state?.document?.currentDocument;
export const selectDocumentScannedCodes = (state: any) =>
  state?.document?.currentDocument?.scanned || [];
