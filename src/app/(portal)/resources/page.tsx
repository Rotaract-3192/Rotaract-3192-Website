import ResourcesClient from './ResourcesClient';

export default function ResourcesPage() {
  const staticResources = [
    {
      id: '1',
      fileName: 'District-3192-Brand-Guidelines-2026-27.pdf',
      fileSize: 4823400,
      mimeType: 'application/pdf',
      r2Key: 'brand-kit',
      uploadedBy: 'District Editorial',
      category: 'Branding',
      isPublic: true,
      createdAt: new Date('2026-07-01'),
    },
    {
      id: '2',
      fileName: 'Official-Rotaract-Logos-Vector-Pack.zip',
      fileSize: 15400000,
      mimeType: 'application/zip',
      r2Key: 'logo-pack',
      uploadedBy: 'Public Relations',
      category: 'Assets',
      isPublic: true,
      createdAt: new Date('2026-07-01'),
    },
    {
      id: '3',
      fileName: 'District-Directory-RY-2026-27.pdf',
      fileSize: 2840000,
      mimeType: 'application/pdf',
      r2Key: 'directory',
      uploadedBy: 'District Secretariat',
      category: 'Governance',
      isPublic: true,
      createdAt: new Date('2026-07-05'),
    },
    {
      id: '4',
      fileName: 'Standard-Rotaract-Club-Bylaws.docx',
      fileSize: 520000,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      r2Key: 'bylaws',
      uploadedBy: 'District Legal',
      category: 'Policy',
      isPublic: true,
      createdAt: new Date('2026-07-10'),
    },
  ];

  return (
    <ResourcesClient 
      resources={staticResources as any} 
      linkUrl="https://drive.google.com/drive/folders/1BamhCLMTs0RHH0TBTartmTxHqAFRhbE3?usp=sharing" 
      videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    />
  );
}

