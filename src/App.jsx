import { useEffect, useRef, useState } from "react";

function Mark() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M5 4h5l2 5 2-5h5l-4 8 4 8h-5l-2-5-2 5H5l4-8-4-8Z" stroke="#ef5949" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ChampionMask({ expression, mouthBeat }) {
  const maskRef = useRef(null);

  useEffect(() => {
    const mask = maskRef.current;
    const pupils = [...mask.querySelectorAll("[data-pupil]")];
    if (expression === "secretive") {
      pupils.forEach((pupil) => { pupil.style.transform = "translate(-9px, 3px)"; });
      return undefined;
    }

    const trackPointer = (event) => {
      pupils.forEach((pupil) => {
        const bounds = pupil.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(8, Math.hypot(deltaX, deltaY) / 35);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", trackPointer, { passive: true });
    return () => window.removeEventListener("mousemove", trackPointer);
  }, [expression]);

  return (
    <svg ref={maskRef} viewBox="0 0 440 440" data-expression={expression} className="relative w-[95%] overflow-visible drop-shadow-[0_26px_35px_rgba(0,0,0,.38)]" role="img" aria-label="A champion's mask with eyes that follow your cursor">
      <path d="M220 37 350 91l35 121-49 152-116 43L104 364 55 212 90 91 220 37Z" fill="#252a2b" stroke="#62696a" strokeWidth="2" />
      <path d="m220 55 110 48 28 107-43 137-95 36-95-36-43-137 28-107 110-48Z" fill="#1c2021" stroke="#383e3f" strokeWidth="2" />
      <path d="m113 140 89 15-12 70-98-17 21-68Zm214 0-89 15 12 70 98-17-21-68Z" fill="#111516" stroke="#e44335" strokeWidth="3" strokeLinejoin="round" />
      <path d="m118 151 71 12-8 46-78-14 15-44Zm204 0-71 12 8 46 78-14-15-44Z" fill="#f7f5ef" />
      <path d="m115 137 74 7-2 8-74-5Zm211 4q-35-12-72 8l-4-7q39-25 79-10Z" fill="#e44335" />
      <g className="pupil" data-pupil="left"><circle cx="151" cy="182" r="11" fill="#111516" /><circle cx="155" cy="178" r="3" fill="#fff" opacity=".9" /></g>
      <g className="pupil" data-pupil="right"><circle cx="289" cy="182" r="11" fill="#111516" /><circle cx="293" cy="178" r="3" fill="#fff" opacity=".9" /></g>
      <path d="m204 239 16-21 16 21-8 49h-16l-8-49Z" fill="#111516" stroke="#62696a" strokeWidth="2" />
      <g key={mouthBeat} className={`mouth-shape ${mouthBeat > 0 ? "mouth-pulse" : ""}`} data-mouth={expression}>
        {expression === "curious" && <>
          <path d="M190 321q30-19 60 0 13 21 0 43-30 20-60 0-13-20 0-43Z" fill="#0c1011" stroke="#e44335" strokeWidth="5" />
          <ellipse cx="220" cy="351" rx="12" ry="7" fill="#ef5949" />
        </>}
        {expression === "secretive" && <>
          <path d="M160 336q58-17 120-3l-8 15q-54-8-105 5Z" fill="#e44335" stroke="#111516" strokeWidth="4" strokeLinejoin="round" />
          <path d="m184 336 3 9m17-11 2 9m17-9 1 9m18-8-1 9m17-7-3 8" stroke="#f7f5ef" strokeWidth="3" strokeLinecap="round" />
        </>}
        {expression === "cheering" && <>
          <path d="M143 307q77 45 154-8l-17 61q-58 39-112-2Z" fill="#0c1011" stroke="#e44335" strokeWidth="5" />
          <path d="M159 320q60 31 121-2l-8 22q-54 24-105-1Z" fill="#f7f5ef" />
          <path d="M199 365q19-22 41-9 10 10 1 19-24 6-42-3Z" fill="#ef5949" />
        </>}
        {expression === "idle" && <>
          <path d="M140 309q74 25 160-7l-18 49q-28 29-67 28-43-1-61-26l-14-44Z" fill="#111516" stroke="#62696a" strokeWidth="2" />
          <path d="m157 317 58 16-3 18-40-10Zm65 18 61-24-8 26-41 15-13-4Z" fill="#f7f5ef" stroke="#c8c7c1" strokeWidth="2" strokeLinejoin="round" />
          <path d="M207 359q12-17 27-10 14 6 8 19-18 8-35-1Z" fill="#ef5949" />
        </>}
      </g>
      <circle cx="331" cy="270" r="5" fill="#ef5949" opacity=".8" />
      <path d="M72 211h29m258 0h-29M220 37V15" stroke="#ef5949" strokeWidth="3" strokeLinecap="round" />
      <path d="m102 93-18-18m254 18 18-18" stroke="#ef5949" strokeWidth="2" opacity=".65" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-[18px] w-[18px]">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 5)" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.68 5.96c4.48-4.14 7.08-10.24 7.08-17.61Z" />
      <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1-.75-4.59c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z" transform="translate(0 5)" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.84l-7.68-5.96c-2.13 1.43-4.85 2.28-8.22 2.28-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -5)" />
    </svg>
  );
}

function App() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [mascotExpression, setMascotExpression] = useState("idle");
  const [mouthBeat, setMouthBeat] = useState(0);
  const [status, setStatus] = useState("");
  const isSignup = mode === "signup";

  useEffect(() => {
    if (mascotExpression !== "cheering") return undefined;
    const timeout = window.setTimeout(() => setMascotExpression("idle"), 1100);
    return () => window.clearTimeout(timeout);
  }, [mascotExpression]);

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setShowPassword(false);
    setMascotExpression("idle");
    setStatus("");
  };

  const animateMouth = (expression) => {
    setMascotExpression(expression);
    setMouthBeat((beat) => beat + 1);
    setStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMascotExpression("cheering");
    setStatus(isSignup
      ? "Account details are ready to connect to your tournament service."
      : "Login details are ready to connect to your tournament service.");
  };

  return (
    <main className="min-h-screen md:grid md:grid-cols-2">
      <section className="fight-panel relative flex min-h-[190px] flex-col overflow-hidden px-5 py-4 text-white md:min-h-screen md:justify-between md:px-10 md:py-9 lg:px-14" aria-label="Combat tournament identity">
        <div className="relative z-10 flex items-center gap-3"><Mark /><span className="text-sm font-semibold tracking-wide text-white/90">RING / CONTROL</span></div>
        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-row items-center justify-between gap-2 py-1 md:flex-col md:justify-center md:gap-0 md:py-8">
          <div className="relative flex h-[132px] w-[132px] shrink-0 items-center justify-center md:mb-3 md:aspect-square md:h-auto md:w-full md:max-w-[410px]">
            <div className="absolute inset-[9%] rounded-full border border-white/10" />
            <div className="absolute inset-[18%] rounded-full border border-white/[.07]" />
            <ChampionMask expression={mascotExpression} mouthBeat={mouthBeat} />
            <span className="absolute bottom-[7%] left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#e44335] to-transparent" />
          </div>
          <div className="w-full max-w-md flex-1 text-left md:flex-none md:text-center">
            <p className="mb-1 text-xs font-semibold text-[#ed796e] md:mb-2 md:text-[11px] md:uppercase md:tracking-[.2em]" aria-live="polite">{mascotExpression === "secretive" ? "Mật khẩu hả? Tôi mù rồi!" : mascotExpression === "curious" ? "Ủa, gõ gì đó?" : mascotExpression === "cheering" ? "Quá đã! Võ đài mở cửa!" : "Ơ, bạn đang ở đâu đấy?"}</p>
            <h1 className="display-font text-3xl font-bold uppercase leading-[.94] md:text-5xl lg:text-6xl">Own the<br />fight night.</h1>
            <p className="mx-auto mt-4 hidden max-w-sm text-sm leading-6 text-white/55 md:block">One corner for the people and moments that make a tournament.</p>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/45">
          <span>TOURNAMENT OPERATIONS</span>
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#ef5949]" />BUILT FOR THE BELL</span>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 md:px-12 lg:px-16" aria-label="Account access">
        <div className="w-full max-w-[430px]">
          <header className="mb-8">
            <h2 className="display-font text-4xl font-bold uppercase leading-none sm:text-[2.75rem]">Combat Tournament Portal</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#727677]">Manage brackets, fighters, referees, and live matches.</p>
          </header>

          <div className="mb-7 grid grid-cols-2 rounded-xl border border-[#deded9] bg-[#ebeae6] p-1" role="tablist" aria-label="Account access options">
            {["login", "signup"].map((tabMode) => (
              <button key={tabMode} className={`mode-tab h-10 rounded-lg text-sm font-semibold transition-colors ${mode === tabMode ? "" : "text-[#6c7071]"}`} id={`${tabMode}-tab`} type="button" role="tab" aria-selected={mode === tabMode} aria-controls="auth-form" onClick={() => changeMode(tabMode)}>
                {tabMode === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form id="auth-form" key={mode} className="form-enter" onSubmit={handleSubmit}>
            {isSignup && <div className="mb-4"><label className="field-label" htmlFor="full-name">Full name</label><input className="field-control" id="full-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required onFocus={() => setMascotExpression("curious")} onBlur={() => setMascotExpression("idle")} onChange={() => animateMouth("curious")} /></div>}
            <div className="mb-4"><label className="field-label" htmlFor="email">Email address</label><input className="field-control" id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required onFocus={() => setMascotExpression("curious")} onBlur={() => setMascotExpression("idle")} onChange={() => animateMouth("curious")} /></div>
            <div className="mb-4">
              <label className="field-label" htmlFor="password">Password</label>
              <div className="relative">
                <input className="field-control pr-12" id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} placeholder="Enter your password" minLength={8} required onFocus={() => setMascotExpression("secretive")} onBlur={() => setMascotExpression("idle")} onChange={() => animateMouth("secretive")} />
                <button type="button" className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-xl text-[#777b7d] transition-colors hover:text-[#181a1b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e44335]" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" />{showPassword && <path d="m4 4 16 16" />}</svg>
                </button>
              </div>
            </div>
            {isSignup && <div className="mb-5"><label className="field-label" htmlFor="role">Tournament role</label><select className="field-control" id="role" name="role" defaultValue="admin"><option value="admin">Admin</option><option value="referee">Referee</option><option value="viewer">Viewer</option></select></div>}
            {!isSignup && <div className="mb-5 flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-[#626768]"><input className="h-4 w-4 accent-[#e44335]" type="checkbox" name="remember" />Remember me</label><button type="button" className="font-semibold text-[#c8392e] hover:text-[#a92f26]" onClick={() => setStatus("Password recovery needs to be connected to your authentication provider.")}>Forgot password?</button></div>}
            <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e44335] px-4 text-sm font-bold text-white shadow-[0_5px_14px_rgba(228,67,53,.18)] transition hover:bg-[#ce382d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e44335] active:translate-y-px">
              <span>{isSignup ? "Create Account" : "Log In"}</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-[11px] font-medium text-[#999c9a]"><span className="h-px flex-1 bg-[#deded9]" /><span>OR CONTINUE WITH</span><span className="h-px flex-1 bg-[#deded9]" /></div>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#deded9] bg-[#fbfaf8] text-sm font-semibold text-[#35393a] transition hover:border-[#bfc1bd] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e44335]" onClick={() => setStatus("Google sign-in needs to be connected to your authentication provider.")}>
            <GoogleIcon />Continue with Google
          </button>
          <p className="mt-7 text-center text-sm text-[#727677]">{isSignup ? "Already have an account? " : "New to the portal? "}<button type="button" className="font-bold text-[#c8392e] hover:text-[#a92f26]" onClick={() => changeMode(isSignup ? "login" : "signup")}>{isSignup ? "Log in" : "Create an account"}</button></p>
          <p className="mt-4 min-h-5 text-center text-xs text-[#727677]" aria-live="polite">{status}</p>
        </div>
      </section>
    </main>
  );
}

export default App;