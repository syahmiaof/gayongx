import React, { useState } from 'react';
import { MembershipCategory } from '../../types';
import { CAWANGAN_LIST, GELANGGANG_LIST } from '../../data/seedData';
import { UserPlus, ShieldCheck, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
  onApplicationSubmitted?: (appName: string) => void;
}

export const JoinView: React.FC<Props> = ({ onNavigate, onApplicationSubmitted }) => {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<MembershipCategory>('Ahli Biasa');
  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cawanganId, setCawanganId] = useState(CAWANGAN_LIST[0].id);
  const [gelanggangId, setGelanggangId] = useState(GELANGGANG_LIST[0].id);
  const [acceptedPledge, setAcceptedPledge] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const membershipCategories: { type: MembershipCategory; desc: string; fee: string }[] = [
    {
      type: 'Ahli Biasa',
      desc: 'Warganegara Malaysia berumur 18 tahun ke atas yang aktif menjalani latihan di mana-mana gelanggang berdaftar.',
      fee: 'RM 40.00 / tahun',
    },
    {
      type: 'Ahli Seumur Hidup',
      desc: 'Keahlian berterusan tanpa pembaharuan tahunan untuk pesilat berstatus gurulatih atau sumbangan istimewa.',
      fee: 'RM 300.00 sekali seumur hidup',
    },
    {
      type: 'Ahli Bersekutu',
      desc: 'Individu yang menyokong perkembangan Silat Seni Gayong tetapi tidak bertanding atau menjalani ujian fizikal penuh.',
      fee: 'RM 50.00 / tahun',
    },
    {
      type: 'Ahli Terus',
      desc: 'Pendaftaran terus di bawah Jawatankuasa Bahagian Negeri bagi kawasan yang belum mempunyai cawangan berdaftar.',
      fee: 'RM 45.00 / tahun',
    },
    {
      type: 'Ahli Gabungan',
      desc: 'Keahlian melalui kelab, persatuan sekolah, institusi pengajian tinggi (IPT) atau badan berkanun.',
      fee: 'RM 25.00 / tahun',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Sila masukkan nama penuh mengikut MyKad.');
      return;
    }
    if (!icNumber.trim() || icNumber.length < 12) {
      setErrorMessage('Sila masukkan nombor MyKad yang sah (12 digit).');
      return;
    }
    if (!acceptedPledge) {
      setErrorMessage('Sila tandakan persetujuan Ikrar & Adab Silat Seni Gayong.');
      return;
    }

    setErrorMessage('');
    setSubmitted(true);
    if (onApplicationSubmitted) {
      onApplicationSubmitted(fullName);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Permohonan Keahlian Telah Berjaya Dihantar
          </h2>
          <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
            Permohonan anda bagi <strong className="text-white">{fullName}</strong> telah dimasukkan
            ke dalam Sistem Pusat Kelulusan PSSGM Bahagian Negeri Perak.
          </p>
        </div>

        <div className="p-4 bg-[#14161c] border border-stone-800 rounded-lg text-left text-xs font-mono space-y-2 max-w-md mx-auto text-stone-300">
          <div className="flex justify-between">
            <span className="text-stone-500">Kategori:</span>
            <span className="text-[#FFF100] font-bold">{category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">MyKad (Dimask):</span>
            <span className="text-white">
              XXXXXX-XX-{icNumber.slice(-4) || '1234'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Cawangan Dipilih:</span>
            <span className="text-white">
              {CAWANGAN_LIST.find((c) => c.id === cawanganId)?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Status Permohonan:</span>
            <span className="text-amber-400 font-semibold">Menunggu Semakan Cawangan</span>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/portal')}
            className="px-5 py-2.5 bg-[#297E62] hover:bg-[#216750] text-white text-xs font-semibold rounded-md shadow"
          >
            Lihat Contoh Portal Ahli
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/semakan')}
            className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-md border border-stone-700"
          >
            Semak Status Pendaftaran
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-left">
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#D71F26] uppercase tracking-wider">
          <UserPlus className="w-4 h-4" />
          <span>Pendaftaran Keahlian Baharu</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Borang Permohonan Keahlian Silat Seni Gayong Perak
        </h1>
        <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">
          Sertai keluarga besar Silat Seni Gayong Bahagian Negeri Perak. Sila lengkapkan butiran diri,
          pilih kategori keahlian, dan tentukan gelanggang latihan berhampiran anda.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-950/80 border border-red-800 rounded text-xs text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Kategori Keahlian */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
            <span className="w-5 h-5 rounded-full bg-[#D71F26] text-white text-xs font-bold flex items-center justify-center font-mono">
              1
            </span>
            <h3 className="text-base font-bold text-white font-serif">Pilih Kategori Keahlian</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {membershipCategories.map((cat) => {
              const isSelected = category === cat.type;
              return (
                <div
                  key={cat.type}
                  onClick={() => setCategory(cat.type)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-stone-900 border-[#FFF100] shadow-md ring-1 ring-[#FFF100]/40'
                      : 'bg-[#111216] border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${isSelected ? 'text-[#FFF100]' : 'text-white'}`}>
                      {cat.type}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                      {cat.fee}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Maklumat Peribadi */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
            <span className="w-5 h-5 rounded-full bg-[#D71F26] text-white text-xs font-bold flex items-center justify-center font-mono">
              2
            </span>
            <h3 className="text-base font-bold text-white font-serif">Maklumat Peribadi Pemohon</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">
                Nama Penuh (Mengikut MyKad) *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Muhammad Firdaus bin Rosli"
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none focus:border-stone-600"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">
                Nombor MyKad (12 Digit Tanpa '-') *
              </label>
              <input
                type="text"
                required
                maxLength={12}
                value={icNumber}
                onChange={(e) => setIcNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Contoh: 980102085431"
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-md text-white font-mono focus:outline-none focus:border-stone-600"
              />
              <span className="text-[10px] text-stone-500 mt-0.5 block">
                Privasi dilindungi: Nombor dipaparkan sebagai XXXXXX-XX-1234 dalam sistem awam.
              </span>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Nombor Telefon Bimbit *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: +60 19-876 5432"
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none focus:border-stone-600"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Alamat Emel</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contoh: pemohon@domain.my"
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none focus:border-stone-600"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Cawangan & Gelanggang Latihan */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
            <span className="w-5 h-5 rounded-full bg-[#D71F26] text-white text-xs font-bold flex items-center justify-center font-mono">
              3
            </span>
            <h3 className="text-base font-bold text-white font-serif">
              Pemilihan Cawangan &amp; Gelanggang
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">Cawangan Daerah *</label>
              <select
                value={cawanganId}
                onChange={(e) => setCawanganId(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none"
              >
                {CAWANGAN_LIST.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.district})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Gelanggang Latihan Pilihan *</label>
              <select
                value={gelanggangId}
                onChange={(e) => setGelanggangId(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none"
              >
                {GELANGGANG_LIST.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} - {g.leadTrainer}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 4: Ikrar & Perakuan Adab Silat Seni Gayong */}
        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-lg space-y-3 text-xs">
          <div className="font-semibold text-white">Ikrar &amp; Adab Pesilat Seni Gayong:</div>
          <p className="text-stone-300 text-[11px] leading-relaxed italic">
            &quot;Saya sesungguhnya berikrar akan sentiasa taat kepada agama, setia kepada Raja dan Negara,
            menghormati ibu bapa dan gurulatih, mematuhi adab gelanggang serta tidak sekali-kali menyalahgunakan
            ilmu Silat Seni Gayong untuk tujuan kezaliman atau kemungkaran.&quot;
          </p>

          <label className="flex items-start gap-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedPledge}
              onChange={(e) => setAcceptedPledge(e.target.checked)}
              className="mt-0.5 rounded text-[#D71F26] focus:ring-[#D71F26]"
            />
            <span className="text-stone-200 font-medium text-xs">
              Saya memperakui semua butiran yang diberikan adalah benar dan bersetuju dengan Ikrar Gayong.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex items-center justify-between border-t border-stone-800">
          <span className="text-[11px] text-stone-500 font-mono">
            Tadbir urus di bawah PPM-010-04-09042013-000034
          </span>
          <button
            type="submit"
            className="px-6 py-3 bg-[#D71F26] hover:bg-[#b5171d] text-white text-xs font-bold rounded-md shadow-md transition-all flex items-center gap-2"
          >
            <span>Hantar Permohonan Keahlian</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
