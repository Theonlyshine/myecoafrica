# MyEcoAfrica Website — Handoff Context for Claude Code

This document briefs Claude Code on the MyEcoAfrica website project: what it is, what's
already built, what's correct vs. inaccurate, and what needs to happen next (push to
GitHub, prep for Netlify deploy).

**Note on this doc:** this is a summary written by Claude (claude.ai) based on a long
conversation with the founder. It is not a transcript. If anything here is ambiguous or
seems to conflict with what the founder tells you directly, defer to the founder.

---

## 1. What MyEcoAfrica is

MyEcoAfrica is a Nigeria-based commercial sustainability intelligence and education
company (not an NGO). Founder: Sapphire. The business has three arms:

1. **Research & Intelligence** (the lead/engine arm) — commissioned research, policy
   analysis, sustainability governance advisory. Built on synthesis of existing
   data/literature plus original analysis. **Not** primary fieldwork, **not** yet
   published academically (a paper on institutional fragmentation and biogas adoption in
   West Africa is written but not yet published — do not claim it's published).
2. **Media & Communications** — documentary, branded content, editorial work, telling
   the sustainability story in a way that moves institutions and the public to act.
3. **GESLP (Global Energy and Sustainability Leadership Program)** — the proof/outcome
   arm, NOT a separate audience to be sold to. Free, donor-funded, live in Nigerian
   secondary schools (schools are the *access channel*, not the defined audience —
   GESLP is for people broadly, schools are just where the existing structure/access is
   right now). 12 weeks, real research project, professional documentation, no cost to
   schools or students. Goal: **1 million Africans equipped through GESLP by 2030.**
   No "Founder School" exclusivity — open to all schools, because exclusivity caps reach
   and reach is the point.

**Positioning hierarchy (important, was corrected multiple times during development):**
Research + Media = the actual engine/goal (this is also the founder's personal area of
interest — energy/sustainability policy). People (GESLP) = the proof and pipeline, not
the entry point. Data, then Media/Attention, then People — in that order — not the
reverse.

**Language rule:** Use "sustainability" not "energy" in all general prose (e.g.
"sustainability transition," not "energy transition"). Exception: GESLP's full name
stays "Global Energy and Sustainability Leadership Program" — do not rename it, the
acronym is a fixed brand asset.

**Style rule: no em dashes anywhere in copy.** Use commas, periods, or parentheses
instead. The founder explicitly hates em dashes.

**Accuracy rule:** Don't let copy overclaim. Past mistakes that were caught and fixed:
claiming "primary fieldwork" (false — it's desk synthesis + original analysis) and
claiming "published academic work" (false — the paper is written, not published yet).
If asked to write new copy, do not reintroduce these claims.

---

## 2. What's already built

A static HTML/CSS/JS site (no framework, no build step) living at:
`/home/claude/myecoafrica/` in this environment, also copied to
`/mnt/user-data/outputs/myecoafrica/` for the founder to download.

```
myecoafrica/
├── index.html          (homepage)
├── what-we-do.html     (services: Research, Media, GESLP)
├── programs.html       (GESLP detail page)
├── gallery.html        (photo gallery, CMS-managed)
├── blog.html           (Insights/blog, CMS-managed)
├── contact.html         (two forms: orgs, schools/sponsors — uses Netlify Forms)
├── netlify.toml         (build config + admin redirect rule)
├── css/style.css        (shared stylesheet — brand: ink black + amber, Cormorant
│                          Garamond + DM Sans + Space Mono)
├── js/main.js            (mobile nav toggle only)
├── admin/
│   ├── index.html        (Decap CMS entry point)
│   └── config.yml        (Decap CMS config: Gallery + Blog collections)
├── content/
│   ├── gallery/sample-entry.md
│   └── blog/sample-entry.md
└── images/uploads/.gitkeep   (CMS image upload target folder)
```

**Brand identity (already established, keep consistent):** ink black background
(#0E0D0B), amber accent (#C8921A / #E2A82A), cream text (#F2EDE3). Display font Cormorant
Garamond (italic for emphasis), body font DM Sans, utility/mono font Space Mono for
labels and eyebrows. Hairline rules, no border-radius, newspaper-ish restraint. Defined
fully in `css/style.css` `:root` variables.

**Contact forms** use Netlify's built-in form handling (`data-netlify="true"` +
honeypot field) — submissions land in the Netlify dashboard automatically, no backend
needed.

**CMS** is Decap CMS (formerly Netlify CMS) using `git-gateway` as the backend, which
requires Netlify Identity to be enabled on the live site (see deployment steps below).
Once live, the founder logs into `/admin` and can add Gallery photos / Blog posts with
no code.

---

## 3. Locked copy (do not casually rewrite — confirm with founder first)

### Hero (index.html)
> Africa's sustainability transition needs *better intelligence.*
>
> We research it. We tell it. We teach it. Intelligence that comes from people embedded
> in Africa's sustainability transition, not observing it from the outside.

Founder explicitly said: leave this minimal, do not add extra paragraphs of tension/copy
underneath without being asked.

### Why We Exist (index.html) — currently intentionally short
> Africa's sustainability gap is not a technological problem. It is an *institutional*
> one.
>
> "The organisations working to close that gap need research they can act on, people who
> understand what is at stake, and communication that actually moves people."

Founder cut the paragraph that used to follow this and has not yet approved a
replacement. **Do not add a new paragraph here without asking the founder first** — this
was explicitly left open/unfinished, not forgotten.

### GESLP section (used on index.html and programs.html, adapted per page)
> 1 million Africans equipped through GESLP by 2030.
>
> Every conference held with a speaker over fifty is one more room full of people who'll
> be retired before Africa's sustainability transition is done. The people who'll
> actually run it next don't have a platform yet. Most of them don't even know anything
> about the sustainability transition.
>
> GESLP, Nigeria's first structured sustainability leadership program, is live in
> secondary schools, because that's where the access already exists. Twelve weeks. A
> real research project. Professional documentation of every cohort. Free for every
> school and every student. No exceptions. That's just it.
>
> You can sponsor a school. You can sponsor a child. You can fund a cohort. Either way,
> the next generation of Africans who get equipped only happens if you choose to say yes.

CTAs: **Sponsor a School / Sponsor a Child / Fund a Cohort** (three separate options, not
one generic "donate" button).

### Research & Intelligence (what-we-do.html, index.html card) — corrected for accuracy
> We produce commissioned research, policy analysis, and sustainability governance
> advisory built on rigorous synthesis of existing data and literature, sharpened by
> original analysis. Our current focus area: institutional fragmentation and clean
> energy adoption in West Africa.

(Short card version on homepage: "Commissioned research and policy analysis, built on
synthesis and original analysis.")

### Still open / unfinished at handoff time
- The "Why We Exist" paragraph (see above) — founder wants a new paragraph written but
  hadn't approved one yet when this doc was written.
- The stats strip on index.html (B2B / 3 / West Africa / 2026) — not yet rewritten in the
  more recent direct-response voice; still using the original brand-deck-style version.
- Footer copy — untouched, carried over from original site language, may still contain
  "energy" language that should be checked against the sustainability-only rule.
- A full audit of the rest of the site for any other "fieldwork" / "published academic"
  style overclaims has not been done beyond what's listed in section 1.

---

## 4. What needs to happen next (the actual task)

1. **Initialize git in the project folder** (if not already a repo) and push all files
   above to the founder's existing GitHub repository for myecoafrica.org (or a new repo
   if the founder specifies). Preserve the folder structure exactly — Decap CMS depends
   on `admin/`, `content/`, and `images/uploads/` existing at those exact paths.
2. **Do not invent a build process.** This is plain static HTML/CSS/JS. No npm install,
   no bundler, no framework is needed or wanted.
3. After pushing to GitHub, the founder still needs to do the following **in the Netlify
   web dashboard** (these are UI actions Claude Code cannot perform via terminal):
   - Import the GitHub repo as a new Netlify site, with publish directory set to `.`
   - Connect the `myecoafrica.org` domain (DNS records provided by Netlify)
   - Site settings → Identity → Enable Identity
   - Identity → Registration → set to Invite only
   - Identity → Services → Git Gateway → Enable
   - Identity → invite the founder's own email as a user
   Claude Code should clearly tell the founder these steps remain manual and cannot be
   automated from the terminal.
4. If the founder asks for further copy edits, follow the locked-copy rules in section 3
   (no em dashes, "sustainability" not "energy" except in GESLP's full name, no
   fieldwork/publication overclaims, confirm before rewriting "Why We Exist").

---

## 5. Founder's working style (useful context)

- Speaks in voice-to-text style messages, sometimes long and looping — extract the
  concrete decision, confirm it back plainly, don't over-interpret.
- Has corrected direction several times (e.g. GESLP audience, "energy" vs
  "sustainability," Founder School exclusivity being scrapped). Don't assume an earlier
  decision still holds if a later message contradicts it — the most recent explicit
  correction wins.
- Dislikes generic/vague copy and brand-deck language; respond well to direct response
  style copywriting (tension, stakes, specificity) but has also asked to cut added
  copy/paragraphs more than once — bias toward *not* adding unrequested new copy, prefer
  asking first.
- Wants the site live and functional fast, is cost-conscious (flagged that "website
  costs aren't inexpensive"), and is currently planning early revenue/pitching efforts
  separately from the website build.
