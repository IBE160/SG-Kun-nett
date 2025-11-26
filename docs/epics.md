# Epics and Stories

## Epic 1: Foundation & Document Ingestion
**Goal:** Users can upload their documents and have them processed. This is the foundational step for all subsequent features.

### Stories
#### Story 1.1: Project Setup & Foundational Infrastructure
- **User Story:** As a developer, I want to set up the initial project structure, dependencies, and build tools so that we have a solid foundation for development.
- **Acceptance Criteria:**
  - Given the project is initialized
  - When I inspect the repository
  - Then the project has a standard folder structure (e.g., 'src/', 'components/', 'api/', 'styles/', etc.).
  - And a 'package.json' (or similar) with core dependencies (e.g., React, a backend framework like Express/FastAPI) is present.
  - And basic build and development scripts are configured.
- **Prerequisites:** None
- **Technical Notes:** This story should include the starter command from the architecture phase (if one was chosen), or the manual setup of a basic project structure. It should also include setting up linting, formatting, and a basic test runner.

#### Story 1.2: Implement Document Upload Interface
- **User Story:** As a student, I want to see a user interface where I can upload my CV and the job posting so that I can begin the analysis process.
- **Acceptance Criteria:**
  - Given I am on the main page
  - When I view the page
  - Then I see two distinct file upload areas, one for "CV" and one for "Job Posting".
  - And each upload area accepts files (PDF, DOC, TXT).
  - And I see a "Start Analysis" button, which is initially disabled.
  - And the "Start Analysis" button becomes enabled only when both a CV and a job posting have been selected.
- **Prerequisites:** Story 1.1
- **Technical Notes:** This is a frontend-only story. Focus on the UI components and their state management. No backend logic for file handling is required in this story.

#### Story 1.3: Backend Endpoint for Document Upload
- **User Story:** As a developer, I want a backend endpoint that can receive the uploaded CV and job posting files so that they can be processed.
- **Acceptance Criteria:**
  - Given the frontend sends a multipart/form-data request with a CV and job posting file
  - When the backend receives the request
  - Then the files are temporarily stored for processing.
  - And the backend returns a success response with a unique ID for the analysis job.
- **Prerequisites:** Story 1.1
- **Technical Notes:** Implement a RESTful endpoint (e.g., `POST /api/upload`). Focus on receiving and temporarily storing the files. Document parsing is out of scope for this story.

#### Story 1.4: Basic Document Parsing
- **User Story:** As a developer, I want to parse the text content from the uploaded CV and job posting so that it can be used for AI analysis.
- **Acceptance Criteria:**
  - Given a CV and job posting file have been uploaded
  - When the document parsing process is triggered
  - Then the raw text content is successfully extracted from the PDF, DOC, or TXT file.
  - And the extracted text is stored and associated with the analysis job ID.
  - And errors during parsing (e.g., corrupted file) are handled gracefully.
- **Prerequisites:** Story 1.3
- **Technical Notes:** Use libraries like `PyPDF2`, `python-docx` (or their equivalents in the chosen language). Focus on text extraction. Keyword analysis is out of scope.

---

## Epic 2: Core AI Analysis & Feedback
**Goal:** Users receive tangible feedback on their CV and its alignment with the job posting.

### Stories
#### Story 2.1: Keyword Extraction and Analysis
- **User Story:** As a student, I want the system to extract keywords from my CV and the job posting to see how well they align.
- **Acceptance Criteria:**
  - Given extracted text from a CV and job posting
  - When the keyword extraction is triggered
  - Then the system identifies and extracts key skills, technologies, and qualifications from both documents.
  - And the system displays a list of keywords present in the job posting but missing from the CV.
- **Prerequisites:** Story 1.4
- **Technical Notes:** Use an AI model (e.g., via OpenAI API, Claude API) for keyword extraction. Prompt the model to identify relevant terms from both texts and perform a comparison.

#### Story 2.2: Generate Tailored Cover Letter
- **User Story:** As a student, I want the system to generate a tailored cover letter based on my CV and the job posting.
- **Acceptance Criteria:**
  - Given extracted text from a CV and job posting
  - When the cover letter generation is triggered
  - Then the system generates a cover letter that incorporates keywords from the job posting and highlights relevant experience from the CV.
  - And the generated cover letter is displayed to the user in a text area for review and editing.
- **Prerequisites:** Story 1.4
- **Technical Notes:** Prompt an AI model to act as a career advisor and write a compelling cover letter. The prompt should include the CV text, job posting text, and a list of alignment keywords from Story 2.1.

#### Story 2.3: Identify and Display Qualification Gaps
- **User Story:** As a job seeker, I want to see a clear list of qualifications I'm missing for a specific job so I can improve my skills.
- **Acceptance Criteria:**
  - Given the keyword analysis is complete
  - When the gap analysis is displayed
  - Then the system presents a section titled "Qualification Gaps" or similar.
  - And this section lists the key skills and qualifications from the job posting that were not found in the CV.
  - And for each gap, the system provides a brief suggestion on how to address it (e.g., "Consider taking a course on...").
- **Prerequisites:** Story 2.1
- **Technical Notes:** The output from the keyword analysis in Story 2.1 can be used to generate this list. An AI model can be prompted to provide suggestions for addressing the gaps.

---

## Epic 3: Advanced Customization & Optimization (Optional)
**Goal:** Users can further refine and optimize their application materials.

### Stories
#### Story 3.1: ATS Optimization Suggestions
- **User Story:** As a job seeker, I want to receive suggestions on how to optimize my CV for Applicant Tracking Systems (ATS) so that it passes initial screenings.
- **Acceptance Criteria:**
  - Given the extracted text from a CV
  - When the ATS optimization is triggered
  - Then the system provides a list of actionable suggestions, such as using standard section headers, avoiding complex formatting, and ensuring keyword density.
  - And the suggestions are displayed in a clear, easy-to-understand format.
- **Prerequisites:** Story 1.4
- **Technical Notes:** Prompt an AI model with the CV text and ask for ATS optimization tips. The prompt should specify that the output should be a list of actionable suggestions.

#### Story 3.2: Tone and Style Adjustment
- **User Story:** As a user, I want to be able to adjust the tone and style of my generated cover letter to better match my personality and the company culture.
- **Acceptance Criteria:**
  - Given a generated cover letter
  - When I select a tone (e.g., "Professional", "Enthusiastic", "Formal")
  - Then the system regenerates the cover letter in the selected tone.
  - And the updated cover letter is displayed.
- **Prerequisites:** Story 2.2
- **Technical Notes:** Provide a dropdown or similar UI element for tone selection. The selected tone will be an additional parameter in the AI prompt for cover letter generation.

#### Story 3.3: Rewrite vs. Suggestion Choice
- **User Story:** As a user, I want to choose whether the system rewrites sections of my CV or simply provides suggestions for improvement.
- **Acceptance Criteria:**
  - Given the system has identified areas for improvement in my CV
  - When I am presented with the feedback
  - Then I have the option to either see a rewritten version of the section or a list of suggestions.
  - And my choice is respected for the displayed output.
- **Prerequisites:** Story 2.1
- **Technical Notes:** Implement a toggle or radio buttons in the UI to switch between "Rewrite" and "Suggestions" modes. The AI prompt will be adjusted based on this setting.

#### Story 3.4: Language and Formality Level Customization
- **User Story:** As a user, I want to customize the language and formality level of my cover letter to suit different job applications.
- **Acceptance Criteria:**
  - Given a generated cover letter
  - When I select a formality level (e.g., "Informal", "Neutral", "Formal")
  - Then the system regenerates the cover letter with the appropriate language and formality.
  - And the updated cover letter is displayed.
- **Prerequisites:** Story 2.2
- **Technical Notes:** Similar to tone and style adjustment, this will be another UI option that modifies the AI prompt for cover letter generation.
