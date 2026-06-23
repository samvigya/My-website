"use client";

import { useState } from "react";

type Outcome = {
  verdict: "strong" | "okay" | "redirect";
  response: string;
  nextStepId: string | null;
};

type Choice = {
  id: string;
  label: string;
  outcome: Outcome;
};

type Step = {
  id: string;
  prompt: string;
  choices: Choice[];
};

const STEPS: Record<string, Step> = {
  start: {
    id: "start",
    prompt:
      "One of your enterprise accounts just flagged red — usage dropped 35% over two weeks, no support tickets filed. What do you check first?",
    choices: [
      {
        id: "email-client",
        label: "Email the client asking if everything's okay",
        outcome: {
          verdict: "redirect",
          response:
            "Fair instinct, but premature — if I reach out with no data, I'm asking them to diagnose their own problem for me. I'd rather show up already knowing something.",
          nextStepId: "data",
        },
      },
      {
        id: "check-data",
        label: "Pull account-level usage data — logins, feature depth, active seats",
        outcome: {
          verdict: "strong",
          response:
            "Exactly where I'd start. Before reacting to a headline number, I want to know *which* part of usage dropped — that tells me what kind of problem this actually is.",
          nextStepId: "data",
        },
      },
      {
        id: "escalate",
        label: "Escalate to your manager immediately",
        outcome: {
          verdict: "redirect",
          response:
            "I'd loop my manager in eventually, but escalating before I understand the problem just moves the confusion up a level. I want a diagnosis in hand first.",
          nextStepId: "data",
        },
      },
    ],
  },
  data: {
    id: "data",
    prompt:
      "You pull the data: logins are flat, but one specific feature — the one tied to their core use case — has near-zero usage. What's your read?",
    choices: [
      {
        id: "feature-bug",
        label: "Assume it's a product bug and file a ticket",
        outcome: {
          verdict: "okay",
          response:
            "Worth ruling out, but I'd check this in parallel rather than first — most drops like this are adoption gaps, not bugs, and I don't want to lose days waiting on engineering before I even know that's the cause.",
          nextStepId: "align",
        },
      },
      {
        id: "champion-check",
        label: "Check if their internal champion (main point of contact) recently changed",
        outcome: {
          verdict: "strong",
          response:
            "This is usually it. A champion leaving or changing roles is one of the most common silent killers of adoption — the new person never got onboarded on that feature, and nobody told us.",
          nextStepId: "align",
        },
      },
      {
        id: "wait",
        label: "Wait another week to see if it self-corrects",
        outcome: {
          verdict: "redirect",
          response:
            "I get the instinct to avoid overreacting to noise, but a sustained two-week drop on a core feature isn't noise — waiting just shrinks my runway to fix it before renewal conversations come up.",
          nextStepId: "align",
        },
      },
    ],
  },
  align: {
    id: "align",
    prompt:
      "Turns out the champion left the company three weeks ago. Nobody on our side flagged it. What now?",
    choices: [
      {
        id: "solo-fix",
        label: "Quietly fix it yourself and report back once it's resolved",
        outcome: {
          verdict: "okay",
          response:
            "Tempting, but this one's bigger than just me — onboarding a brand-new stakeholder usually benefits from product or support being looped in too, even if I'm running point.",
          nextStepId: "close",
        },
      },
      {
        id: "loop-in",
        label: "Loop in product/support and set up a re-onboarding call with the new contact",
        outcome: {
          verdict: "strong",
          response:
            "Right call. The fastest fix isn't me alone — it's making sure the new stakeholder gets a real onboarding pass with the right people in the room, not just a recap email from me.",
          nextStepId: "close",
        },
      },
      {
        id: "blame",
        label: "Note that the client should've told us about the change",
        outcome: {
          verdict: "redirect",
          response:
            "True, but that's not a useful place to spend energy right now — whose fault it was doesn't fix the adoption gap. I'd rather move straight to solving it.",
          nextStepId: "close",
        },
      },
    ],
  },
  close: {
    id: "close",
    prompt:
      "You're about to message the client. What goes in it?",
    choices: [
      {
        id: "apology",
        label: "A short apology for the disruption",
        outcome: {
          verdict: "okay",
          response:
            "An apology isn't wrong, but on its own it doesn't move anything forward — I'd rather lead with the plan and let the proactiveness speak for itself.",
          nextStepId: null,
        },
      },
      {
        id: "proactive-plan",
        label: "A proactive note: here's what we noticed, here's the onboarding call already on the calendar",
        outcome: {
          verdict: "strong",
          response:
            "This is the close. They find out we caught it before they had to chase us — that's the entire game. Retention isn't won in the fix, it's won in whether they had to ask.",
          nextStepId: null,
        },
      },
      {
        id: "silent-fix",
        label: "Nothing yet — wait until the new contact is fully ramped up",
        outcome: {
          verdict: "redirect",
          response:
            "I'd actually message sooner, not later — staying quiet for weeks while we 'figure it out' reads as not noticing at all, which is worse than imperfect communication.",
          nextStepId: null,
        },
      },
    ],
  },
};

const VERDICT_STYLES: Record<Outcome["verdict"], { bg: string; label: string }> = {
  strong: { bg: "var(--mint)", label: "Strong read" },
  okay: { bg: "var(--sky)", label: "Reasonable, but" },
  redirect: { bg: "var(--coral)", label: "Worth rethinking" },
};

export default function DiagnoseScenario() {
  const [stepId, setStepId] = useState<string>("start");
  const [history, setHistory] = useState<{ stepId: string; choice: Choice }[]>([]);
  const [resolvedOutcome, setResolvedOutcome] = useState<Outcome | null>(null);

  const step = STEPS[stepId];
  const isFinished = history.length > 0 && resolvedOutcome && !STEPS[stepId + "-next"];

  function pick(choice: Choice) {
    setResolvedOutcome(choice.outcome);
    setHistory((h) => [...h, { stepId, choice }]);
  }

  function advance() {
    const next = resolvedOutcome?.nextStepId;
    setResolvedOutcome(null);
    if (next) {
      setStepId(next);
    } else {
      setStepId("done");
    }
  }

  function restart() {
    setStepId("start");
    setHistory([]);
    setResolvedOutcome(null);
  }

  const strongCount = history.filter((h) => h.choice.outcome.verdict === "strong").length;

  if (stepId === "done") {
    return (
      <div className="rounded-3xl border border-[var(--line)] bg-white p-8 text-center">
        <div className="text-3xl mb-3">
          {strongCount === history.length ? "🎯" : strongCount >= 2 ? "👍" : "🤝"}
        </div>
        <h3 className="font-[family-name:var(--font-display)] font-semibold text-[20px] text-[var(--ink)] mb-2">
          {strongCount === history.length
            ? "You'd make a great CSM."
            : "Account saved — here's how I'd have run it."}
        </h3>
        <p className="text-[14.5px] text-[var(--ink-soft)] max-w-md mx-auto mb-5">
          You picked the strongest option {strongCount} out of {history.length}{" "}
          times. The
          real-world version of this exact playbook is what's in the &quot;Client&apos;s got
          a problem&quot; section above — diagnose with data, align the right people, act
          on the workflow, close the loop before they have to ask.
        </p>
        <button
          onClick={restart}
          className="font-[family-name:var(--font-mono)] text-[13px] bg-[var(--ink)] text-[var(--butter)] rounded-full px-5 py-2.5 hover:bg-[var(--coral-deep)] transition-colors cursor-pointer"
        >
          ↻ Run it again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8">
      {/* fake live chart header */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-[var(--line)]">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-soft)]">
            ACCOUNT HEALTH — ACME GLOBAL FMCG
          </p>
          <p className="font-[family-name:var(--font-display)] font-semibold text-[17px] text-[var(--coral-deep)]">
            🔴 At risk
          </p>
        </div>
        <svg width="120" height="40" viewBox="0 0 120 40" aria-hidden>
          <polyline
            points="0,8 20,10 40,12 60,22 80,30 100,33 120,35"
            fill="none"
            stroke="var(--coral-deep)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {!resolvedOutcome ? (
        <>
          <p className="font-[family-name:var(--font-display)] text-[17px] sm:text-[18px] text-[var(--ink)] leading-snug mb-6">
            {step.prompt}
          </p>
          <div className="flex flex-col gap-2.5">
            {step.choices.map((c) => (
              <button
                key={c.id}
                onClick={() => pick(c)}
                className="text-left text-[14px] rounded-xl px-4 py-3 bg-[var(--butter-deep)] border border-[var(--line)] hover:border-[var(--coral-deep)] hover:bg-white transition-colors text-[var(--ink)] cursor-pointer"
              >
                {c.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div
            className="inline-block font-[family-name:var(--font-mono)] text-[11px] rounded-full px-3 py-1 mb-3"
            style={{ background: VERDICT_STYLES[resolvedOutcome.verdict].bg }}
          >
            {VERDICT_STYLES[resolvedOutcome.verdict].label}
          </div>
          <p className="text-[15px] text-[var(--ink)] leading-relaxed mb-6">
            {resolvedOutcome.response}
          </p>
          <button
            onClick={advance}
            className="font-[family-name:var(--font-mono)] text-[13px] bg-[var(--ink)] text-[var(--butter)] rounded-full px-5 py-2.5 hover:bg-[var(--coral-deep)] transition-colors cursor-pointer"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
