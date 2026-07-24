---
title: Releases Overview
sidebar_label: Overview
---

import ReleasesTable from '@site/src/components/releases/ReleasesTable';

## Schedule

Below is the schedule and current status of recent and upcoming React Native releases:

<div className="releases-schedule-table">
  <ReleasesTable />
</div>

### Commitment to Stability

In order to support users upgrading React Native versions, we’re committed to maintain the **latest 3 minor series** (e.g. 0.78.x, 0.77.x and 0.76.x when 0.78 is the latest release).

For these releases we’ll be publishing regular updates and bug fixes.

You can read more about our support policy on [the react-native-releases working group](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md).

For more information on versioning and what we consider a breaking change, see our [Versioning Policy](/releases/versioning-policy).

### Support definitions

The different support levels presented in the table are defined as follows:

- **Future**
  - After a new version branch gets cut, creating new Release Candidates to allow the community to test the upcoming version is very important. New RC releases are done at a high pace, as soon as viable.
- **Active**
  - Stable releases in active support receive frequent updates. Latest stable has the highest priority, and at the start of its stable cycle (right after .0 is released) multiple patches will be done as soon as possible to stabilize the version and ensure a good upgrade experience to the community.
- **End of Cycle**
  - A version in this support bracket will receive less patches, unless some important regressions need to be addressed. Once a next version becomes the new latest stable, before the version in EoC moves over into Unsupported one last patch released will be produced with the latest receive pick requests.
- **Unsupported**
  - When a version is in the unsupported stage, no new released are to be expected. Only very important regressions might create exceptions to this rule; it is recommended that codebases using an unsupported version upgrade as soon as possible.

## Release channels

React Native is published to [npm](https://www.npmjs.com/package/react-native) under three release channels, each identified by an npm [dist-tag](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag). They trade stability off against how early you receive new changes.

| Channel   | Install                | Stability            | Use it for                         |
| --------- | ---------------------- | -------------------- | ---------------------------------- |
| `latest`  | `react-native@latest`  | Stable               | Production apps                    |
| `next`    | `react-native@next`    | ⚠️ Release candidate | Testing an upcoming release        |
| `nightly` | `react-native@nightly` | ⚠️ Unstable          | Tracking `main` for early feedback |

:::note

**Release candidates and nightlies are not intended for production use.** This section will be most relevant to developers who work on frameworks, libraries, or developer tooling. Developers who use React Native primarily to build user-facing applications should not need to worry about release channels other than `latest`.

:::

- **Release Candidates**
  - Published under the `next` tag ahead of every stable release, starting at `rc.0` (versioned like `0.79.0-rc.0`).
- **Nightlies**
  - Published daily from the `main` branch of [`react/react-native`](https://github.com/react/react-native), versioned like `0.80.0-nightly-<DATE>-<SHA>` (`<DATE>` is the build date, `<SHA>` the source commit).
