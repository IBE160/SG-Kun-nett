# User Journey: Generate a Tailored Application Package

**User Goal:** A student wants to quickly get a customized CV and cover letter for a specific job.
**Approach:** Wizard/Stepper Approach

---

## Flow Steps:

1.  **Step 1: Welcome & Upload Documents**
    *   **Screen:** Landing Page / Upload Screen
    *   **User sees:**
        *   Welcome message: "Welcome to your AI Career Assistant!"
        *   Clear call-to-action: "Upload your CV and Job Posting to get started."
        *   Two distinct drag-and-drop file upload zones (Material-UI `FileUpload` or similar component): one for "CV" and one for "Job Posting."
        *   Supported file types listed (PDF, DOC, TXT).
        *   A disabled "Next: Analyze" button.
    *   **User does:** Uploads CV and Job Posting files.
    *   **System responds:**
        *   File names appear under upload zones.
        *   "Next: Analyze" button becomes enabled when both files are selected.

2.  **Step 2: Document Processing & Initial Analysis**
    *   **Screen:** Processing / Loading Screen
    *   **User sees:**
        *   "Analyzing your documents..." message.
        *   Progress indicator (Material-UI `CircularProgress` or `LinearProgress`).
        *   Brief explanation of what's happening (e.g., "Extracting keywords, identifying skills...").
    *   **User does:** Waits.
    *   **System responds:**
        *   Transitions automatically to the results screen once processing is complete.

3.  **Step 3: Review Application Package & Refinement**
    *   **Screen:** Results & Refinement Dashboard
    *   **User sees:**
        *   A multi-section dashboard (using Material-UI `Tabs` or `Accordion` for navigation).
        *   **Section 1: Tailored Cover Letter:** Editable text area (Material-UI `TextField` or similar) with the generated cover letter. Options to "Adjust Tone" (e.g., dropdown with "Professional", "Enthusiastic") and "Adjust Formality" (e.g., "Informal", "Neutral", "Formal"). "Regenerate" button.
        *   **Section 2: Keyword Analysis:** List of keywords from Job Posting, highlighted if present in CV, clearly indicating missing keywords. (Material-UI `List` or `Chip` components).
        *   **Section 3: CV Improvements:** Actionable suggestions for CV enhancement. Option to "Rewrite" or "Suggest" sections.
        *   **Section 4: Qualification Gaps:** Clear list of missing qualifications from the job posting, with brief suggestions for addressing each.
        *   Prominent "Export" button (PDF, DOCX, Markdown options).
        *   "Save Application" button (if logged in) or "Download All" button.
    *   **User does:** Reviews, edits, adjusts settings, exports, or downloads.
    *   **System responds:** Updates displayed content based on user edits or regeneration requests.

---

## Decision Points:

*   **File Upload Validation:** If file type is not supported or file is corrupted, display error message on Step 1, prevent proceeding.
*   **AI Processing Error:** If analysis fails, display error message on Step 2, offer retry or contact support.
*   **Regeneration:** If user regenerates cover letter, AI re-processes and updates text area.

---

## Error States:

*   **Upload Error:** Clear inline message, option to re-upload.
*   **Processing Error:** Dialog with error details, retry button.
*   **Invalid Input:** Highlight fields, provide validation feedback.

---

## Success State:

*   **Completion feedback:** "Your tailored application package is ready!" displayed on Step 3.
*   **Next action:** User can export, download, save, or further refine.

---

## Flow Diagram (Mermaid):

```mermaid
graph TD
    A[Start] --> B{Step 1: Welcome & Upload Documents};
    B -- CV & Job Posting Uploaded --> C{Step 2: Document Processing & Initial Analysis};
    C -- Processing Complete --> D{Step 3: Review Application Package & Refinement};
    D -- User Edits/Adjusts --> D;
    D -- Export/Download/Save --> E[End];
    B -- Upload Error --> F(Error: Invalid File/Corrupt);
    C -- Processing Error --> G(Error: Analysis Failed);
    F --> B;
    G --> D;

    subgraph Step 1: Welcome & Upload Documents
        B -- UI: File Upload Zones, Disabled "Next" --> B1(Upload CV);
        B -- UI: File Upload Zones, Disabled "Next" --> B2(Upload Job Posting);
        B1 & B2 -- Both files selected --> B3("Next: Analyze" Enabled);
        B3 --> B;
    end
    subgraph Step 2: Document Processing & Initial Analysis
        C -- UI: "Analyzing documents...", Progress Indicator --> C1(Extract Keywords);
        C1 --> C2(Identify Gaps);
        C2 --> C3(Generate Cover Letter Draft);
    end
    subgraph Step 3: Review Application Package & Refinement
        D -- UI: Tabs/Sections for Cover Letter, Keywords, Gaps --> D1(Cover Letter: Editable Text, Tone/Formality Adjust, Regenerate);
        D -- UI: Tabs/Sections for Cover Letter, Keywords, Gaps --> D2(Keyword Analysis: Match/Missing Keywords);
        D -- UI: Tabs/Sections for Cover Letter, Keywords, Gaps --> D3(CV Improvements: Suggestions, Rewrite/Suggest Option);
        D -- UI: Tabs/Sections for Cover Letter, Keywords, Gaps --> D4(Qualification Gaps: List of Gaps & Suggestions);
        D -- UI: "Export" button (PDF, DOCX, MD) --> D5(Export File);
        D -- UI: "Save Application" (if logged in) or "Download All") --> D6(Save/Download);
    end
```