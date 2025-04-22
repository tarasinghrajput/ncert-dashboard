import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";
import { app } from "../firebase/firebase"; // Adjust the import path based on your project structure

const db = getFirestore(app);

/**
 * Tracks a PDF click for a specific user and globally.
 * @param userId - The ID of the user who clicked the PDF.
 * @param pdfId - The ID of the PDF that was clicked.
 */
export const trackPdfClick = async (userId: string, pdfId: string) => {
  try {
    // Update user-specific PDF click count
    const userPdfRef = doc(db, "users", userId, "pdfs", pdfId);
    await updateDoc(userPdfRef, {
      clickCount: increment(1), // Increment the clickCount by 1
    });

    // Update global PDF click count
    const globalPdfRef = doc(db, "pdfs", pdfId);
    await updateDoc(globalPdfRef, {
      clickCount: increment(1), // Increment the clickCount by 1
    });

    console.log("PDF click tracked successfully!");
  } catch (error) {
    console.error("Error tracking PDF click:", error);
    throw error; // Re-throw the error for handling in the component
  }
};