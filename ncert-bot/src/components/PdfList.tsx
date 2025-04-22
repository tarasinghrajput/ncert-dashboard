import React from "react";
import { trackPdfClick } from '../firebase/trackPdfClick'; // Import the click tracking function
import { useAuth } from '../contexts/authContext/AuthContext'; // Import useAuth to get the current user

interface Pdf {
  id: string;
  title: string;
  url: string;
  clickCount: number;
}

interface PdfListProps {
  pdfs: Pdf[]; // List of PDFs passed as a prop
}

const PdfList: React.FC<PdfListProps> = ({ pdfs }) => {
  const { currentUser } = useAuth(); // Get the current user

  const handlePdfClick = async (pdfId: string) => {
    if (!currentUser) {
      console.error("User not logged in.");
      return;
    }

    try {
      // Track the click
      await trackPdfClick(currentUser.uid, pdfId);

      // Open the PDF in a new tab (optional)
      const pdf = pdfs.find((pdf) => pdf.id === pdfId);
      if (pdf) {
        window.open(pdf.url, "_blank");
      }

      console.log("PDF clicked:", pdfId);
    } catch (error) {
      console.error("Error tracking PDF click:", error);
    }
  };

  return (
    <div>
      <h2>PDF List</h2>
      {pdfs.length > 0 ? (
        pdfs.map((pdf) => (
          <div
            key={pdf.id}
            onClick={() => handlePdfClick(pdf.id)}
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{pdf.title}</h3>
            <p>Clicks: {pdf.clickCount || 0}</p>
          </div>
        ))
      ) : (
        <p>No PDFs available.</p>
      )}
    </div>
  );
};

export default PdfList;