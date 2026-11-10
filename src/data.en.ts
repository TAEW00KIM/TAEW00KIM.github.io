// English version of data.ts. Same exports and types; ids, paths, links, periods and numbers are identical.
import type { ExpTab, Project, ProjectGroup } from "./data";

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
  footer: "Updated 2026.10",
};

export const hero = {
  tagline: [
    "I like finding and fixing the problems that come up when running a service.",
    "I handle live cheering (WebSocket), deployment and incident response for Hufscheer, a live cheering service for university sports,",
    "and the frontend of Vling at Buzz & Beyond.",
    "I also build my own setup and rules for working with AI agents.",
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
            "Vling is a YouTube channel and video data SaaS. Since July I have worked on the frontend and shipped the video search and channel search redesigns with teammates.",
          ],
          tags: ["TypeScript", "React", "Next.js", "Apollo Client"],
          related: ["vling-search", "vling-perf"],
        },
        {
          title: "US Market Lead Generation",
          org: "Buzz & Beyond / Vling",
          period: "2026.09 ~ 2026.12",
          bullets: [
            "I took the targets set at the kickoff and built a cold email channel: lead extraction, segment classification, an English email sequence, and sending domain warm-up.",
            "I built a read-only dashboard for sending status and an unsubscribe ledger.",
            "I automated finding US companies similar to our contracted customers with public-web research agents, grading them, and identifying the right contacts.",
          ],
          tags: ["Claude Code", "Codex"],
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
            "As president of the 9th cohort, I ran a developer community of more than 30 members and designed the Spring Boot study curriculum.",
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
          bullets: ["At the fair's UMC project demo zone, we showcased our team project VitaCheck, a supplement recommendation service, and 100 people tried it in person in one day."],
        },
        {
          title: "Senior KATUSA, 1st Platoon (later in service)",
          org: "KATUSA, 557th MP Company",
          period: "2023.04 ~ 2024.10",
          bullets: ["Led about 20 KATUSA soldiers in the platoon, reporting directly to the ROK Army support NCO and the US platoon leader (SSG). Coordinated work and schedules between the US side and the ROK staff, and interpreted in person."],
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

const hufscheerOverview = [
  "Hufscheer is a live cheering service for university sports. It shows scores, timelines, and lineups for on-campus soccer and basketball tournaments in real time. Users can also cheer together through cheer chat messages.",
  "The service has run since 2023, and I joined its backend in February 2026. The team is usually 1 PM, 1 designer, 2 frontend and 2 backend developers, and its makeup changes from term to term. From January to June 2026 (GA), the service had about 4,800 active users and 130,000 views, and each fall-term tournament still drew about 900 active users.",
  "As several schools started sharing the service, teams and players had no school of their own, so a manager from any school could edit them. I first added a nullable school foreign key to teams and players so existing data was unaffected (Flyway), then added a permission check to 7 update and delete APIs for teams and players that allows only managers of the same school (PR #527, #543). When a team or player is created, the manager's school is attached automatically.",
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
      "Floods of identical cheer chat messages shifted the team rankings. I blocked the spam without blocking normal users.",
    stat: { value: "~600 / min", label: "Problem scale: peak rate of identical cheer messages on a match not yet started" },
    statIsScale: true,
    key: "Spam blocked, award rule rethought",
    problem: "At 2 a.m., identical cheer messages piled onto a match that had not started, at up to about 600 per minute, reaching 7,617 in under two hours and skewing the team ranking.",
    solution: "Added a sliding-window limit per visitor cookie: 120 messages per 60 seconds, and the 4th identical message within 3 seconds is blocked.",
    result: "Spam is filtered without blocking normal users. I also found that 97% of cheer messages from the preset launch through May were one of the three presets, and raised the award rule with the team.",
    bullets: [
      "Block at 120 requests per 60 seconds per visitor (cookie), and from the 4th identical message within 3 seconds (Caffeine)",
      "Abnormal requests that tried to inflate the cheer count (57 per minute) were all rejected by input range validation",
      "Found that 97% of cheer messages from the preset launch through May were one of the three presets, and raised the award criteria with the team",
    ],
    tags: ["Java", "Spring Boot", "Caffeine", "MySQL", "STOMP", "sliding window"],
    links: [hufscheerRepo],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "I saw the cheer chat count jump from the 1,000s to the 8,000s and checked the pattern in the database.",
          "At first I blocked by IP. A teammate pointed out that students on a school network share one IP and would be blocked together. After discussing it with the team, we decided to issue a visitor cookie. This lets us tell individuals apart even in a service without login.",
          "A fixed window lets through up to twice the limit if requests are sent right before and right after the boundary. So I implemented a sliding window that keeps request timestamps.",
          "Production runs on one server, so I kept the window in a Caffeine local cache instead of adding Redis. It can be swapped for a Redis implementation if the service moves to multiple servers.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "On May 6, requests came in trying to raise the cheer count to 1101, 57 times per minute, and all were rejected with 400. But when I traced which stage blocked them, it was the value range validation, not the rate limit. A request with an in-range value would have passed. Since then I check block results by the stage that blocked, not by the response code.",
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
      "The LLM that masks profanity sometimes returned an explanation instead of the masked sentence, and it went straight to the screen. I blocked this by checking the output in code, and also reduced the number of LLM calls.",
    key: "Output checks block leaked explanations",
    problem: "The LLM that masks profanity returned an explanation instead of the masked sentence, and it went straight to the screen.",
    solution: "On top of the LLM masking a teammate built, I added an output check that falls back to the original text, plus a static filter and a 5-minute cache that cut the LLM calls themselves.",
    result: "Responses with an explanation mixed in are caught by the output check and replaced with the original text. I switched models after an offline comparison of 9 models on the same sentences (accuracy 88.6% → 100%, 22 sentences twice); the effect in production is not measured yet.",
    bullets: [
      "Put a static filter and a result cache in front of the LLM to reduce calls",
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
          "I did not leave this principle only in the prompt. I enforced it in code at the output stage, and when a check fails, the original text is used as is. It rejects responses whose length grew abnormally, responses with the model's explanation mixed in, responses where the sentence changed without a mask marker, and responses where the consonant-only cheers of the original disappeared.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "The one I chose, gemma-4-31b, had 100% with a median response of 0.5 seconds and $0.18 per 1,000 requests. Some reasoning models returned empty responses in other features, and some had a high pass rate but broken actual output. So I chose by reading the outputs directly instead of looking only at the pass rate.",
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
    title: "CI Speedup and Zero-Downtime Deployment",
    org: "Hufscheer, backend", period: "2026.02 ~ present",
    summary:
      "CI took anywhere from 8 to 17 minutes, and every deployment cut the service for up to 30 seconds. I found the causes, shortened CI, and made deployment zero-downtime.",
    stat: { value: "30s → 0s", label: "service downtime during a deploy" },
    key: "Deploy downtime 30s → 0s",
    problem: "CI swung between 8 and 17 minutes, and every deploy took the service down for up to 30 seconds.",
    solution: "Put the test DB on tmpfs and removed duplicate tests from the deploy job. Switched deploys to Blue/Green.",
    result: "Downtime during a deploy went from up to 30s to 0s. The deploy job went from 510s to 132s, mostly by removing the full test suite that ran twice in the deploy job.",
    bullets: [
      "Put MySQL on tmpfs, which fixed test DB time at 54 seconds (it had been 101 to 632 seconds)",
      "Kept only the documentation tests in the deploy job instead of a duplicate full test run, 510s → 132s",
      "Removed downtime with Blue/Green deployment based on an nginx router and graceful shutdown",
    ],
    tags: ["GitHub Actions", "MySQL", "nginx", "Docker", "Prometheus"],
    links: [hufscheerRepo],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "I narrowed the cause of the varying CI time to the TRUNCATE run for every test and the runner disk. In the deploy job, which had been running the full tests a second time, I kept only the documentation tests.",
          "Before a period when 2 tournaments overlapped, I considered whether to run a load test. Looking at 14 days of Prometheus data, CPU peaked at 32% and heap at 44%.",
          "CPU was 7.6% even on the day abnormal traffic flooded in. I decided not to do a load test, which would take 5 to 10 days.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "Test DB time, which swung between 101 and 632 seconds, now stays at 54 seconds.",
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
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "Uber H3"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "The post table also had no latitude and longitude index.",
          "What the map needs is not each post. It needs how many friend posts are in a cell and what the latest thumbnail is.",
          "In case the new query was wrong, I made it switchable with the old query through a configuration flag. If the new query throws an exception, it falls back to the old query.",
          "If the same user posted to the same cell almost at the same time, two aggregate rows could be created or a count could be lost. I added a unique constraint and took a pessimistic lock on the row when updating. If creating the first row at the same time hits the constraint, it retries.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "The only test was context loading, and I could not verify the concurrent update handling with a load test. Because the aggregate update is async, the aggregate can drift if even the retry fails. The IN list also grows as the number of friends grows.",
          "Since this experience, I measure before changing in Hufscheer and Vling, and keep the measurement conditions together.",
        ],
      },
    ],
  },
  {
    id: "pinta",
    title: "Pinta (Lo.ci Redesign)",
    org: "Personal", period: "2026.02 ~ 2026.04",
    summary: "Every request re-read the account status from the DB, and profile statistics were split across 3 queries. I reduced them with a 30-second cache and 1 aggregate query.",
    stat: { value: "3 → 1", label: "profile statistics queries" },
    key: "Stats queries 3 → 1",
    problem: "Every request re-read the account status from the DB, and profile statistics were split across 3 queries.",
    solution: "Account status moved to a 30-second cache, and profile statistics to 1 aggregate query.",
    result: "Removed the per-request account lookup and cut the stats queries from 3 to 1 (time not measured).",
    bullets: [
      "Replaced the per-request account status DB lookup with a Caffeine cache (30 seconds)",
      "Merged 3 profile statistics queries into 1, and changed the N+1 in the feed image list to a batch lookup",
      "Built on-demand image resizing behind CloudFront with Lambda@Edge, then replaced it with imgproxy (EC2)",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Caffeine", "CloudFront", "Lambda@Edge", "imgproxy", "Flyway"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "For images, I built on-demand resizing behind CloudFront with Lambda@Edge, then replaced it with imgproxy (EC2).",
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
          "In November 2025, we ran a booth at the Seoul Job Fair, where 100 people tried it in person in one day.",
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
      { src: "/vling-video-search.webp", src2x: "/vling-video-search@2x.webp", width: 1110, height: 676, live: "https://vling.net/algorithm-score?na=KR", alt: "Vling video search screen", caption: "Video search. I built the curation sections and the results grid with teammates. Channel names are masked by the service; thumbnails and profile photos are blurred." },
      { src: "/vling-channel-search.webp", src2x: "/vling-channel-search@2x.webp", width: 1110, height: 588, live: "https://vling.net/search?na=KR&sort=trendsScorePercentile", alt: "Vling channel search screen", caption: "Channel search. I built the channel cards and the 11 channel attribute filters. Channel names are masked by the service; thumbnails and profile photos are blurred." },
    ],
    title: "Vling Video Search and Channel Search Redesign",
    org: "Buzz & Beyond internship", period: "2026.07 ~ 09",
    summary: "Adding a category filter made the channel recommendation section disappear entirely for some accounts. I found it before release and added a fallback, and shipped the video search and channel search screens with teammates.",
    visual: true,
    key: "2 search screens shipped",
    problem: "Adding a category filter made the channel recommendation section disappear entirely for some accounts.",
    solution: "Found the cause (0 candidates) before release and added a fallback that queries again without the category.",
    result: "Shipped the video search and channel search redesigns with teammates.",
    bullets: [
      "Video search: 4 curation sections, results grid, related channel recommendations",
      "Channel search: channel cards, 11 channel attribute filters, removal of channels unsuitable for ads, URL search, favorites folders",
      "Found before release that adding the category filter made the section disappear entirely for some accounts, and added a fallback",
    ],
    tags: ["TypeScript", "React", "Next.js", "Apollo Client", "Zustand"],
    links: [
      { label: "Video search", href: "https://vling.net/algorithm-score" },
      { label: "Channel search", href: "https://vling.net/search" },
    ],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "For accounts whose personalized category is Other, there were 0 candidates.",
        ],
      },
      {
        heading: "Role",
        paras: [
          "As a frontend intern, I developed the video search redesign with a teammate by splitting the work on one branch, and built the channel card from scratch.",
        ],
      },
    ],
  },
  {
    id: "vling-perf",
    metric: "CLS 0.246 → 0.003",
    title: "Vling Search Page Performance Measurement and Improvement",
    org: "Buzz & Beyond internship", period: "2026.08 ~ 09",
    summary: "The search page was slow, and the layout shifted while loading. I narrowed the causes with a measurement script and fixed them. All numbers were measured in a sandbox environment.",
    bars: [
      { label: "Search screen CLS", before: 0.246, after: 0.003, unit: "" },
      { label: "Skeleton shown after a sort change", before: 2194, after: 40, unit: "ms" },
      { label: "Thumbnail TTFB", before: 928, after: 154, unit: "ms" },
      { label: "'Vlog' search time", before: 8.6, after: 2.4, unit: "s" },
      { label: "Keyword search candidates", before: 1330, after: 22, unit: "K" },
    ],
    key: "CLS 0.246 → 0.003",
    problem: "Only the search screen shifted heavily while loading (CLS 0.246), and changing the sort froze it on the old results for over 2 seconds.",
    solution: "Measurement scripts narrowed the cause to the skeleton keys, which I fixed. Sort changes no longer refetch server-rendered data unrelated to the results, thanks to shallow routing.",
    result: "CLS 0.246 → 0.003, skeleton after a sort change 2,194ms → 40ms, 'vlog' search 8.6s → 2.4s (sandbox measurements).",
    bullets: [
      "Search page CLS 0.246 → 0.003 (changed the skeleton key to the grid slot number)",
      "Skeleton shown after a sort change 2,194ms → 40ms (shallow routing)",
      "Thumbnail TTFB 928ms → 154ms (bypassed the image optimizer for thumbnails only)",
    ],
    tags: ["Next.js", "React", "Web Vitals", "Playwright"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "The home page had a CLS of 0.002, but only the search page had 0.246. The cause of the CLS was that the skeleton key was the array index. Each time a card was settled, the remaining skeletons were pushed to later slots. When several were settled at once they moved together, so a single shift exceeded 0.1. I changed the key to the absolute slot number in the grid.",
          "Every time sort or filter changed, the router re-ran the server data function and transferred about 115KB. The response content for a sort change was the same even when the query changed, so a server round trip was not needed. So I changed 21 routing calls on the search page to shallow routing.",
          "With optimization, thumbnails download about 32KB less each (54.4KB → 22.7KB). Still, I chose to download 32KB more over delaying each grid card by 800ms. So I made only thumbnails skip optimization.",
          "A condition split two-word keywords and let a candidate in if any one word matched, so candidates grew to 1,330K, and a search for 'vlog' took 8.6 seconds. For keyword search, I removed the condition that let a candidate pass on a single matching word, and set the default search period to the last 6 months. Keyword search candidates went from 1,330K to 22K, and the 'vlog' search from 8.6s to 2.4s.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "With a one-line fix, CLS went from 0.161 → 0.001 in the local reproduction and 0.246 → 0.003 in the sandbox. Loading time and search time stayed the same, so this is an improvement in stability, not speed.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "All numbers were measured in a sandbox or locally, and are not production numbers. The sample size was 1 to 5 runs, and the same record notes a cold and warm variation of ±30%. So these should be read as direction and magnitude, not exact ratios. I did not measure production numbers because of access rules.",
        ],
      },
    ],
  },
  {
    id: "history-mcp",
    metric: "Top 10 recall 0.74 → 0.84",
    title: "History: Personal Work Record Pipeline",
    org: "Personal", period: "2026.10 ~ present",
    summary:
      "Claude Code deletes conversations older than 30 days, so I could not find past decisions and their reasons. I built a pipeline that indexes conversations, commits and documents automatically at every work session and extracts each day's decisions and their reasons.",
    stat: { value: "0.74 → 0.84", label: "top-10 recall on 43 questions" },
    key: "Recall 0.74 → 0.84",
    problem: "Claude Code deletes conversations after 30 days, so past decisions and their reasons could not be found again.",
    solution: "Conversations, commits and documents are collected and indexed automatically when a work session starts or ends, and each day's decisions and reasons are extracted with their source records and served through a search server (MCP) that combines keyword and semantic search.",
    result: "About 350,000 records indexed as of October 26, 2026, and the roughly 1,180 decision records feed my assistant bot's weekly decision summary. Top-10 recall on 43 questions went from 0.74 to 0.84.",
    bullets: [
      "Indexes about 350,000 conversations, commits and documents (as of October 26, 2026) automatically at every work session and extracts each day's decisions and reasons",
      "Serves about 1,180 decision records through an MCP search server, used by my assistant bot for a weekly decision summary",
      "Measured adding a 2-character index and semantic search against a 43-question evaluation set: top 10 recall 0.74 → 0.84",
    ],
    tags: ["Python", "TypeScript", "Node.js", "SQLite FTS5", "MCP", "ONNX"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "I solved the similarity clustering by collecting the top 100 by cosine, then re-ranking them with a bonus added to documents. I also tried weight tuning, excluding short chunks, and switching to a larger model. The effect was small or none, so I did not include them.",
          "I measured the rate at which the answer is in the top 10, saved the baseline, and run the same benchmark every time I change search.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "Even after adding semantic search, reworded questions only went from 0.333 to 0.417, which is 1 more out of 12. Looking at the cause, the embedding cosine similarities clustered at 0.86 to 0.91. So tens of thousands of conversation messages were pushing out the decision records and documents that should have been found.",
          "Most of that came from the 2-character index; semantic search alone moved it from 0.81 to 0.84. After adding the bonus, reworded questions went from 0.42 to 0.75 and the overall figure became 0.93. Other categories did not drop, and response time stayed at a p50 of 27ms.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "There is no separate held-out evaluation set. So 0.93, tuned and evaluated on the same 43, may be overfitted. I run the benchmark by hand when I change search; it fails if results drop below the baseline. It is not wired into CI or deploy.",
        ],
      },
    ],
  },
  {
    id: "agent-env",
    title: "Agent Assistant App and Working Rules",
    org: "Personal", period: "2026.06 ~ present",
    summary:
      "In a web app that puts my AI assistant bots and Claude Code on one screen, in-progress work did not show on the kanban board and Claude responses were slow. I fixed it with a cleanup job that moves cards linked to in-progress Notion tasks into the in-progress column and a fix to when a response is marked complete.",
    key: "Kanban auto-cleanup, reply marked done 0.9s sooner",
    problem: "In the web app I used for AI assistant bots and Claude Code on one screen, work in progress did not show on the kanban and replies were slow.",
    solution: "Cards linked to in-progress Notion tasks now move into the in-progress column automatically, and a reply is marked done as soon as the CLI returns its result.",
    result: "About 0.9 seconds saved per message (1 measurement). In October I moved it to native iOS and Mac apps on the same server.",
    bullets: [
      "Fixed in-progress work missing from the kanban board with a Notion-linked cleanup job and automatic archiving 3 days after completion",
      "Did not apply the reasoning effort and priority processing options, because measuring showed no confirmed gain",
      "Accept agent output only after I re-run and check it myself",
    ],
    tags: ["React", "PWA", "TypeScript", "Node.js", "MCP"],
    sections: [
      {
        heading: "Decisions and reasoning",
        paras: [
          "I also measured the reasoning effort and priority processing options, but with only 2 to 3 samples I could not confirm a usable gain, so I did not apply them.",
          "When fixing a bug, I run the new test without the fixed code to check that it actually fails.",
          "Hard-to-reverse or outward-facing actions, such as sending email or deleting data, are done only on targets a person has approved. I limited concurrent sub-agents to 2. I set that rule after 12 ran at once in late September and work could not be tracked.",
        ],
      },
      {
        heading: "Measurements",
        paras: [
          "Measuring each stage showed that the CLI stayed alive for 0.7 to 1 second after producing its result.",
        ],
      },
      {
        heading: "Limits",
        paras: [
          "I have not measured numerically how often the rules are followed or their effect.",
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
      items: ["AWS", "Docker", "nginx", "Terraform", "GitHub Actions", "Prometheus", "Grafana"],
    },
    { group: "Web", items: ["TypeScript", "React", "Next.js", "GraphQL"] },
    { group: "AI", items: ["Claude Code", "Codex", "MCP", "Embedding search (e5, RRF)", "LLM output validation"] },
  ],
};

export const projectGroups: ProjectGroup[] = [
  { name: "Hufscheer", note: "live cheering service for university sports, backend", about: hufscheerOverview, ids: ["cheer-spam", "llm-masking", "ci-deploy"] },
  { name: "Vling", note: "Buzz & Beyond internship, frontend", ids: ["vling-search", "vling-perf"] },
  { name: "AI Work Environment", note: "personal", ids: ["history-mcp", "agent-env"] },
  { name: "Side Projects", ids: ["loci", "pinta"], showOrg: true },
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
  description: "Portfolio of Kim Taewoo, a full-stack engineer. I like finding and fixing the problems that come up when running a service.",
};
