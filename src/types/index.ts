export type DataOrigin = 'VERIFIED_PUBLIC' | 'DATE_BOUND_PUBLIC' | 'DEMO_SYNTHETIC';

export interface DataProvenance {
  dataOrigin: DataOrigin;
  sourceName?: string;
  sourceUrl?: string;
  lastVerifiedAt?: string;
  note?: string;
}

export type MembershipCategory =
  | 'Ahli Biasa'
  | 'Ahli Bersekutu'
  | 'Ahli Terus'
  | 'Ahli Gabungan'
  | 'Ahli Seumur Hidup';

export type MembershipStatus =
  | 'Aktif'
  | 'Tamat Tempoh'
  | 'Menunggu Kelulusan'
  | 'Digantung';

export interface BengkongLevel {
  id: string;
  name: string;
  levelOrder: number;
  colorName: string;
  colorHex: string;
  stripeColor?: string;
  chulaCount?: number;
  description: string;
  philosophy: string;
  minimumDurationMonths: number;
  keySyllabus: string[];
}

export interface BengkongProgressRecord {
  bengkongId: string;
  name: string;
  status: 'COMPLETED' | 'CURRENT' | 'LOCKED';
  attainedDate?: string;
  examinerName?: string;
  certificateNo?: string;
  location?: string;
}

export interface MemberRecord {
  id: string;
  membershipNumber: string;
  fullName: string;
  maskedIc: string; // e.g. XXXXXX-XX-1234
  membershipCategory: MembershipCategory;
  status: MembershipStatus;
  joinedDate: string;
  expiryDate: string;
  cawanganId: string;
  cawanganName: string;
  gelanggangId: string;
  gelanggangName: string;
  currentBengkongId: string;
  currentBengkongName: string;
  trainerName: string;
  contactMasked: {
    phone: string;
    email: string;
    district: string;
  };
  bengkongJourney: BengkongProgressRecord[];
  certificates: {
    id: string;
    title: string;
    issueDate: string;
    certificateNumber: string;
    category: string;
    issuingAuthority: string;
  }[];
  programmes: {
    id: string;
    title: string;
    date: string;
    venue: string;
    role: string;
    status: 'Hadir' | 'Berdaftar' | 'Selesai';
  }[];
  payments: {
    id: string;
    reference: string;
    date: string;
    amount: number;
    description: string;
    receiptNo: string;
    status: 'Selesai' | 'Menunggu';
  }[];
  auditHistory: {
    timestamp: string;
    action: string;
    officer: string;
    remarks: string;
  }[];
  dataProvenance: DataProvenance;
}

export interface BranchReadiness {
  requiredMembers: number;
  currentMembers: number;
  checkpoints: {
    id: string;
    label: string;
    completed: boolean;
    verificationDate?: string;
    statusNote: string;
  }[];
}

export interface CawanganRecord {
  id: string;
  name: string;
  code: string;
  registrationNumber?: string;
  district: string;
  status: 'Rasmi Berdaftar' | 'Dalam Proses Penubuhan' | 'Cawangan Khas';
  memberCount: number;
  gelanggangCount: number;
  chairmanName: string;
  headquarters: string;
  establishedDate?: string;
  readiness?: BranchReadiness;
  dataProvenance: DataProvenance;
}

export interface GelanggangRecord {
  id: string;
  cawanganId: string;
  cawanganName: string;
  name: string;
  district: string;
  locationAddress: string;
  leadTrainer: string;
  assistantTrainer?: string;
  trainingSchedule: string[];
  activeStudentsCount: number;
  contactNumber: string;
  establishedYear: number;
  status: 'Aktif' | 'Rehat Semasa';
  dataProvenance: DataProvenance;
}

export type ApprovalRequestType =
  | 'Keahlian Baharu'
  | 'Pembaharuan'
  | 'Permohonan Sijil'
  | 'Kenaikan Bengkong'
  | 'Permohonan Gurulatih'
  | 'Permohonan Gelanggang'
  | 'Program'
  | 'Cawangan';

export type ApprovalStatus = 'Menunggu' | 'Diluluskan' | 'Dipulangkan' | 'Ditolak';

export interface ApprovalItem {
  id: string;
  requestType: ApprovalRequestType;
  requesterName: string;
  requesterMembershipNo?: string;
  organisationUnit: string;
  submissionDate: string;
  currentStage: string;
  requiredReviewer: string;
  status: ApprovalStatus;
  notes?: string;
  supportingDocuments: {
    name: string;
    size: string;
    type: string;
  }[];
  timeline: {
    stage: string;
    timestamp: string;
    note: string;
    actor: string;
  }[];
  dataProvenance: DataProvenance;
}

export interface ProgrammeRecord {
  id: string;
  title: string;
  category: 'Kursus Kejurulatihan' | 'Ujian Bengkong' | 'Majlis Mandi Minyak' | 'Kejohanan' | 'Mesyuarat Agung';
  startDate: string;
  endDate?: string;
  time: string;
  venue: string;
  district: string;
  cawanganHost: string;
  feePerParticipant: number;
  maxParticipants: number;
  registeredCount: number;
  status: 'Pendaftaran Dibuka' | 'Penuh' | 'Selesai' | 'Draf';
  description: string;
  highlights: string[];
  dataProvenance: DataProvenance;
}

export interface NewsRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: 'Warta Rasmi' | 'Aktiviti Gelanggang' | 'Takwim' | 'Arkib Sejarah';
  author: string;
  publishedStatus: 'Diterbitkan' | 'Draf' | 'Dijadualkan';
  readTime: string;
  content: string;
  dataProvenance: DataProvenance;
}

export interface HistoricalMilestone {
  year: string;
  dateExact?: string;
  title: string;
  location: string;
  summary: string;
  fullNarrative: string;
  significance: string;
  dataProvenance: DataProvenance;
}

export interface OrgNode {
  id: string;
  title: string;
  name: string;
  role: string;
  unitType: 'Negeri' | 'Cawangan' | 'Gelanggang' | 'Biro';
  bengkong?: string;
  verifiedDate?: string;
  children?: OrgNode[];
  dataProvenance: DataProvenance;
}
