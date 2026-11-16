---
name: review-react-native-docs
description: Review React Native repository commits for changes that should be documented on the React Native website, report documentation gaps, propose a change plan, and wait for the user's selection before editing docs.
---

# Review React Native commits for documentation gaps

Review the commit history of [`react/react-native`](https://github.com/react/react-native) against the current documentation in this repository. Produce an evidence-based report and an actionable plan. Do not edit documentation until the user explicitly selects which planned changes to execute.

## Establish the review scope

1. If the user specifies a commit range, release, branch, or date range, use it and state it in the report.
2. Otherwise, inventory every commit reachable from the React Native repository's fetched branches and tags. If no local clone exists, clone the repository into a temporary location outside this website repository. If a clone exists, inspect its remotes and worktree before fetching; do not overwrite or reset local changes.
3. Fetch all remote branches and tags and ensure the clone is not shallow before claiming full-history coverage. Enumerate unique reachable commits (for example, with `git rev-list --all`) and record the refs and commit range covered. Do not modify the React Native source repository; treat its history and working tree as read-only.
4. Do not modify the React Native source repository. Treat its history and working tree as read-only.
5. Report separately how many commits were inventoried/path-screened and how many candidate diffs were inspected. Do not describe every commit as diff-reviewed unless that is what happened. If access, fetch, or history limitations prevent complete coverage, state exactly what was and was not reviewed.

## Identify documentation-relevant changes

Screen the scoped history in manageable batches using commit metadata and changed paths to find likely public-facing changes. Use this as a shortlist, not proof: inspect each promising diff and enough surrounding implementation, exports/types, and tests to verify its behavior. Do not limit a full-history review to recent commits without stating that narrower detailed-review scope. Consult linked pull requests or issues when useful, but treat source code and tests as primary evidence.

Look for changes to public APIs, components, props, events, hooks, platform support, setup and build requirements, architecture, migration or upgrade steps, deprecations, debugging, performance, security guidance, and supported tooling. A code change does not automatically require a docs change. Exclude internal-only refactors, test-only changes, and implementation details unless they alter a documented user-facing contract. Do not infer behavior from commit titles alone.

For each candidate, check whether later changes reverted or superseded it and whether the behavior belongs in current docs. Compare verified behavior with relevant pages under `docs/` and static documentation under `website/`, searching for both the API name and related concepts. Identify the best existing page and confirm the gap is not already covered. Prefer updating current documentation; do not target generated files or `website/versioned_docs/` unless the request explicitly concerns an older version.

Document only behavior supported by the implementation, types, tests, or authoritative platform sources. In particular, verify return values, platform qualifiers, availability, and examples; do not invent meaning for an enum or status when the source only establishes that it is a possible value. If behavior or release applicability is uncertain, label it as a candidate needing verification rather than a confirmed gap.

Deduplicate related commits into documentation items while retaining the commit SHAs and links that support each item. For each item, state:

- The user-visible change and the evidence (commit SHA/link and relevant source paths).
- Whether current documentation is missing, inaccurate, or needs an update, and which page or pages were checked.
- The proposed documentation change and target file or files.
- Priority and confidence, with uncertainty called out rather than guessed. Base confidence on the strength of source evidence and the confirmed docs gap; do not use it to imply certainty about release timing.

If a commit's effect cannot be verified or no documentation gap is found, do not present it as a confirmed docs task. Mention meaningful uncertainty or significant excluded categories in the coverage notes.

## Report, plan, and approval gate

Present a concise report with:

1. **Coverage:** repository URL, refs/range, number of unique commits inventoried, how many were path-screened and how many diffs were inspected, and any limitations.
2. **Documentation findings:** numbered, deduplicated items with evidence, affected docs, proposed updates, priority, and confidence. State explicitly if no actionable gaps were found.
3. **Execution plan:** ordered steps mapping to the numbered findings, including likely validation (for example, checking links, examples, formatting, or a website build as appropriate).

End by asking the user which numbered items to execute, or whether to execute none. Stop there. Do not edit files, create a branch, or start implementation as part of the review. If the user selects items in a later turn, implement only those items, preserve unrelated working-tree changes, follow `AGENTS.md` and `STYLEGUIDE.md`, and run the relevant documented checks.

Provide the report in the conversation by default. Create or update a report file only if the user asks for a saved artifact.

## Implement selected findings

When the user selects findings in a later turn:

1. Recheck the selected upstream source and current docs before editing; a prior report is a lead, not a substitute for confirming the exact behavior and target page.
2. Make only the selected documentation changes. Include adjacent details such as status values or platform notes only when they are necessary to explain the selected behavior and are supported by evidence. Preserve unrelated worktree changes and do not modify the React Native source repository.
3. Validate proportionally: run the docs link check for link or anchor changes, the example linter for `SnackPlayer` examples, and a website build when the change affects MDX rendering or page structure. Report the exact checks and results. Distinguish pre-existing repository warnings from issues introduced by the change; do not fix unrelated failures.
