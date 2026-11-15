---
id: releases
title: Releases Overview
---

import ReleasesTable from '@site/src/components/releases/ReleasesTable';

New React Native releases are shipped **every two months**, usually resulting in six (6) new minors per year.

Below is the schedule and current status of recent and upcoming React Native releases:

<ReleasesTable />

The different support level presented in the table are defined as such:

- **Future**
  - After a new version branch gets cut, creating new Release Candidates to allow the community to test the upcoming version is very important. New RC releases are done at a high pace, as soon as viable.
- **Active**
  - Stable releases in active support receive frequent updates. Latest stable has the highest priority, and at the start of its stable cycle (right after .0 is released) multiple patches will be done as soon as possible to stabilize the version and ensure a good upgrade experience to the community.
- **End of Cycle**
  - A version in this support bracket will receive less patches, unless some important regressions need to be addressed. Once a next version becomes the new latest stable, before the version in EoC moves over into Unsupported one last patch released will be produced with the latest receive pick requests.
- **Unsupported**
  - When a version is in the unsupported stage, no new released are to be expected. Only very important regressions might create exceptions to this rule; it is recommended that codebases using an unsupported version upgrade as soon as possible.

## Commitment to Stability

In order to support users upgrading React Native versions, we’re committed to maintain the **latest 3 minor series** (e.g. 0.78.x, 0.77.x and 0.76.x when 0.78 is the latest release).

For those releases we’ll be publishing regular updates and bug fixes.

You can read more about our support policy on [the react-native-releases working group](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md).

More information on our versioning, and what we consider a breaking change is available in our [versioning policy](./releases/versioning-policy) page.
