# Relevance profile

This file is fed verbatim to the classifier. It is the tuning knob for the whole
system: if the briefing surfaces the wrong things, **edit this prose, not the code.**

Written 2026-07-25 from the shape of the work in `F:\AI-Dev`. Correct it freely —
it is meant to drift as the work does.

---

## Who this is for

A Revit power user and add-in developer running a one-person tooling practice
(BIMpossible) alongside production BIM work. Comfortable well past the GUI: writes
C# against the Revit API, automates Revit through scripted interfaces, maintains a
family library, and builds internal dashboards and audit tooling.

## What I build

- **Revit add-ins in C#** against the Revit API — the core of the work.
- **Sheet, view, and viewport automation**: aligning plan viewports to per-sector
  templates, grid-bubble extents, annotation crops, viewport titles.
- **Family authoring and repair tooling** — batch operations across a shared library.
- **Model audit tooling**: finding broken, duplicated, or drifted content at scale.
- **pyRevit** for lighter scripted automation.

## What counts as an ALERT for me

Interrupt me for anything that could change or break what I ship:

- Revit **API changes**: removals, deprecations, signature changes, obsoleted members.
- **Version support**: a new Revit release, its .NET target, SDK availability, or a
  change in which versions an add-in must support.
- **Breaking changes** in the add-in toolchain — pyRevit, add-in templates, RevitLookup.
- **Licensing, subscription, or entitlement changes** that affect distributing or
  running add-ins, or that change what a small practice pays.
- File **format or schema changes** (RVT/RFA compatibility, IFC round-tripping).
- Anything that changes how add-ins are **loaded, signed, or trusted** by Revit.

## What counts as LEARNING for me

Worth an afternoon, no deadline:

- New Revit API surfaces or capabilities I have not used yet.
- Techniques for large-model performance, batch processing, transaction handling.
- Autodesk Platform Services capabilities usable from a desktop add-in.
- Interoperability: IFC, openBIM, Speckle — moving data between tools.
- Genuinely novel applications of AI/LLMs to BIM authoring or model checking, where
  there is a concrete technique described rather than a product announcement.

## What is FYI at best

- Corporate and market news: acquisitions, earnings, executive changes.
- Competitor product releases (Archicad, Vectorworks, Bentley) — worth knowing the
  direction, not worth acting on.
- Conference and event announcements.

## What is NOISE — suppress it

- Marketing pieces, customer success stories, and case studies with no technique in them.
- Webinar and training-course promotion.
- Award announcements, sponsored content, listicles.
- Generic "AI will transform construction" think-pieces with no specifics.
- Rendering, visualization, and animation content — not my work.

## Judgment notes

- I would rather see a **false alert than miss a real one**, but noise in the weekly
  briefing costs trust fast. Be strict about `noise`; be generous about `alert`.
- "New Revit version released" is always an alert, even if the post is a marketing one.
- A post about a *product* built on the Revit API is FYI. A post about *how* to build
  one is learning.
