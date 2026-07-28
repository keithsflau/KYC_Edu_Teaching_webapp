# Chemistry Fleet Restore QA

## Status
- **Kc (09_Chemical_Equilibrium_Kc)**: RESTORED (from transcript tool result) - VERIFIED A1-A8 LearnFromZero is present (~34KB). It is a real app, not a stub.
- **Rates (01_Rates_Collision)**: RESTORED (from transcript generator script)
- **Le Chatelier (01_Le_Chatelier)**: RESTORED (from transcript generator script)
- **EMF (01_EMF_Internal_R)**: RESTORED (from transcript generator script)
- **Glucose (01_Glucose_Homeostasis)**: RESTORED (from transcript generator script)

## Recovered Paths
We ran `HK Cirriculum/_tools/gen-chem-lab-f5f6.js` and recovered 9 interactive labs in `Form 5` and `Form 6`.

## Directory Inventory (`Secondary_School/Chemistry`)
The Chemistry fleet is split between `Secondary_School/Chemistry/` (F3/F4) and `HK Cirriculum/Secondary_School/Chemistry/` (Form 4/5/6).
Combined inventory:
- **Form 3**: 6 apps present (01, 02, 03, 04, 05, 06). Expected 9 (per curriculum_plan). **Missing 3**.
- **Form 4**: 9 apps present (F4/01, 02, 03, 04, 07, 08, 09 and Form 4/05, 06). Expected 22. **Missing 13**.
- **Form 5**: 7 apps present (01, 02, 03, 04, 05, 06, 09). Expected 22. **Missing 15**.
- **Form 6**: 5 apps present (01, 02, 03, 04, 08). Expected 22. **Missing 17**.

Total Present: ~27 apps.
Total Missing: ~48 apps.

## Repair Status
- Ran `repair-tfz-corrupt.js` across the workspace.
- No existing files were broken/undefined LearnFromZero. All existing files are healthy.
- 5 specific files were skipped/marked missing on disk because they were expected under the `HK Cirriculum/` folder but either absent or located in the root `Secondary_School` directory.

## Next Actions
- **Strongly recommend** Owner commit `HK Cirriculum/` to git soon so `git clean -fd` cannot wipe again.
- Owner/Agent to recover the remaining ~48 missing Chemistry apps via OneDrive recycle bin, history, or regeneration.

## OneDrive Recovery Steps
If any other files are still missing or if you need to restore previous versions of the Chemistry folder:
1. Go to OneDrive online (onedrive.live.com) and sign in.
2. Navigate to `HK Cirriculum/Secondary_School/Chemistry`.
3. If the folder is missing, check the **Recycle bin** in the left sidebar and restore it.
4. If the folder is present but files are missing/corrupt, right-click the file or folder and select **Version history**.
5. Select a version from before the mid-session wipe and click **Restore**.
