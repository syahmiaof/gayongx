import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./WelcomeIntro.css";

export function WelcomeIntro({ onComplete }: { onComplete: () => void }) {
  const introRef = useRef<HTMLDialogElement>(null);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const dialog = introRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        timeline
          .fromTo(
            ".welcome-mark",
            { autoAlpha: 0, scale: 0.84, rotate: -5, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              scale: 1,
              rotate: 0,
              filter: "blur(0px)",
              duration: 0.72,
            },
          )
          .fromTo(
            ".welcome-rule",
            { scaleX: 0, transformOrigin: "center" },
            { scaleX: 1, duration: 0.52 },
            "-=0.34",
          )
          .fromTo(
            ".welcome-title span",
            { autoAlpha: 0, y: 22, clipPath: "inset(0 0 100% 0)" },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.64,
              stagger: 0.1,
            },
            "-=0.2",
          )
          .fromTo(
            [".welcome-tagline", ".welcome-enter"],
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.07,
              clearProps: "transform,opacity,visibility",
            },
            "-=0.16",
          );

        return () => timeline.kill();
      });

      return () => media.revert();
    },
    { scope: introRef },
  );

  const finishIntro = useCallback(
    contextSafe(() => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const dialog = introRef.current;
      const finish = () => {
        if (dialog?.open) dialog.close();
        onCompleteRef.current();
      };

      if (!dialog || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }

      gsap.to(dialog, {
        autoAlpha: 0,
        scale: 0.99,
        duration: 0.28,
        ease: "power2.inOut",
        onComplete: finish,
      });
    }),
    [contextSafe],
  );

  useEffect(() => {
    const timer = window.setTimeout(finishIntro, 4500);
    return () => window.clearTimeout(timer);
  }, [finishIntro]);

  return (
    <dialog
      className="welcome-intro"
      ref={introRef}
      aria-labelledby="welcome-intro-title"
      onCancel={(event) => {
        event.preventDefault();
        finishIntro();
      }}
    >
      <div className="welcome-frame">
        <button
          className="welcome-skip"
          type="button"
          autoFocus
          onClick={finishIntro}
        >
          Langkau intro
        </button>

        <div className="welcome-content">
          <img
            className="welcome-mark"
            src="/logo-pssgm.png"
            alt="Logo rasmi PSSGM"
            width="124"
            height="160"
          />
          <div className="welcome-rule" aria-hidden="true" />
          <h1 className="welcome-title" id="welcome-intro-title">
            <span>Selamat datang ke</span>
            <span>
              Portal Rasmi <strong>PSSGM Perak</strong>
            </span>
          </h1>
          <p className="welcome-tagline">
            SILAT <i /> SENI <i /> WARISAN <i /> JATI DIRI
          </p>
          <button
            className="welcome-enter"
            type="button"
            onClick={finishIntro}
          >
            Masuk ke laman utama
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div className="welcome-footer">
          PERTUBUHAN SILAT SENI GAYONG MALAYSIA · BAHAGIAN NEGERI PERAK
        </div>
      </div>
    </dialog>
  );
}
