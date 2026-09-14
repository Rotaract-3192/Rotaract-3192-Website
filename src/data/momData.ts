export interface MomItem {
  id: string;
  title: string;
  meetingDate: string;
  clubId?: string;
  transcript_text?: string;
  fileUrl?: string;
  description?: string;
}

export const staticMoms: MomItem[] = [
  {
    id: "dcm-01",
    title: "1st District Council Meeting (DCM-I)",
    meetingDate: "2026-07-15",
    clubId: "DISTRICT COUNCIL",
    transcript_text: "Inaugural district council session, budget allocations for RY 2026-27, district directory release, and calendar approvals.",
    fileUrl: "https://drive.google.com/drive/folders/1BamhCLMTs0RHH0TBTartmTxHqAFRhbE3?usp=sharing"
  },
  {
    id: "dcm-02",
    title: "2nd District Council Meeting (DCM-II)",
    meetingDate: "2026-10-18",
    clubId: "DISTRICT COUNCIL",
    transcript_text: "Mid-term performance reviews, District Conference updates, and review of community service flagship projects.",
    fileUrl: "https://drive.google.com/drive/folders/1BamhCLMTs0RHH0TBTartmTxHqAFRhbE3?usp=sharing"
  },
  {
    id: "sec-summit",
    title: "District Secretaries & Presidents Summit",
    meetingDate: "2026-08-05",
    clubId: "DISTRICT SECRETARIAT",
    transcript_text: "Orientation for Club Presidents and Secretaries regarding reporting compliance and membership expansion guidelines.",
    fileUrl: "https://drive.google.com/drive/folders/1BamhCLMTs0RHH0TBTartmTxHqAFRhbE3?usp=sharing"
  }
];
