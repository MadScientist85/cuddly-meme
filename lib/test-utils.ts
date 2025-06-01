// Utility functions for testing and development
// This replaces any references to missing test files

export const mockPdfData = {
  title: "Sample Legal Document",
  content: "This is a sample legal document for testing purposes.",
  metadata: {
    pages: 1,
    author: "Legal AI Assistant",
    subject: "Sample Document",
  },
}

export const sampleLegalPrompts = [
  {
    category: "hearing_request",
    title: "Request for Post-Conviction Relief Hearing",
    template: "I am requesting a hearing for post-conviction relief based on...",
  },
  {
    category: "constitutional_argument",
    title: "Constitutional Due Process Argument",
    template: "The denial of this application violates due process because...",
  },
  {
    category: "statutory_analysis",
    title: "Oklahoma Survivors' Act Analysis",
    template: "Under 22 O.S. § 1090.1, the applicant is entitled to relief because...",
  },
]
