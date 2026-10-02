import React, { useState } from 'react';
import { VERIFIED_ORGANISATION_INFO } from '../../data/seedData';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-4 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFF100] uppercase tracking-wider">
          <Mail className="w-4 h-4 text-[#D71F26]" />
          <span>Saluran Perhubungan Rasmi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
          Hubungi PSSGM Bahagian Negeri Perak
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Sebarang urusan berkaitan pendaftaran cawangan baharu, pentauliahan gelanggang, semakan sijil,
          atau pertanyaan am boleh disalurkan kepada Urusetia Pentadbiran Negeri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Pusat Pentadbiran Negeri</h3>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D71F26] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Alamat Urusetia:</div>
                  <div className="text-stone-400">
                    Pusat Operasi Pentadbiran Silat Seni Gayong Bahagian Negeri Perak,
                    <br />
                    Ipoh, Perak Darul Ridzuan.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#FFF100] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Emel Rasmi:</div>
                  <div className="text-stone-400 font-mono">urusetia@pss-gayong-perak.my</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Waktu Urusan Urusetia:</div>
                  <div className="text-stone-400">
                    Isnin – Jumaat: 9:00 pagi – 5:00 petang
                    <br />
                    Sabtu &amp; Ahad: Mengikut takwim latihan &amp; kursus
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-2 text-xs">
            <h4 className="font-serif font-bold text-white">Pusat Rujukan Sejarah Air Kuning</h4>
            <p className="text-stone-400 leading-relaxed">
              Tapak Pusat Latihan Tertinggi Silat Seni Gayong Malaysia dan Serantau (1971) terletak di
              Air Kuning, Taiping, Perak dan diuruskan bersama oleh Lajnah Warisan Negeri.
            </p>
          </div>
        </div>

        {/* Message Form */}
        <div className="p-6 bg-[#121419] border border-stone-800 rounded-xl space-y-4">
          <h3 className="text-base font-bold text-white font-serif">Kirimkan Mesej / Pertanyaan</h3>

          {sent ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-lg text-xs text-emerald-200 space-y-2 text-center py-8">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="font-bold text-white">Mesej Anda Telah Diterima</div>
              <p className="text-[11px] text-stone-300">
                Terima kasih {name}. Urusetia kami akan meneliti pertanyaan anda dalam tempoh 2-3 hari bekerja.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Nama Penuh *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama anda"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Nombor Telefon / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+60 1x-xxx xxxx"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Kategori Pertanyaan</label>
                <select className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none">
                  <option>Pendaftaran Keahlian Baharu</option>
                  <option>Pentauliahan Gelanggang / Gurulatih</option>
                  <option>Semakan Sijil &amp; Bengkong</option>
                  <option>Penubuhan Cawangan Baharu</option>
                  <option>Lain-lain</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Mesej / Butiran Pertanyaan *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pertanyaan atau permohonan anda di sini..."
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-md text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#D71F26] hover:bg-[#b8171d] text-white font-bold rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Hantar Mesej</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
