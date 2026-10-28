import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Send,
  ShieldCheck,
  UserRoundPlus,
  X,
} from "lucide-react";
import "./TuahBot.css";

type BotAction = {
  label: string;
  path: string;
};

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
  action?: BotAction;
};

type Topic = {
  keywords: string[];
  content: string;
  action: BotAction;
};

const topics: Topic[] = [
  {
    keywords: ["gelanggang", "cawangan", "tempat latihan", "lokasi latihan"],
    content:
      "Direktori Gelanggang memaparkan lokasi dan maklumat latihan dalam demo ini. Semak butiran dengan cawangan sebelum berkunjung.",
    action: { label: "Buka direktori gelanggang", path: "/gelanggang" },
  },
  {
    keywords: ["program", "latihan", "aktiviti", "warta", "acara"],
    content:
      "Program & Warta menunjukkan contoh hebahan dan aktiviti. Sila sahkan tarikh serta tempat dengan pihak PSSGM Perak.",
    action: { label: "Lihat program & warta", path: "/program" },
  },
  {
    keywords: ["semak", "status", "bengkong", "sijil", "kad ahli"],
    content:
      "Demo ini tidak menyemak rekod ahli sebenar. Untuk lihat contoh aliran semakan, buka halaman Semak Keahlian. Jangan masukkan nombor IC atau maklumat sulit di sini.",
    action: { label: "Buka semakan demo", path: "/semakan" },
  },
  {
    keywords: ["ahli", "keahlian", "daftar", "sertai", "permohonan"],
    content:
      "Halaman Sertai Gayong menunjukkan contoh aliran permohonan. Maklumat yang diisi dalam demo tidak dihantar atau disimpan sebagai rekod rasmi.",
    action: { label: "Lihat aliran permohonan", path: "/sertai" },
  },
  {
    keywords: ["hubungi", "pegawai", "urusetia", "telefon", "whatsapp"],
    content:
      "Untuk pengesahan rasmi, rujuk saluran hubungan yang disenaraikan oleh PSSGM Perak. Saluran chat ini belum disambungkan kepada pegawai.",
    action: { label: "Buka Hubungi Kami", path: "/hubungi" },
  },
];

const quickPrompts = [
  { label: "Cara jadi ahli", icon: UserRoundPlus },
  { label: "Cari gelanggang", icon: MapPin },
  { label: "Program terkini", icon: CalendarDays },
];

function getReply(question: string): Pick<ChatMessage, "content" | "action"> {
  const normalized = question.toLocaleLowerCase("ms-MY");
  const topic = topics.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (topic) return { content: topic.content, action: topic.action };

  return {
    content:
      "Saya belum ada jawapan yang disahkan untuk soalan itu. Cuba pilih topik di bawah atau rujuk halaman Hubungi Kami. Jangan kongsi nombor IC, kata laluan, atau maklumat peribadi dalam demo ini.",
    action: { label: "Hubungi Kami", path: "/hubungi" },
  };
}

export function TuahBot({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Assalamualaikum! Saya Tuah Bot. Nak cari maklumat apa hari ini?",
    },
  ]);
  const nextMessageId = useRef(1);
  const hasOpened = useRef(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if (hasOpened.current) launcherRef.current?.focus();
      return;
    }
    hasOpened.current = true;
    inputRef.current?.focus();
    if (messages.length > 1) {
      transcriptEndRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "end",
      });
    }
  }, [isOpen, messages]);

  const sendQuestion = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    const userMessage: ChatMessage = {
      id: nextMessageId.current++,
      role: "user",
      content: cleanQuestion,
    };
    const reply = getReply(cleanQuestion);
    const assistantMessage: ChatMessage = {
      id: nextMessageId.current++,
      role: "assistant",
      ...reply,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setDraft("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendQuestion(draft);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <div className={`tuah-bot${isOpen ? " is-open" : ""}`}>
      {isOpen && (
        <section
          className="tuah-chat-panel"
          id="tuah-chat-panel"
          aria-label="Chat dengan Tuah Bot"
        >
          <header className="tuah-chat-header">
            <div className="tuah-bot-mark" aria-hidden="true">
              <img src="/images/tuah-bot-mascot.png" alt="" />
            </div>
            <div className="tuah-chat-identity">
              <strong>Tuah Bot</strong>
              <span>
                <i /> Sedia membantu
              </span>
            </div>
            <button
              type="button"
              className="tuah-icon-button"
              aria-label="Tutup Tuah Bot"
              onClick={closeChat}
            >
              <X />
            </button>
          </header>

          <div className="tuah-chat-demo-note">
            <ShieldCheck aria-hidden="true" />
            <span>Demo frontend · Jawapan simulasi</span>
          </div>

          <div
            className="tuah-chat-transcript"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Perbualan Tuah Bot"
          >
            {messages.map((message) => (
              <article
                className={`tuah-message tuah-message-${message.role}`}
                key={message.id}
              >
                <p>{message.content}</p>
                {message.action && (
                  <button
                    type="button"
                    className="tuah-message-action"
                    onClick={() => {
                      onNavigate(message.action!.path);
                      closeChat();
                    }}
                  >
                    {message.action.label}
                    <ChevronRight aria-hidden="true" />
                  </button>
                )}
              </article>
            ))}

            {messages.length === 1 && (
              <div className="tuah-quick-prompts" aria-label="Soalan pantas">
                {quickPrompts.map(({ label, icon: Icon }) => (
                  <button
                    type="button"
                    className="tuah-quick-prompt"
                    key={label}
                    onClick={() => sendQuestion(label)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                    <ChevronRight aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>

          <form className="tuah-chat-composer" onSubmit={handleSubmit}>
            <label className="tuah-sr-only" htmlFor="tuah-message-input">
              Tulis soalan kepada Tuah Bot
            </label>
            <input
              id="tuah-message-input"
              ref={inputRef}
              autoComplete="off"
              maxLength={500}
              placeholder="Tulis soalan anda…"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button
              type="submit"
              aria-label="Hantar soalan"
              disabled={!draft.trim()}
            >
              <Send aria-hidden="true" />
            </button>
          </form>
          <p className="tuah-chat-privacy">
            Jangan kongsi nombor IC atau maklumat sulit. Tiada mesej dihantar ke
            server.
          </p>
        </section>
      )}

      <button
        className={`tuah-chat-launcher${isOpen ? " is-open" : ""}`}
        type="button"
        aria-label={isOpen ? "Tutup Tuah Bot" : "Buka Tuah Bot"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "tuah-chat-panel" : undefined}
        ref={launcherRef}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <X aria-hidden="true" />
        ) : (
          <img
            className="tuah-launcher-mascot"
            src="/images/tuah-bot-mascot.png"
            alt=""
            aria-hidden="true"
          />
        )}
        <span>{isOpen ? "Tutup" : "Tanya Tuah Bot"}</span>
      </button>
    </div>
  );
}
