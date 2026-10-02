import React, { useState } from 'react';
import { SYNTHETIC_PRIMARY_MEMBER } from '../../data/seedData';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { User, Phone, Mail, MapPin, CheckCircle2, Shield, Save } from 'lucide-react';

export const MemberProfileView: React.FC = () => {
  const member = SYNTHETIC_PRIMARY_MEMBER;
  const [phone, setPhone] = useState('+60 19-555 8291');
  const [email, setEmail] = useState('a.firdaus@demo.pss-gayong.my');
  const [emergencyContact, setEmergencyContact] = useState('Rahman bin Yaakob (Bapa) - +60 12-334 1102');
  const [bloodType, setBloodType] = useState('O+');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <div className="border-b border-stone-800 pb-6 flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            Pengurusan Profil &amp; Data Peribadi
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Profil Pesilat
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Kemaskini saluran perhubungan, maklumat kecemasan dan pusat latihan berdaftar.
          </p>
        </div>

        <DataProvenanceBadge provenance={member.dataProvenance} />
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-md text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Maklumat profil anda telah berjaya dikemaskini dalam pangkalan data.</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Data Statutori Tidak Boleh Diubah Secara Bebas */}
        <div className="p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-4">
          <div className="text-xs font-mono text-stone-400 uppercase tracking-wider font-semibold">
            Maklumat Pendaftaran Berkanun (Terkunci)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-500 mb-1">Nama Penuh Rasmi</label>
              <input
                type="text"
                disabled
                value={member.fullName}
                className="w-full px-3 py-2 bg-stone-900/60 border border-stone-800 rounded text-stone-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Nombor Keahlian Rasmi</label>
              <input
                type="text"
                disabled
                value={member.membershipNumber}
                className="w-full px-3 py-2 bg-stone-900/60 border border-stone-800 rounded text-stone-400 font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Nombor MyKad (Format Dilindungi)</label>
              <input
                type="text"
                disabled
                value={member.maskedIc}
                className="w-full px-3 py-2 bg-stone-900/60 border border-stone-800 rounded text-stone-400 font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Cawangan / Gelanggang Berdaftar</label>
              <input
                type="text"
                disabled
                value={`${member.cawanganName} (${member.gelanggangName})`}
                className="w-full px-3 py-2 bg-stone-900/60 border border-stone-800 rounded text-stone-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Saluran Perhubungan & Maklumat Kecemasan */}
        <div className="p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-4">
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
            Maklumat Perhubungan Boleh Dikemaskini
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-medium mb-1">Nombor Telefon Bimbit *</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white focus:outline-none focus:border-stone-600"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Alamat Emel</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white focus:outline-none focus:border-stone-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-300 font-medium mb-1">
                Waris &amp; Nombor Kecemasan *
              </label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white focus:outline-none focus:border-stone-600"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Kumpulan Darah</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white focus:outline-none"
              >
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O+">O+</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">Daerah Kediaman</label>
              <input
                type="text"
                defaultValue="Batang Padang, Perak"
                className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#297E62] hover:bg-[#20664f] text-white text-xs font-bold rounded-lg shadow flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
