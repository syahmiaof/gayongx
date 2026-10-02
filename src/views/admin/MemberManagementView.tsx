import React, { useState } from 'react';
import { SYNTHETIC_MEMBERS_LIST, CAWANGAN_LIST, BENGKONG_SYLLABUS } from '../../data/seedData';
import { MemberRecord, MembershipCategory, MembershipStatus } from '../../types';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  Award,
  Shield,
  Clock,
} from 'lucide-react';

export const MemberManagementView: React.FC = () => {
  const [members, setMembers] = useState<MemberRecord[]>(SYNTHETIC_MEMBERS_LIST);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeModalMember, setActiveModalMember] = useState<MemberRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New member form states
  const [newName, setNewName] = useState('');
  const [newIc, setNewIc] = useState('');
  const [newCategory, setNewCategory] = useState<MembershipCategory>('Ahli Biasa');
  const [newCawangan, setNewCawangan] = useState(CAWANGAN_LIST[0].name);

  const filteredMembers = members.filter((m) => {
    const matchSearch =
      search === '' ||
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.membershipNumber.toLowerCase().includes(search.toLowerCase()) ||
      m.cawanganName.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'all' || m.membershipCategory === selectedCategory;
    const matchStat = selectedStatus === 'all' || m.status === selectedStatus;
    return matchSearch && matchCat && matchStat;
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newRecord: MemberRecord = {
      id: `mem-demo-${Date.now()}`,
      membershipNumber: `PSSGM-PK-DEMO-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: newName,
      maskedIc: `XXXXXX-XX-${newIc.slice(-4) || '7890'}`,
      membershipCategory: newCategory,
      status: 'Aktif',
      joinedDate: new Date().toISOString().split('T')[0],
      expiryDate: '2027-10-01',
      cawanganId: 'caw-bp',
      cawanganName: newCawangan,
      gelanggangId: 'gel-demo-tapah',
      gelanggangName: 'Gelanggang Berdaftar Perak',
      currentBengkongId: 'hitam-mulus',
      currentBengkongName: 'Hitam Mulus',
      trainerName: 'Dewan Jurulatih Bertauliah',
      contactMasked: {
        phone: '+60 1x-*** 0000',
        email: 'ahli.baharu@demo.pss-gayong.my',
        district: 'Perak',
      },
      bengkongJourney: [],
      certificates: [],
      programmes: [],
      payments: [],
      auditHistory: [
        {
          timestamp: new Date().toLocaleString(),
          action: 'Pendaftaran Ahli Baru',
          officer: 'Pentadbir Negeri Perak',
          remarks: 'Keahlian dijana melalui Command Centre.',
        },
      ],
      dataProvenance: { dataOrigin: 'DEMO_SYNTHETIC' },
    };

    setMembers([newRecord, ...members]);
    setShowAddModal(false);
    setNewName('');
    setNewIc('');
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="text-xs font-mono text-[#FFF100] uppercase tracking-wider">
            Pengurusan Statutori Keahlian
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Direktori Ahli Silat Seni Gayong Perak
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Pengkalan data ahli berdaftar di bawah PSSGM Bahagian Negeri Perak. MyKad dipaparkan dalam
            format dilindungi: <strong className="text-stone-300 font-mono">XXXXXX-XX-1234</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#D71F26] hover:bg-[#b5171d] text-white text-xs font-bold rounded-md shadow flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Daftar Ahli Baharu</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#111216] border border-stone-800 rounded-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari nama, no. ahli atau cawangan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-800 rounded-md text-xs text-white placeholder-stone-500 focus:outline-none"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-md text-xs text-white focus:outline-none"
            >
              <option value="all">Semua Kategori Keahlian</option>
              <option value="Ahli Biasa">Ahli Biasa</option>
              <option value="Ahli Seumur Hidup">Ahli Seumur Hidup</option>
              <option value="Ahli Bersekutu">Ahli Bersekutu</option>
              <option value="Ahli Terus">Ahli Terus</option>
              <option value="Ahli Gabungan">Ahli Gabungan</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-md text-xs text-white focus:outline-none"
            >
              <option value="all">Semua Status Keahlian</option>
              <option value="Aktif">Aktif</option>
              <option value="Tamat Tempoh">Tamat Tempoh</option>
              <option value="Menunggu Kelulusan">Menunggu Kelulusan</option>
            </select>
          </div>
        </div>

        <div className="text-[11px] text-stone-500 font-mono flex items-center justify-between">
          <span>Menunjukkan {filteredMembers.length} daripada {members.length} rekod simulasi</span>
          <span className="text-emerald-400">Pematuhan Privasi Data Berkanun</span>
        </div>
      </div>

      {/* Member Table */}
      <div className="bg-[#111216] border border-stone-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-900/80 border-b border-stone-800 text-stone-400 font-mono text-[11px]">
              <tr>
                <th className="p-3.5">No. Keahlian &amp; Nama</th>
                <th className="p-3.5">MyKad (Masked)</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Cawangan / Gelanggang</th>
                <th className="p-3.5">Bengkong</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-300">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-stone-900/40 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-white font-serif">{m.fullName}</div>
                    <div className="text-[11px] font-mono text-[#FFF100] mt-0.5">
                      {m.membershipNumber}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-stone-400">{m.maskedIc}</td>
                  <td className="p-3.5">{m.membershipCategory}</td>
                  <td className="p-3.5">
                    <div className="font-medium text-stone-200">{m.cawanganName}</div>
                    <div className="text-[10px] text-stone-500">{m.gelanggangName}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#297E62]" />
                      <span>{m.currentBengkongName}</span>
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        m.status === 'Aktif'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : m.status === 'Tamat Tempoh'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setActiveModalMember(m)}
                      className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded text-xs font-medium inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profil</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Details Modal */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#14161c] border border-stone-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase">
                  Profil Penuh Ahli
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  {activeModalMember.fullName}
                </h3>
                <div className="text-xs font-mono text-[#FFF100] mt-0.5">
                  {activeModalMember.membershipNumber}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalMember(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
                <span className="text-stone-500">Nombor MyKad:</span>
                <div className="font-mono text-white font-bold">{activeModalMember.maskedIc}</div>
              </div>
              <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
                <span className="text-stone-500">Taraf Keahlian:</span>
                <div className="text-white font-semibold">{activeModalMember.membershipCategory}</div>
              </div>
              <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
                <span className="text-stone-500">Cawangan:</span>
                <div className="text-white">{activeModalMember.cawanganName}</div>
              </div>
              <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
                <span className="text-stone-500">Gelanggang Latihan:</span>
                <div className="text-white">{activeModalMember.gelanggangName}</div>
              </div>
              <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
                <span className="text-stone-500">Bengkong Semasa:</span>
                <div className="text-emerald-400 font-bold">
                  {activeModalMember.currentBengkongName}
                </div>
              </div>
              <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
                <span className="text-stone-500">Tempoh Luput:</span>
                <div className="font-mono text-stone-200">{activeModalMember.expiryDate}</div>
              </div>
            </div>

            {/* Audit Trail for Member */}
            <div className="space-y-2 border-t border-stone-800 pt-4">
              <span className="text-[10px] font-mono uppercase text-stone-400">Jejak Audit Rekod:</span>
              <div className="space-y-1.5 text-[11px] text-stone-300">
                {activeModalMember.auditHistory?.map((a, i) => (
                  <div key={i} className="p-2 bg-stone-900/40 rounded border border-stone-800/80">
                    <div className="flex justify-between font-mono text-stone-400 text-[10px]">
                      <span>{a.timestamp}</span>
                      <span className="text-stone-300 font-semibold">{a.officer}</span>
                    </div>
                    <div className="font-medium text-white mt-0.5">{a.action}</div>
                    <div className="text-stone-400 text-[10px]">{a.remarks}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-stone-800 pt-4 text-xs">
              <DataProvenanceBadge provenance={activeModalMember.dataProvenance} />
              <button
                type="button"
                onClick={() => setActiveModalMember(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#14161c] border border-stone-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white font-serif">Daftar Rekod Ahli Baharu</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 mb-1">Nama Penuh *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nama ahli mengikut kad pengenalan"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Nombor MyKad *</label>
                <input
                  type="text"
                  required
                  value={newIc}
                  onChange={(e) => setNewIc(e.target.value)}
                  placeholder="Contoh: 950812085431"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Kategori Keahlian</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MembershipCategory)}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white"
                >
                  <option value="Ahli Biasa">Ahli Biasa</option>
                  <option value="Ahli Seumur Hidup">Ahli Seumur Hidup</option>
                  <option value="Ahli Bersekutu">Ahli Bersekutu</option>
                  <option value="Ahli Terus">Ahli Terus</option>
                  <option value="Ahli Gabungan">Ahli Gabungan</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Cawangan</label>
                <select
                  value={newCawangan}
                  onChange={(e) => setNewCawangan(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white"
                >
                  {CAWANGAN_LIST.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-stone-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D71F26] hover:bg-[#b5171d] text-white font-bold rounded"
                >
                  Simpan Ahli Baharu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
