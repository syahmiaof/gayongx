import { SYNTHETIC_PRIMARY_MEMBER as member } from "../../data/seedData";
import { downloadText } from "../ui/DemoUI";

async function localImageData(path: string): Promise<string> {
  const response = await fetch(path);
  if (!response.ok)
    throw new Error("Aset kad tidak dapat dibaca. Cuba sekali lagi.");
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Imej kad tidak dapat dijana."));
    reader.readAsDataURL(blob);
  });
}

function escapeXml(value: string): string {
  return value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
}

export async function downloadMemberCard(): Promise<void> {
  const [logo, portrait] = await Promise.all([
    localImageData("/logo-pssgm.png"),
    localImageData("/images/reference/member-portrait-demo.png"),
  ]);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="860" height="540" viewBox="0 0 860 540">
    <rect width="860" height="540" rx="28" fill="#f5f2ea"/>
    <image href="${logo}" x="35" y="25" width="115" height="145"/>
    <g font-family="Arial,sans-serif" fill="#101719">
      <text x="174" y="67" font-size="22" font-weight="700">PERTUBUHAN SILAT SENI GAYONG</text>
      <text x="174" y="97" font-size="22" font-weight="700">MALAYSIA</text>
      <text x="174" y="130" font-size="18" fill="#9b7817">BAHAGIAN NEGERI PERAK</text>
      <text x="40" y="225" font-size="28" font-weight="700">${escapeXml(member.fullName)}</text>
      <text x="40" y="270" font-size="23">${escapeXml(member.membershipNumber)}</text>
      <text x="40" y="312" font-size="23">Ahli Biasa · Aktif</text>
      <text x="40" y="362" font-size="20">Cawangan Daerah Batang Padang</text>
      <text x="40" y="394" font-size="20">${escapeXml(member.gelanggangName)}</text>
      <text x="40" y="440" font-size="18">Sah sehingga: 31 Disember 2026</text>
      <text x="40" y="500" font-size="16" fill="#53615b">DEMO_SYNTHETIC — Bukan kad pengesahan rasmi</text>
    </g>
    <image href="${portrait}" x="645" y="180" width="165" height="180" preserveAspectRatio="xMidYMid slice"/>
    <rect x="656" y="389" width="142" height="58" rx="5" fill="#fff" stroke="#727b77"/>
    <text x="727" y="424" text-anchor="middle" font-family="Arial,sans-serif" font-size="15">QR DEMO</text>
  </svg>`;
  downloadText("kad-ahli-demo.svg", svg, "image/svg+xml;charset=utf-8");
}
