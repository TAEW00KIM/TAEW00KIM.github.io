// English version of data.ts. Same exports and types; ids, paths, links, periods and numbers are identical.
import type { ExpTab, Highlight, Project, ProjectGroup } from "./data";

export const site = {
  nameEn: "Kim Taewoo",
  nameKo: "김태우",
  role: "Full-stack Engineer",
  school: "Hankuk University of Foreign Studies, Computer Engineering, graduating February 2027",
  github: "https://github.com/TAEW00KIM",
  githubLabel: "github.com/TAEW00KIM",
  email: "twkk0819@gmail.com",
  web: "https://taewoo.notion.site/portfolio",
  webLabel: "Notion resume (Korean)",
  resumePdf: "/resume.pdf",
  footer: "Updated 2026.11",
};

export const hero = {
  tagline: [
    "I build and run services that real users rely on.",
    "I work on the frontend of Vling at Buzz & Beyond,",
    "and the live cheering server and deployment of Hufscheer, a live cheering service for university sports.",
  ],
};

export const experience: { tabs: ExpTab[] } = {
  tabs: [
    {
      id: "work",
      label: "Experience",
      items: [
        {
          title: "Frontend Developer (internship for academic credit)",
          org: "Buzz & Beyond / Vling",
          period: "2026.07 ~ 2026.12",
          bullets: [
            "I work on the frontend of Vling, a SaaS for YouTube channel and video data, and shipped the video search and channel search redesigns with teammates.",
            ["My part was splitting the list query, the channel cards, and URL search; the curation sections and the favorites folder feature were teammates' work."],
            "In the design system, I consolidated the filter popover and modal components.",
          ],
          tags: ["TypeScript", "React", "Next.js", "GraphQL (Apollo Client)"],
          related: ["vling-search", "vling-perf"],
        },
        {
          title: "US Market Lead Generation",
          org: "Buzz & Beyond / Vling",
          period: "2026.09 ~ 2026.12",
          bullets: [
            "I built a cold email channel for finding US B2B customers from scratch, covering lead sourcing and segmentation, an English email sequence, and sending domain setup.",
            "By hand-checking a sample of the lead list, I found that filtering by department alone left few actual marketers, so I added job title filters.",
            "When rising bounces paused sending automatically, I traced them to policy-blocked recipients and a blacklisted sending domain, removed both, and resumed.",
            "I built and ran a sending status dashboard and an unsubscribe list.",
          ],
          tags: ["Python", "Instantly", "Claude Code"],
        },
      ],
    },
    {
      id: "edu",
      label: "Education",
      items: [
        {
          title: "Computer Engineering",
          org: "Hankuk University of Foreign Studies (HUFS)",
          period: "2021.03 ~ 2027.02 (expected)",
          bullets: [],
        },
      ],
    },
    {
      id: "activity",
      label: "Activities",
      items: [
        {
          title: "9th cohort President, 10th cohort Vice President and Node.js Part Lead",
          org: "UMC HUFS",
          period: "2025.08 ~ 2026.08",
          bullets: [
            "As president of the 9th cohort, I ran the developer community and designed the Spring Boot study curriculum.",
            "In the 10th cohort, I served as vice president and Node.js part lead.",
          ],
        },
        {
          title: "Undergraduate Teaching Assistant, Deep Learning Basics (딥러닝기초)",
          org: "Hankuk University of Foreign Studies (HUFS)",
          period: "2025.09 ~ 2025.12",
          bullets: ["I supported labs and assignments for the Deep Learning Basics course and built a system that grades assignments automatically (Spring, React, FastAPI)."],
          tags: ["Spring", "React", "FastAPI"],
        },
        {
          title: "VitaCheck Booth Operation",
          org: "2025 Seoul Job Fair (Seoul Metropolitan Government and Industrial Bank of Korea)",
          period: "2025.11",
          bullets: [
            "At the fair's UMC project demo zone, we showcased our team project VitaCheck, a supplement recommendation service, and demoed it to visitors in person to collect feedback.",
            "On the 5-person team I worked on the backend: I built the purpose-based ingredient pagination with QueryDSL, and implemented the duplicate ingredient check for Gemini recommendations and Google login.",
          ],
          tags: ["Java", "Spring Boot", "QueryDSL"],
        },
        {
          title: "Senior KATUSA, 1st Platoon",
          org: "KATUSA, 557th MP Company",
          period: "2023.04 ~ 2024.10",
          bullets: [
            "Led **about 20 KATUSA soldiers** in the platoon, reporting directly to the ROK Army support NCO and the US platoon leader (SSG).",
            "Coordinated work and schedules between the US side and the ROK staff, and interpreted in person.",
          ],
        },
      ],
    },
    {
      id: "award",
      label: "Awards",
      items: [
        {
          title: "H-UP First Place (최우수상)",
          org: "HUFS career exploration credit program",
          period: "2022",
          bullets: ["I received it for an educational iOS app that helps people who find smartphones hard learn basic operations through games."],
        },
      ],
    },
  ],
};

const hufscheerRepo = { label: "GitHub", href: "https://github.com/hufscheer/spectator-server" };
const hufscheerWebRepo = { label: "GitHub (web)", href: "https://github.com/hufscheer/web" };

const hufscheerOverview = [
  "Hufscheer is a live cheering service for university sports. It shows scores, timelines, and lineups for on-campus soccer and basketball tournaments in real time. Users can also cheer together through cheer chat messages.",
  "The service has run since 2023, and I joined its backend in February 2026.",
  "From January to November 9, 2026 (GA), the service had **about 7,600 active users** and **about 210,000 views**, with up to **672 active users a day** during tournaments.",
  "In quiet matches, spectators' WebSocket connections dropped every 2 minutes.",
  [
    "I measured that connections through Cloudflare closed at **126 seconds** while direct connections inside the server stayed up past **240 seconds**, and traced the cause to the server's STOMP heartbeat being off (0,0).",
    "I turned the heartbeat on at 10 seconds and left a test that fails without the fix ([PR #753](https://github.com/hufscheer/spectator-server/pull/753)).",
    "After the fix, a connection through Cloudflare on the dev server stayed up past **260 seconds**.",
  ],
  "As several schools started sharing the service, teams and players had no school of their own, so a manager from any school could edit them.",
  [
    "I first added a nullable school foreign key to teams and players so existing data was unaffected (Flyway).",
    "Then I added a permission check to **7** update and delete APIs for teams and players that allows only managers of the same school ([PR #527](https://github.com/hufscheer/spectator-server/pull/527), [#543](https://github.com/hufscheer/spectator-server/pull/543)).",
    "When a player is created, the manager's school is attached automatically, and a team's school was later set through its college unit instead ([PR #666](https://github.com/hufscheer/spectator-server/pull/666)).",
  ],
];

export const projects: Project[] = [
  {
    id: "cheer-spam",
    images: [
      { src: "/hufscheer-cheer.png", width: 416, height: 900, alt: "Hufscheer match cheering screen", caption: "Cheering screen. Taken in a local environment with made-up data. This is not the live service screen." },
      { src: "/hufscheer-timeline.png", width: 416, height: 900, alt: "Hufscheer match timeline screen", caption: "Timeline screen. Taken in a local environment with made-up data." },
    ],
    title: "Cheer Chat Spam Defense",
    org: "Hufscheer, backend", period: "2026.02 ~ present",
    summary:
      "Floods of identical cheer chat messages could distort the team rankings, which count cheer messages. I layered limits so students on a shared school network are not blocked together.",
    stat: { value: "~600 / min", label: "Problem scale: peak rate of identical cheer messages on a match not yet started" },
    statIsScale: true,
    key: "Spam blocked, award rule rethought",
    problem: "At 2 a.m., identical cheer messages piled onto a match that had not started, at **up to about 600 per minute**, reaching **7,617** of the same message in under two hours, which could distort the team ranking based on cheer counts.",
    solution: "Kept the IP limit loose enough for shared school IPs to stop only floods, and added a sliding-window limit per visitor cookie on top: 120 messages per 60 seconds, and the 4th identical message within 3 seconds is blocked.",
    result: "The PM set the limit values, and I have not yet measured how many requests were blocked afterwards. I also found that **97%** of cheer messages from the preset launch to mid-May were one of the three presets (mostly on the one flooded match), and asked the team how the award should be decided.",
    bullets: [
      "Block at 120 requests per 60 seconds per visitor (cookie), and from the 4th identical message within 3 seconds (Caffeine)",
      "Abnormal requests that tried to inflate the cheer count (57 per minute) were all rejected by input range validation",
      "Found that **97%** of cheer messages from the preset launch to mid-May were one of the three presets, and asked the team about the award criteria",
    ],
    tags: ["Java", "Spring Boot", "Caffeine", "MySQL", "STOMP", "sliding window"],
    links: [hufscheerRepo],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "I saw the cheer chat count jump **from the 1,000s to the 8,000s** and checked the pattern in the database.",
          "At first I blocked by IP. A teammate pointed out that students on a school network share one IP and would be blocked together.",
          "After discussing it with the team, we decided to issue a visitor cookie. This lets us tell individuals apart even in a service without login.",
          "I raised the nginx IP limit to 6,000 per minute so it only stops floods.",
          "A fixed window lets through up to twice the limit if requests are sent right before and right after the boundary. So I implemented a sliding window that keeps request timestamps.",
          "Production runs on one server, so I kept the window in a Caffeine local cache instead of adding Redis. It can be swapped for a Redis implementation if the service moves to multiple servers.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "On May 6, requests came in trying to raise the cheer count to 1101, 57 times per minute, and all were rejected with 400.",
          "But when I traced which stage blocked them, it was the value range validation, not the rate limit. A request with an in-range value would have passed.",
          "Since then I check block results by the stage that blocked, not by the response code.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "A client that does not store cookies is counted as a new visitor on every request and can avoid this limit.",
        ],
      },
    ],
  },
  {
    id: "llm-masking",
    title: "LLM Profanity Masking Improvements",
    org: "Hufscheer, backend", period: "2026.02 ~ present",
    summary:
      "The LLM that masks profanity sometimes returned an explanation instead of the masked sentence, and it went straight to the screen. I blocked this by checking the output in code, and added steps to cut LLM calls.",
    key: "Output checks block leaked explanations",
    problem: "The LLM that masks profanity returned an explanation instead of the masked sentence, and it went straight to the screen.",
    solution: "On top of the LLM masking a teammate built, I added an output check that falls back to the original text, plus a static filter and a 5-minute cache meant to cut LLM calls (the reduction was not measured).",
    result: "Responses with an explanation mixed in are caught by the output check and replaced with the original text. I compared 9 candidate models on 22 test sentences, twice each, and switched (accuracy 88.6% → 100%), but the score comes from the same sentences used to choose, so I do not treat it as production accuracy. The effect in production is not measured yet.",
    bullets: [
      "Put a static filter and a result cache in front of the LLM to cut calls",
      "Split the provider behind an interface, so Gemini and OpenRouter can be switched by configuration alone",
      "Block leaked explanations in two stages: output validation and the prompt",
    ],
    tags: ["Spring Boot", "Gemini", "OpenRouter", "Caffeine"],
    links: [hufscheerRepo],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "Model responses vary in format even for the same input. That was the key constraint.",
          "A regex profanity dictionary is fast and cheap but often masks normal sentences. So I left the judgment to the LLM and set the principle to not mask when in doubt.",
          "I did not leave this principle only in the prompt. I enforced it in code at the output stage, and when a check fails, the original text is used as is.",
          ["It rejects responses whose length grew abnormally, responses with the model's explanation mixed in, responses where the sentence changed without a mask marker, and responses where the consonant-only cheers of the original disappeared."],
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "The one I chose, gemma-4-31b, had 100% with a median response of **0.5 seconds** and **$0.18 per 1,000 requests**.",
          "Some reasoning models returned empty responses in other features, and some had a high pass rate but broken actual output. So I chose by reading the outputs directly instead of looking only at the pass rate.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "I have not yet confirmed that the replaced model is actually called in the deployed app. Forcing the response into JSON format also remains as follow-up work.",
        ],
      },
    ],
  },
  {
    id: "ci-deploy",
    metric: "Production deploy 510s → 132s",
    title: "CI Speedup and Blue/Green Deployment",
    org: "Hufscheer, backend", period: "2026.02 ~ present",
    summary:
      "CI took anywhere from 8 to 17 minutes, and every deployment cut the service while the container was recreated. I found the causes, shortened CI, and switched deployment to Blue/Green.",
    stat: { value: "510s → 132s", label: "time for one production deploy, mostly from dropping a full test suite that ran twice" },
    key: "Production deploy 510s → 132s (duplicate tests removed)",
    problem: "CI swung between 8 and 17 minutes, and every deploy took the service down while the container was recreated.",
    solution: "Put the test DB on tmpfs and removed duplicate tests from the deploy job. Switched deploys to Blue/Green.",
    result: "nginx now switches to the new container only after it passes its health check. Real-time connections (WebSocket) drop at the switch and reconnect 5 seconds later. The deploy job went **from 510s to 132s**, mostly by removing the full test suite that ran twice in the deploy job.",
    bullets: [
      "Put MySQL on tmpfs, which cut test DB time **from 101 to 632 seconds down to 54 seconds**",
      "Kept only the documentation tests in the deploy job instead of a duplicate full test run, **510s → 132s**",
      "Blue/Green deployment that swaps the nginx upstream after a health check (WebSocket reconnects after 5 seconds)",
    ],
    tags: ["GitHub Actions", "MySQL", "nginx", "Docker", "Prometheus"],
    links: [hufscheerRepo],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "The varying CI time came from the TRUNCATE run for every test and from the runner disk. In the deploy job, which had been running the full tests a second time, I kept only the documentation tests.",
          "Before a day when 2 tournaments overlapped, I considered whether to run a load test. Looking at 14 days of Prometheus data, **CPU peaked at 32% and heap at 44%**.",
          "Even on May 6, when abnormal requests flooded in, CPU stayed in **single digits (3.4 to 7.6%)**. I decided not to do a load test, which I estimated would take 5 to 10 days.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "Test DB time went **from 101 to 632 seconds down to 54 seconds** (2 runs per setup in CI).",
        ],
      },
    ],
  },
  {
    id: "manager-desktop",
    title: "Desktop Manager Web for Tournament Organizers",
    org: "Hufscheer, frontend", period: "2026.08 ~ 10",
    summary: "The manager screens were mobile only, so tournament organizers had nothing to use on a PC. I built a desktop manager on the same server and the same TanStack Query hooks as the mobile manager and shipped 19 screens to production.",
    stat: { value: "19 screens", label: "desktop manager screens on the production server (excluding login)" },
    key: "19 production screens",
    problem: "The manager screens were mobile only, so organizers had no PC screen for registering tournaments and matches or entering records.",
    solution: "I built it with Next.js, sharing the mobile manager's TanStack Query hooks and adding the query and mutation hooks the desktop needed. After team review, I merged it into the mobile manager app as a separate route instead of a separate app.",
    result: "I built **19 screens** now on the production server, including tournament creation, brackets, match record entry, and player and team management, and confirmed after the merge that **26 mobile screens** were unchanged.",
    bullets: [
      "Built the PC manager on the same server and TanStack Query hooks as the mobile manager",
      "Merged a separate app and API package into one app's /desktop route after review, splitting the two layouts' CSS with route groups",
      "Found substituted players staying on the record sheet and made the related lists refetch after writes",
    ],
    tags: ["Next.js", "React", "TypeScript", "TanStack Query"],
    links: [hufscheerWebRepo],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "The school-wide match list was cut off when fetched as one page, so it follows the cursor to the end.",
          "At first I split the API layer into a shared package with a separate app.",
          "Review said a separate app and package hurt maintainability and cohesion, so I merged it into the /desktop route of the mobile manager app ([PR #612](https://github.com/hufscheer/web/pull/612)).",
          "I split the root layout into mobile and desktop route groups so the two screens' CSS would not mix.",
          "After the merge I compared **26 mobile screens** at 375px with the previous version, down to element position, size, font, and color, and found no changes.",
          "Substitutions, record deletions, and position changes did not refetch the playing lineup, so a substituted player stayed on the record sheet.",
          ["I made writes invalidate the list keys they change."],
          "While applying PM feedback I also fixed **5 bugs**, such as a date input that did not change the start time.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "I confirmed it is deployed to the production server; I have not measured how much organizers actually use it. A teammate opened the first PR that brought it into the production branch.",
        ],
      },
    ],
  },
  {
    id: "loci",
    title: "Lo.ci Location-Based SNS",
    org: "Solo backend", period: "2025.11 ~ 2026.02",
    summary:
      "Every map move re-aggregated all posts. I aggregated in advance when a post is written, and made the map read only the aggregate table.",
    stat: { value: "Aggregate on write", label: "map query structure changed, before and after time not measured" },
    key: "Aggregate on write, not read",
    problem: "Every map move re-aggregated all posts.",
    solution: "Posts are pre-aggregated per H3 cell when written, and the map reads only the aggregate rows.",
    result: "The query structure changed, but I did not measure before and after, so there is no number for the gain.",
    bullets: [
      "Replaced the full post aggregation with a lookup on a per-H3-cell statistics table, with fallback to the old query on failure",
      "Prevented duplicates from concurrent updates to the same cell with a unique constraint, a pessimistic lock, and retries",
      "Split notifications into async events after commit, and fixed N+1 with @BatchSize and JOIN FETCH",
    ],
    tags: ["Java", "Spring Boot", "JPA", "MySQL", "Redis", "Uber H3"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "The post table also had no latitude and longitude index.",
          "What the map needs is not each post. It needs how many friend posts are in a cell and what the latest thumbnail is.",
          "In case the new query was wrong, I made it switchable with the old query through a configuration flag. If the new query throws an exception, it falls back to the old query.",
          "If the same user posted to the same cell almost at the same time, two aggregate rows could be created or a count could be lost.",
          ["I added a unique constraint and took a pessimistic lock on the row when updating. If creating the first row at the same time hits the constraint, it retries."],
          "I fixed N+1 queries with JPA's @BatchSize and JOIN FETCH.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "The only test was context loading, and I could not verify the concurrent update handling with a load test.",
          "Because the aggregate update is async, the aggregate can drift if even the retry fails.",
          "The IN list also grows as the number of friends grows.",
        ],
      },
    ],
  },
  {
    id: "pinta",
    title: "Pinta (Lo.ci Redesign)",
    org: "App team, solo backend", period: "2026.02 ~ 2026.04",
    summary: "Every request re-read the account status from the DB, and profile statistics were split across 3 queries. I reduced them with a 30-second cache and 1 aggregate query.",
    stat: { value: "3 → 1", label: "profile statistics queries" },
    key: "Stats queries 3 → 1",
    problem: "Every request re-read the account status from the DB, and profile statistics were split across 3 queries.",
    solution: "Account status moved to a 30-second cache, and profile statistics to 1 aggregate query.",
    result: "Removed the per-request account lookup and cut the stats queries **from 3 to 1** (time not measured).",
    bullets: [
      "Replaced the per-request account status DB lookup with a Caffeine cache (30 seconds)",
      "Merged **3 profile statistics queries into 1**, and changed the N+1 in the feed image list to a batch lookup",
      "Moved on-demand image resizing behind CloudFront from Lambda@Edge to imgproxy on EC2",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Caffeine", "CloudFront", "Lambda@Edge", "imgproxy", "Flyway"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "For images, I moved on-demand resizing behind CloudFront from Lambda@Edge to imgproxy on EC2.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "Because of the cache, an account that has left or been deleted can still pass for up to 30 seconds. I did not build the invalidation logic to fix this.",
        ],
      },
    ],
  },
  {
    id: "vitacheck",
    title: "VitaCheck Supplement Recommendation",
    org: "Backend in a team of 5", period: "2025.07 ~ 2025.12",
    summary: "The Gemini supplement recommendation had no check for duplicate ingredients. I added validation, and also handled module boundary cleanup and Google login.",
    bullets: [
      "Separated the user and auth modules and moved notification code into the user module to clean up module boundaries",
      "Added duplicate ingredient validation to the Gemini-based supplement recommendation and implemented Google login",
      "Changed the purpose-based search pagination from Page to Slice",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "QueryDSL", "multi-module"],
    links: [{ label: "GitHub", href: "https://github.com/VitaCheck/vitacheck-be" }],
    sections: [
      {
        heading: "Overview",
        paras: [
          "In November 2025, we ran a booth at the Seoul Job Fair, where we demoed it to visitors in person.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "I changed the pagination of the purpose-based search from Page to Slice, as a follow-up to a teammate's OOM fix.",
        ],
      },
    ],
  },
  {
    id: "vling-search",
    images: [
      { src: "/vling-video-search.webp", src2x: "/vling-video-search@2x.webp", width: 1440, height: 747, live: "https://vling.net/algorithm-score?na=KR", alt: "Vling video search screen", caption: "Video search. I built the results grid with teammates (the curation sections were a teammate's). Channel names are masked by the service; thumbnails and profile photos are blurred." },
      { src: "/vling-channel-search.webp", src2x: "/vling-channel-search@2x.webp", width: 1440, height: 934, live: "https://vling.net/search?na=KR&sort=trendsScorePercentile", alt: "Vling channel search screen", caption: "Channel search. I built the channel cards and part of the channel attribute filters. Channel names are masked by the service; thumbnails and profile photos are blurred." },
    ],
    title: "Vling Video Search and Channel Search Redesign",
    org: "Buzz & Beyond internship", period: "2026.07 ~ 09",
    summary: "During the channel search redesign, I found that a field used only after unlocking was in the list query, so depending on the plan, searches returned nothing or deducted views incorrectly. I moved that field to a per-channel query and shipped the video search and channel search redesigns with teammates.",
    visual: true,
    key: "2 search screens shipped",
    problem: "During the channel search redesign, I found that a field used only after unlocking was in the list query, so depending on the plan, searches returned nothing or deducted views incorrectly.",
    solution: "The value is not drawn while locked, so I took it out of the list query and fetch it one channel at a time when the lock is lifted.",
    result: "Shipped the video search (**Sep 8**) and channel search (**Sep 9**) redesigns to production. I did the list query split, channel cards, URL search, and moving favorites between folders; teammates did the curation sections and the folder feature; we built the video results grid and the channel attribute filters together.",
    bullets: [
      "Fixed autocomplete Enter running a channel jump and a search together",
      "Restored search usage tracking that a refactor broke during the redesign",
      "Handled shared URLs that failed on re-entry (unknown category, 115-character URL)",
    ],
    tags: ["TypeScript", "React", "Next.js", "GraphQL (Apollo Client)", "Zustand"],
    links: [
      { label: "Video search", href: "https://vling.net/algorithm-score" },
      { label: "Channel search", href: "https://vling.net/search" },
    ],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "Picking a channel in autocomplete with the arrow keys and pressing Enter moved to the channel **and also ran a search**, charging a search the user never saw. Two key handlers on the same input ran one after the other, so the second now steps back when the first has handled Enter.",
          "During the redesign, a refactor renamed the search GraphQL operation so the usage rules no longer matched it. It raised no error, so it could not be seen on screen. I found the mismatch and fixed the name.",
          "On re-entry from a shared URL, an unknown category value made the query fail, and a **115-character** playlist URL was cut by the **100-character** input limit. Values are now validated and ignored, and the length limit applies on submit, not while typing.",
        ],
      },
      {
        heading: "Role",
        paras: [
          "As a frontend intern, I split the channel search (started July 20) and video search (started August 5) redesigns with teammates.",
        ],
      },
    ],
  },
  {
    id: "vling-perf",
    metric: "CLS 0.246 → 0.003",
    title: "Vling Search Page Performance Measurement and Improvement",
    org: "Buzz & Beyond internship", period: "2026.08 ~ 09",
    summary: "The search page was slow, and the layout shifted while loading. A measurement script showed that the skeleton keys caused the shift, and I fixed it by keying them to grid slot numbers. All numbers were measured in a sandbox environment.",
    bars: [
      { label: "Search screen CLS", before: 0.246, after: 0.003, unit: "" },
      { label: "Skeleton shown after a sort change", before: 2194, after: 40, unit: "ms" },
      { label: "Thumbnail TTFB", before: 928, after: 154, unit: "ms" },
      { label: "'Vlog' search time", before: 8.6, after: 2.4, unit: "s" },
      { label: "Candidates for one two-word query", before: 1330, after: 22, unit: "K" },
    ],
    key: "CLS 0.246 → 0.003 (sandbox)",
    problem: "Only the search screen shifted heavily while loading (CLS 0.246), and changing the sort froze it on the old results for over 2 seconds.",
    solution: "Measurement scripts showed the cause was skeleton keys set to array indexes, which I changed to grid slot numbers. Sort changes no longer refetch server-rendered data unrelated to the results, thanks to shallow routing.",
    result: "CLS **0.246 → 0.003**, skeleton after a sort change **2,194ms → 40ms**, 'vlog' search **8.6s → 2.4s** (sandbox measurements).",
    bullets: [
      "Search page CLS **0.246 → 0.003** (changed the skeleton key to the grid slot number)",
      "Skeleton shown after a sort change **2,194ms → 40ms** (shallow routing)",
      "Thumbnail TTFB **928ms → 154ms** (bypassed the image optimizer for thumbnails only)",
    ],
    tags: ["Next.js", "React", "Web Vitals", "Playwright"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "The home page had a CLS of 0.002, but only the search page had 0.246. The cause of the CLS was that the skeleton key was the array index.",
          [
            "Each time a card was settled, the remaining skeletons were pushed to later slots.",
            "When several were settled at once they moved together, so a single shift exceeded 0.1.",
            "I changed the key to the absolute slot number in the grid.",
          ],
          "Every time sort or filter changed, the router re-ran the server data function and transferred about 115KB.",
          [
            "The response content for a sort change was the same even when the query changed, so a server round trip was not needed.",
            "So I changed **21** routing calls on the search page to shallow routing.",
          ],
          "With optimization, thumbnails download about 32KB less each (54.4KB → 22.7KB).",
          ["Still, I chose to download 32KB more over delaying each grid card by 800ms. So I made only thumbnails skip optimization."],
          "A condition split two-word keywords and let a candidate in if any one word matched, so one two-word query ('convenience store new items') grew to 1,330K candidates.",
          ["Removing that condition cut it to **22K**."],
          "Separately, with no period condition the search scanned everything, so a search for 'vlog' took 8.6 seconds.",
          ["Setting the default period to the last 6 months brought it to **2.4s** (candidates 1.2M to 130K). The two other keywords measured with it went from 4.5s to 1.7s ('mukbang') and from 2.8s to 1.7s ('travel')."],
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "With a one-line fix, CLS went from 0.161 → 0.001 in the local reproduction and **0.246 → 0.003** in the sandbox.",
          "Loading time and search time stayed the same, so this is an improvement in stability, not speed.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "All numbers were measured in a sandbox or locally; production was not measured because of access rules.",
          "The sample size was 1 to 5 runs, and the same measurement log shows a ±30% cold and warm variation, so read these as direction and magnitude, not exact ratios.",
        ],
      },
    ],
  },
  {
    id: "history-mcp",
    metric: "Answer in top 10: 25 → 29 of 35 questions",
    title: "History: Personal Work Record Pipeline",
    org: "Personal", period: "2026.10 ~ present",
    summary:
      "By default, Claude Code deletes conversations older than 30 days, so I could not find past decisions and their reasons. I built a pipeline that indexes conversations, commits and documents automatically at every work session and extracts each day's decisions and their reasons.",
    stat: { value: "25 → 29", label: "of 35 questions with the answer in the top 10" },
    key: "Answer in top 10: 25 → 29 of 35",
    problem: "By default, Claude Code deletes conversations after 30 days, so past decisions and their reasons could not be found again.",
    solution: "Conversations, commits and documents are collected and indexed automatically when a work session starts or ends, and each day's decisions and reasons are extracted with their source records and served through a search server (MCP) that combines keyword and semantic search.",
    result: "**About 540,000 records** in the full-text index as of November 17, 2026 (about 90,000 of them embedded), with **about 1,400 decision records** as of November 11. To reduce documents losing out to conversation messages on reworded questions, I added a channel that pulls document candidates separately: questions with the answer in the top 10 went **from 25 to 29 of 35**, and from 6 to 9 of 20 questions written after the design.",
    bullets: [
      "Indexes conversations, commits and documents automatically at every work session (as of November 17, 2026, **about 540,000** in full-text search, about 90,000 of them embedded) and extracts each day's decisions and reasons",
      "Serves **about 1,400 decision records** (as of November 11) through an MCP search server",
      "Found that documents lost out to conversation messages on reworded questions and pulled document candidates separately: questions with the answer in the top 10 went **from 25 to 29 of 35**, and from 6 to 9 of 20 written after the design",
    ],
    tags: ["Python", "TypeScript", "Node.js", "SQLite FTS5", "MCP", "ONNX"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "I solved the similarity clustering by collecting the top 100 by cosine, then re-ranking them with a bonus added to documents.",
          "I also tried weight tuning, excluding short chunks, and switching to a larger model. The effect was small or none, so I did not include them.",
          "I measured the rate at which the answer is in the top 10, saved the baseline, and run the same benchmark every time I change search.",
          "In November, decision records and documents were still losing out to conversation messages on reworded questions. So I added a channel that pulls semantic search candidates from documents only and merges them in.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "Even after adding semantic search, reworded questions only went from 0.333 to 0.417, which is 1 more out of 12.",
          ["Looking at the cause, the embedding cosine similarities clustered at 0.86 to 0.91. So tens of thousands of conversation messages were pushing out the decision records and documents that should have been found."],
          "The October gain in the share of 43 questions with the answer in the top 10, 0.74 → 0.84, came mostly from the 2-character index; semantic search alone moved it from 0.81 to 0.84.",
          [
            "After adding the bonus, reworded questions went from 0.42 to 0.75 and the overall figure became 0.93.",
            "Other categories did not drop, and response time stayed at a p50 of 27ms.",
          ],
          "The November document channel was measured on a separate set of 35 questions and on 20 reworded questions written after the channel was designed.",
          [
            "On the same day and database, questions with the answer in the top 10 went **from 25 to 29 of 35** and MRR from 0.677 to 0.709 (same values in 2 runs).",
            "Among 30 reworded questions (10 of the 35 plus the 20 new ones), found answers went **from 8 to 13**; on the 20 new ones alone, from 6 to 9.",
            "The starting 25 already includes the 2-character index and semantic search, and response time did not increase.",
          ],
        ],
      },
      {
        heading: "Limits",
        paras: [
          "The October figures (0.84, 0.93) were tuned and evaluated on the same 43 questions and may be overfitted, so in November I measured on separately written questions. The 10 reworded questions among the 35 were looked at while designing the channel, so they are not fully held out.",
          "The evaluation questions were written by an agent. On reworded questions the results fell 1 to 3 short of the targets set in advance (9 against a target of 10 on the 20 new questions). The 20 new questions were also written by a session that had read the design, so they are not fully held out.",
          "I run the benchmark by hand when I change search; it fails if results drop below the baseline. It is not wired into CI or deploy.",
        ],
      },
    ],
  },
  {
    id: "hanpan",
    title: "Hanpan: Game Alert iOS App",
    org: "Personal, server and iOS app", period: "2026.11 ~ present",
    summary:
      "An app that tells someone close to you when your League of Legends game starts and ends. Before 1.0, a separate security review found a way to hijack another person's account verification; I closed it and submitted 1.0 to App Store review on November 23.",
    stat: { value: "13 → 0", label: "successful hijacks in 20 runs of the reproduced attack (before the fix → after)" },
    key: "1.0 submitted to App Store review",
    problem: "An app that announces game starts becomes a stalking tool if you can attach someone else's account. So alerts go only to accounts whose owner verified them, but the security review found that accounts pre-registered with someone else's Riot ID could take over that account the moment its owner verified it.",
    solution: "I changed the server so only the latest registrant of an account can attempt verification, and only a challenge issued after the owner's verification can change the owner. The 10 new tests fail on the code before the fix.",
    result: "Running the same attack script 20 times, successful hijacks went **from 13 to 0**. 1.0 was submitted to App Store review on November 23, with manual release so that I publish it myself even after approval.",
    bullets: [
      "Found and closed an account verification hijack in a security review (13 of 20 reproduced attacks succeeded before, 0 after)",
      "Deployed only after fixing the 2 defects the QA session blocked in round 1, rerunning 212 server tests and 126 app tests",
      "Submitted to App Store review on November 23, manual release",
    ],
    tags: ["Swift", "SwiftUI", "Node.js", "SQLite", "APNs", "Riot API"],
    links: [{ label: "About and privacy policy (Korean)", href: "/hanpan/" }],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "PUBG and Overwatch have no way to verify account ownership, so 1.0 keeps them for preview users only. Otherwise anyone who knows a nickname could get someone else's game start alerts.",
          "TestFlight and the App Store get the same binary, so which games are public is set per user on the server, not by a build flag.",
          "Because this was a production deploy, a development session and a QA session worked as a pair. The QA session blocked the deploy in round 1 (a screen asking to pick several games when only one exists, and an app version still at 0.8.0). After the fixes, 212 server tests and 126 app tests were rerun and passed before the deploy.",
          "When a deploy was reported as done, my main agent session reopened the remote commit and the production server's responses to check them, and marked TestFlight processing, which it could not see, as reported, not verified.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "Two people use it now.",
          "One Medium finding from the review (one user can use up the Riot API limit and stop game detection for everyone) is left to fix before opening it wider.",
        ],
      },
    ],
  },
  {
    id: "agent-env",
    title: "Bento: Personal AI Assistant App",
    org: "Personal, iOS and Mac app, server", period: "2026.06 ~ present",
    summary:
      "The assistant bots took several seconds to say anything, so a fast model in front now sends the first sentence. A step where that model shortened long answers was dropped after QA found that it lost content.",
    key: "First sentence first, long answers verbatim",
    problem: "Even for questions that needed no tools, Fetch, the research assistant bot, took a median 5.7 seconds before the first content appeared.",
    solution: "Sonnet in front sends the first sentence, and questions that need research or tools go to the original bot. Its answer is not rewritten; the original text is split into paragraphs and sent.",
    result: "In a test setup, the first sentence of a knowledge question appeared in **about 1.9 seconds**. Since November 23 all 4 assistant bots use this front.",
    bullets: [
      "A front model sends the first sentence and hands research questions to the original bot (first sentence in about 1.9 seconds in a test setup)",
      "Dropped the step that rewrote long answers after all 3 rewritten answers out of 10 long ones lost content in QA",
      "Code checks the first sentence and holds it back if it has numbers not in the source or claims a task is done",
    ],
    tags: ["Swift", "SwiftUI", "Node.js", "Python", "LLM API"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "At first the front model shortened long answers before sending them. When the QA session ran 10 long originals, all 3 that were rewritten lost content (shortening dropped items, and restoring them duplicated items). So rewriting is off and the original text goes out as is.",
          "Code checks the one sentence the front sends first. If it has numbers or words that are not in the source, or claims something is done, it is not sent and the reply waits for the body.",
          "I compared Haiku and Sonnet on the same questions for the front and chose Sonnet. Haiku mixed its routing reason into the answer in 10 of 14 knowledge questions.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "On 6 knowledge questions without tools, the original bot's first content took 3.2 to 11.7 seconds (median 5.7), and Sonnet's first sentence about 1.9 seconds (test setup).",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "The first sentence time was measured in a test setup.",
          "On November 19 the front's development session deployed to the production server before the QA verdict. The deployed code matched the passing version, so it was not rolled back, but deploying only after QA is still a written rule, not something a machine enforces.",
        ],
      },
    ],
  },
];

export const resume = {
  title: "Skills",
  pdfLabel: "Resume (PDF, Korean)",
  skills: [
    { group: "Server", items: ["Java", "Spring Boot", "JPA", "QueryDSL", "Node.js", "Python"] },
    { group: "Realtime", items: ["WebSocket (STOMP)"] },
    { group: "Data", items: ["MySQL", "Flyway", "SQLite"] },
    {
      group: "Infrastructure",
      items: ["AWS", "Docker", "nginx", "GitHub Actions", "Prometheus"],
    },
    { group: "Web", items: ["TypeScript", "React", "Next.js", "GraphQL (Apollo Client)", "TanStack Query"] },
    { group: "Apps", items: ["Swift", "SwiftUI"] },
    { group: "AI", items: ["LLM APIs (Gemini, OpenRouter)", "LLM output validation", "MCP", "Embedding search", "Claude Code"] },
  ],
};

export const highlights: Highlight[] = [
  { value: "~210K views", label: "Hufscheer page views, 2026.01 to 11.09, with about 7,600 active users (GA)", href: "#g-hufscheer", linkText: "Hufscheer, live cheering for university sports" },
  { value: "8.6s → 2.4s", label: "Vling 'vlog' search time after limiting the default period to 6 months (test server)", href: "#p-vling-perf", linkText: "Vling search performance" },
  { value: "126s", label: "Found and fixed why live connections dropped every 2 minutes (126s via Cloudflare, over 240s direct)", href: "#g-hufscheer", linkText: "Hufscheer live cheering (WebSocket)" },
];

export const projectGroups: ProjectGroup[] = [
  { id: "hufscheer", name: "Hufscheer", note: "live cheering service for university sports, backend and manager web", about: hufscheerOverview, links: [{ label: "Server on GitHub", href: "https://github.com/hufscheer/spectator-server" }, { label: "Web on GitHub", href: "https://github.com/hufscheer/web" }], ids: ["cheer-spam", "llm-masking", "ci-deploy", "manager-desktop"] },
  { name: "Vling", note: "Buzz & Beyond internship, frontend", ids: ["vling-search", "vling-perf"] },
  { name: "Side Projects", ids: ["loci", "pinta"], showOrg: true },
  { name: "Personal Projects", ids: ["history-mcp", "hanpan", "agent-env"] },
];

export const ui = {
  lang: "en",
  glanceTitle: "At a glance",
  labelProblem: "Problem",
  labelSolution: "Solution",
  labelResult: "Result",
  liveLink: "See the live page",
  more: "Read more",
  less: "Close",
  relatedProjects: "Related projects",
  projectsTitle: "Projects",
  themeToLight: "Light mode",
  themeToDark: "Dark mode",
  langLinkLabel: "한국어",
  langLinkHref: "/",
  resumeFilename: "Kim_Taewoo_Resume_ko.pdf",
  docTitle: "Kim Taewoo | Full-stack Engineer",
  description: "Portfolio of Kim Taewoo, a full-stack engineer. I build and run services that real users rely on.",
};
