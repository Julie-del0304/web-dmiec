import { useEffect, useState, useRef } from "react";

import img1 from "../../../public/images/img1.png";
import img2 from "../../../public/images/img2.jpeg";
import img3 from "../../../public/images/img3.jpeg";
import img4 from "../../../public/images/img4.jpeg";
import img5 from "../../../public/images/img5.jpeg";
import img6 from "../../../public/images/img6.jpeg";

const images = [img1, img2, img3, img4, img5, img6];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const rafRef = useRef<number | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measureNav = () => {
    const navbar = document.querySelector("header");
    if (navbar) {
      const bottom = navbar.getBoundingClientRect().bottom;
      if (bottom > 0) {
        setNavHeight(Math.ceil(bottom));
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const tryMeasure = (attempts = 0) => {
      const success = measureNav();
      if (!success && attempts < 10) {
        retryRef.current = setTimeout(() => tryMeasure(attempts + 1), 100);
      }
    };
    rafRef.current = requestAnimationFrame(() => tryMeasure());
    window.addEventListener("resize", measureNav);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (retryRef.current) clearTimeout(retryRef.current);
      window.removeEventListener("resize", measureNav);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % images.length;
      });
      setTransitioning(true);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 700);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goTo = (i: number) => {
    if (i === current) return;
    setPrev(current);
    setCurrent(i);
    setTransitioning(true);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 700);
  };

  // Desktop: fixed 560px so landscape images fill perfectly with cover — no empty space
  // Mobile:  full remaining viewport height
  const sectionHeight = navHeight > 0
    ? `calc(100svh - ${navHeight}px)`
    : "100svh";

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; }

        @keyframes heroBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-8px); }
        }

        .hero-btn {
          flex: 1 1 0;
          min-width: 0;
          padding: 12px 10px;
          border-radius: 14px;
          font-size: clamp(13px, 3.8vw, 17px);
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          white-space: nowrap;
          box-sizing: border-box;
        }
        .hero-btn-primary {
          background: linear-gradient(135deg, #0ea5e9, #2563eb);
          box-shadow: 0 0 20px rgba(14,165,233,0.5), 0 4px 12px rgba(0,0,0,0.25);
          border: 2px solid rgba(255,255,255,0.3);
          color: white;
        }
        .hero-btn-secondary {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid rgba(255,255,255,0.55);
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          color: white;
        }
        .hero-dot-wrap {
          padding: 8px 4px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
        }
        @media (max-width: 340px) {
          .hero-btn { flex: 1 1 100%; }
        }
      `}</style>

      <div style={{
        marginTop: navHeight > 0 ? `${navHeight}px` : 0,
        visibility: navHeight > 0 ? "visible" : "hidden",
      }}>
        <section style={{
          position: "relative",
          width: "100%",
          // aspect-ratio matches typical landscape photo (16:9)
          // so cover fills perfectly on ALL screen sizes — no cropping, no empty space
          aspectRatio: "16/9",
          maxHeight: `calc(100svh - ${navHeight}px)`,
          minHeight: "280px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#111",
        }}>

          {/* Previous image stays visible underneath during crossfade — no black flash */}
          {prev !== null && (
            <img
              key={"prev-" + prev}
              src={images[prev]}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                opacity: 1,
                filter: "brightness(1.2) saturate(1.15) contrast(1.04)",
                zIndex: 0,
              }}
            />
          )}
          {/* New image fades in on top */}
          <img
            key={"cur-" + current}
            src={images[current]}
            alt="DMI Campus"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              opacity: transitioning ? 0 : 1,
              transition: "opacity 0.7s ease-in-out",
              filter: "brightness(1.2) saturate(1.15) contrast(1.04)",
              zIndex: 1,
            }}
          />

          {/* Gradient overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.6) 100%)",
          }} />

          {/* Buttons + dots */}
          <div style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "clamp(60px, 8vh, 100px)",
            gap: "16px",
          }}>
            <div style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              padding: "0 20px",
              boxSizing: "border-box",
              maxWidth: "360px",
            }}>
              <button className="hero-btn hero-btn-primary" onClick={() => window.open('https://admissions.dmifoundations.org/dmi-engineering-college-application-form', '_blank')}>
                <i className="ri-edit-box-line"></i>Admission 2026-27
              </button>
              <button className="hero-btn hero-btn-secondary" onClick={() => scrollToSection("virtual-tour")}>
                <i className="ri-video-line"></i>Virtual Tour
              </button>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              {images.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} className="hero-dot-wrap">
                  <span style={{
                    display: "block",
                    width: i === current ? "28px" : "10px",
                    height: "10px",
                    borderRadius: "5px",
                    background: i === current ? "#38bdf8" : "rgba(255,255,255,0.6)",
                    boxShadow: i === current ? "0 0 10px #38bdf8" : "none",
                    transition: "all 0.35s ease",
                  }} />
                </button>
              ))}
            </div>
          </div>

          {/* Scroll arrow */}
          <div style={{
            position: "absolute", bottom: "1rem", left: "50%",
            transform: "translateX(-50%)", zIndex: 3,
            animation: "heroBounce 2s infinite",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "2px solid rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="ri-arrow-down-line" style={{ color: "white", fontSize: "18px" }}></i>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}