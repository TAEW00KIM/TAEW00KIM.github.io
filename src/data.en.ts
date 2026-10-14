// English version of data.ts. Same exports and types; ids, paths, links, periods and numbers are identical.
import type { ExpTab, Project, ProjectGroup } from "./data";

export const site = {
  nameEn: "Kim Taewoo",
  nameKo: "김태우",
  role: "Software Engineer",
  github: "https://github.com/TAEW00KIM",
  githubLabel: "github.com/TAEW00KIM",
  email: "twkk0819@gmail.com",
  web: "https://kimtaewoo.dev",
  webLabel: "kimtaewoo.dev",
  resumePdf: "/resume.pdf",
  footer: "Updated 2026.10",
};

export const hero = {
  tagline: [
    "I like finding and fixing the problems that come up when running a service.",
    "I work on the backend of Hufscheer, a live cheering service for university sports, and I develop the frontend of Vling at Buzz & Beyond.",
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
          period: "2026.07 ~ present",
          bullets: [
            "Vling is a YouTube channel and video data SaaS. Since July I have worked on the frontend and shipped the video search and channel search redesigns with teammates.",
            "In the video search redesign, I built 4 curation sections, the results grid, and related channel recommendations.",
            "In the channel search redesign, I built channel cards, 11 qualitative filters, removal of channels unsuitable for ads, URL search, and favorites folders.",
            "A performance measurement script showed that only the search page had a high CLS. I narrowed the cause to the skeleton key and reduced CLS from 0.246 → 0.003.",
          ],
          tags: ["TypeScript", "React", "Next.js", "Apollo Client"],
        },
        {
          title: "US Market Lead Generation",
          org: "Buzz & Beyond / Vling",
          period: "2026.09 ~ present",
          bullets: [
            "I took the targets set at the kickoff and built a cold email channel: lead extraction, segment classification, an English email sequence, and sending domain warm-up.",
            "I built a read-only dashboard for sending status and an unsubscribe ledger.",
            "I wrote the email copy and operating documents with Claude Code and cross-checked them with Codex.",
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
          period: "2025.03 ~ 2026.08",
          bullets: [
            "As president of the 9th cohort, I ran a developer community of more than 30 members and designed the Spring Boot study curriculum.",
            "In the 10th cohort, I served as vice president and Node.js part lead.",
          ],
        },
        {
          title: "Undergraduate Teaching Assistant, Introduction to Deep Learning",
          org: "Hankuk University of Foreign Studies (HUFS)",
          period: "2025.09 ~ 2025.12",
          bullets: ["I developed an automatic grading system for assignments."],
          tags: ["Spring", "React", "FastAPI"],
        },
        {
          title: "VitaCheck Booth Operation",
          org: "Seoul Job Fair",
          period: "2025.11",
          bullets: ["100 real users a day used it."],
        },
        {
          title: "Senior KATUSA, Acting Platoon Leader",
          org: "KATUSA",
          period: "2023.04 ~ 2024.10",
          bullets: [],
        },
      ],
    },
    {
      id: "award",
      label: "Awards",
      items: [
        {
          title: "H-UP Best Award",
          org: "H-UP",
          period: "2022",
          bullets: ["I received it for an educational iOS app that teaches smartphone use through games."],
        },
      ],
    },
  ],
};

const hufscheerRepo = { label: "GitHub", href: "https://github.com/hufscheer/spectator-server" };

const hufscheerOverview = [
  "Hufscheer is a live cheering service for university sports. It shows scores, timelines, and lineups for on-campus soccer and basketball tournaments in real time. Users can also cheer together through cheer chat messages.",
  "The service has run since 2023, and I joined its backend in February 2026. As of June 2026 (GA), it has about 4,800 active users and 130,000 total views. Since joining, I have written 55% of the server repository's commits (221/403, excluding merges).",
];

export const projects: Project[] = [
  {
    id: "cheer-spam",
    images: [
      { src: "/hufscheer-cheer.png", width: 416, height: 900, alt: "Hufscheer match cheering screen", caption: "Cheering screen. Taken in a local environment with made-up data. The live service is currently down." },
      { src: "/hufscheer-timeline.png", width: 416, height: 900, alt: "Hufscheer match timeline screen", caption: "Timeline screen. Taken in a local environment with made-up data." },
    ],
    title: "Cheer Chat Spam Defense",
    org: "Hufscheer, backend", period: "2026.02 ~ present",
    summary:
      "Floods of identical cheer chat messages shifted the team rankings. I blocked the spam without blocking normal users.",
    bullets: [
      "Block at 120 requests per 60 seconds per visitor (cookie), and from the 4th identical message within 3 seconds (Caffeine)",
      "Bot requests that tried to inflate the cheer count (57 per minute) were all rejected by input range validation",
      "Found that 99% of 21,715 cheer chat messages came from 3 preset buttons, and raised the award criteria with the team",
    ],
    tags: ["Java", "Spring Boot", "Caffeine", "MySQL", "STOMP", "sliding window"],
    links: [hufscheerRepo],
    sections: [
      { heading: "Overview", paras: hufscheerOverview },
      {
        heading: "Problem",
        paras: [
          "Starting at 2 a.m. on April 30, 2026, 7,617 identical cheer chat messages piled up on a single match that had not started yet, over 8 minutes. 5,652 of them went to one team.",
          "The service shows team cheer rankings, so this value changes the rankings directly. I saw the cheer chat count jump from the 1,000s to the 8,000s and checked the pattern in the database.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "I treated it as abnormal traffic instead of declaring it bots. The limit is set at a level normal users do not reach.",
          "At first I blocked by IP. A teammate pointed out that students on a school network share one IP and would be blocked together. After discussing it with the team, we decided to issue a visitor cookie. This lets us tell individuals apart even in a service without login.",
          "The limits follow the criteria set by the PM: 120 requests per 60 seconds per person. Identical messages are blocked from the 4th one within 3 seconds.",
          "A fixed window lets through up to twice the limit if requests are sent right before and right after the boundary. So I implemented a sliding window that keeps request timestamps.",
          "Production runs on one server, so I kept the window in a Caffeine local cache instead of adding Redis. Following a review comment, I split the limiting logic into an interface and an implementation. It can be swapped for a Redis implementation if the service moves to multiple servers.",
        ],
      },
      {
        heading: "Result",
        paras: [
          "On May 6, requests came in trying to raise the cheer count to 1101, 57 times per minute, and all were rejected with 400. The data was not affected.",
          "But when I traced which stage blocked them, it was the value range validation, not the rate limit. A request with an in-range value would have passed. Since then I check block results by the stage that blocked, not by the response code.",
          "After blocking, I looked at the data again. 99% of 21,715 cheer chat messages were from 3 preset buttons, and messages typed by hand were a few dozen per team. I told the team that giving awards by cheer chat count would turn into a competition of tap counts.",
          "One limitation remains. A client that does not store cookies is counted as a new visitor on every request and can avoid this limit.",
        ],
      },
      {
        heading: "Role",
        paras: [
          "As the backend developer, I implemented the sliding window limit. I injected time through a Caffeine Ticker, and tested by moving the clock forward in tests.",
        ],
      },
      {
        heading: "Tech stack",
        paras: ["Java 17, Spring Boot 3, MySQL, Caffeine, WebSocket (STOMP)"],
      },
    ],
  },
  {
    id: "llm-masking",
    title: "LLM Profanity Masking Pipeline",
    org: "Hufscheer, backend", period: "2026.02 ~ present",
    summary:
      "The LLM that masks profanity sometimes returned an explanation instead of the masked sentence, and it went straight to the screen. I blocked this by checking the output in code, and also reduced the number of LLM calls.",
    bullets: [
      "Put a static filter and a result cache in front of the LLM to reduce calls",
      "Split the provider behind an interface, so Gemini and OpenRouter can be switched by configuration alone",
      "Block leaks in two stages: output validation and the prompt",
    ],
    tags: ["Spring Boot", "Gemini", "OpenRouter", "Caffeine"],
    links: [hufscheerRepo],
    sections: [
      { heading: "Overview", paras: hufscheerOverview },
      {
        heading: "Problem",
        paras: [
          "When a cheer chat message contains profanity, the LLM replaces the body with a masked sentence. On April 29 in production, the model misread one word as Japanese and returned an explanation with it. The server saved the response without checking it, so the explanation was shown on screen.",
          "On May 7, the opposite happened: normal cheer initials were masked and saved. Model responses vary in format even for the same input. That was the key constraint.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "A regex profanity dictionary is fast and cheap but often masks normal sentences. So I left the judgment to the LLM and set the principle to not mask when in doubt.",
          "I did not leave this principle only in the prompt. I enforced it in code at the output stage, and when a check fails, the original text is used as is. It rejects responses whose length grew abnormally, responses containing leak phrases, responses where the sentence changed without a mask marker, and responses where the cheer initials of the original disappeared.",
          "I solved the cost by reducing the number of calls. Since 99% of cheer chat messages are preset buttons, a first-stage filter skips the LLM for preset phrases, messages made only of cheer initials, and messages without Korean characters. The same sentence is cached for 5 minutes, so even a flood of spam triggers only one call.",
          "The provider is split behind an interface, so Gemini and OpenRouter can be switched by configuration alone.",
        ],
      },
      {
        heading: "Result",
        paras: [
          "After the account migration, I chose the model again. I sent 10 sentences to be masked and 12 sentences to be left alone, twice each, in the same format as production requests, and compared 9 models. The evaluation cost $0.17.",
          "The previous model had 88.6% accuracy. The one I chose, gemma-4-31b, had 100% with a median response of 0.5 seconds and $0.18 per 1,000 requests. Some reasoning models returned empty responses in other features, and some had a high pass rate but broken actual output. So I chose by reading the outputs directly instead of looking only at the pass rate.",
          "I have not yet confirmed that the replaced model is actually called in the deployed app. Forcing the response into JSON format also remains as follow-up work.",
        ],
      },
      {
        heading: "Role",
        paras: ["As the backend developer, I handled the masking pipeline and the model comparison."],
      },
      {
        heading: "Tech stack",
        paras: ["Java 17, Spring Boot 3, Caffeine, Gemini, OpenRouter"],
      },
    ],
  },
  {
    id: "infra-rebuild",
    title: "Infrastructure Rebuild After a Cloud Account Suspension",
    org: "Hufscheer, backend", period: "2026.09 ~ 10",
    summary:
      "The AWS account was suspended and the service stopped. I rebuilt the infrastructure in a new account with Terraform and resumed operations.",
    bullets: [
      "Rebuilt VPC, EC2, S3 with CloudFront, and SSM with Terraform, and moved DNS to Cloudflare",
      "Switched S3 access from a fixed app key to an instance role",
      "Added an uptime check outside the account, 17 Grafana alerts, GuardDuty, and a cost anomaly alert",
    ],
    tags: ["Terraform", "AWS", "Cloudflare", "Grafana", "Docker"],
    links: [hufscheerRepo],
    sections: [
      { heading: "Overview", paras: hufscheerOverview },
      {
        heading: "Problem",
        paras: [
          "On September 29, 2026, a deployment failed with a server connection timeout. I found that the AWS account had been suspended for a security issue. DNS, servers, and monitoring were all in the same account, so everything stopped at once.",
          "Monitoring stopped too, so no alerts came. Nobody had been reading the warning emails sent to the account since late August. I could not log in to the old account, so there was no way to take out the database.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "I moved DNS to Cloudflare. Even if an account is lost, the domain and email must stay alive so that recovery notices can be received. I wrote the whole infrastructure again in Terraform, so that it can be rebuilt from code if the same thing happens again.",
          "For the database, I chose to add 2GB of swap to MySQL on the server instead of using RDS. RDS would cost about $18 more per month for the instance alone. Measuring locally, I could reduce MySQL's default 409MB to 171MB by turning off performance_schema and shrinking buffers (measured with emulation).",
          "Traffic is small (7 to 11 requests per second, CPU 1 to 7%), so I combined the dev server and monitoring on one machine.",
          "I removed the fixed access key the app used for S3 and switched to an EC2 instance role (IMDSv2 required). Secrets that used to be baked into the image moved to SSM parameters and are injected at runtime.",
          "I added an uptime check that runs outside the account (Cloudflare Worker), 17 Grafana alerts, GuardDuty, and a cost anomaly alert. I also set up daily DB dumps and EBS snapshots.",
        ],
      },
      {
        heading: "Result",
        paras: [
          "On October 6, about 1 week after detection on September 29, production deployment resumed in the new account. I estimated the monthly cost of the new setup at $54 to $56 using the AWS pricing API (an estimate).",
          "The old data is still waiting for the account to be recovered. An off-account DB backup was designed but not turned on. Looking back, the biggest risks were a structure that put everything in one account, and an operation where nobody read the account's email.",
        ],
      },
      {
        heading: "Role",
        paras: ["As the backend developer, I rebuilt the infrastructure in the new account with Terraform and resumed operations."],
      },
      {
        heading: "Tech stack",
        paras: ["Terraform, AWS (VPC, EC2, S3, CloudFront, SSM, GuardDuty), Cloudflare, Grafana, Docker, MySQL"],
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
    bullets: [
      "Put MySQL on tmpfs, which fixed test DB time at 54 seconds (it had been 101 to 632 seconds)",
      "Kept only the documentation tests in the deploy job instead of a duplicate full test run, 510s → 132s",
      "Removed downtime with Blue/Green deployment based on an nginx router and graceful shutdown",
    ],
    tags: ["GitHub Actions", "MySQL", "nginx", "Docker", "Prometheus"],
    links: [hufscheerRepo],
    sections: [
      { heading: "Overview", paras: hufscheerOverview },
      {
        heading: "Problem",
        paras: [
          "CI time varied from 8 to 17 minutes. Every deployment cut the service for up to 30 seconds.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "I narrowed the cause of the varying CI time to the TRUNCATE run for every test and the runner disk. I put MySQL on tmpfs to remove the disk effect. In the deploy job, which had been running the full tests a second time, I kept only the documentation tests.",
          "I removed deployment downtime with a Blue/Green deployment using an nginx router and graceful shutdown.",
          "Before a period when 2 tournaments overlapped, I considered whether to run a load test. Looking at 14 days of Prometheus data, CPU peaked at 32% and heap at 44%. CPU was 7.6% even on the day bots flooded in. I decided not to do a load test, which would take 5 to 10 days.",
        ],
      },
      {
        heading: "Result",
        paras: [
          "Test DB time was fixed at 54 seconds from 101 to 632 seconds. The deploy job went from 510 seconds to 132 seconds. The downtime of up to 30 seconds per deployment is gone.",
        ],
      },
      {
        heading: "Role",
        paras: ["As the backend developer, I have handled deployment, monitoring, and incident response for 8 months."],
      },
      {
        heading: "Tech stack",
        paras: ["GitHub Actions, MySQL, nginx, Docker, Prometheus, Grafana"],
      },
    ],
  },
  {
    id: "loci",
    title: "Lo.ci Location-Based SNS",
    org: "Solo backend", period: "2025.11 ~ 2026.02",
    summary:
      "Every map move re-aggregated all posts. I aggregated in advance when a post is written, and made the map read only the aggregate table.",
    bullets: [
      "Replaced the full post aggregation with a lookup on a per-H3-cell statistics table, with fallback to the old query on failure",
      "Prevented duplicates from concurrent updates to the same cell with a unique constraint, a pessimistic lock, and retries",
      "Split notifications into async events after commit, and fixed N+1 with @BatchSize and JOIN FETCH",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "Uber H3"],
    sections: [
      {
        heading: "Overview",
        paras: [
          "Lo.ci is a location-based SNS where users leave the places they visited with friends on a map. The main screen shows friends' posts as markers on the map. I handled the backend design and implementation alone (commits 302/302).",
        ],
      },
      {
        heading: "Problem",
        paras: [
          "The first marker query filtered the post table by map bounds, then grouped by cell. Every time, it computed a friend list subquery, a blocked user subquery, and a correlated subquery to pick a representative thumbnail for each cell.",
          "Every map move re-aggregated all posts. The post table also had no latitude and longitude index.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "What the map needs is not each post. It needs how many friend posts are in a cell and what the latest thumbnail is. So I decided to aggregate in advance at write time, not compute at read time.",
          "I chose hexagonal cells at Uber H3 resolution 9 as the cell. I kept one aggregate row per user and cell, so that the lookup reads only aggregate rows.",
          "In case the new query was wrong, I made it switchable with the old query through a configuration flag. If the new query throws an exception, it falls back to the old query.",
          "If the same user posted to the same cell almost at the same time, two aggregate rows could be created or a count could be lost. I added a unique constraint and took a pessimistic lock on the row when updating. If creating the first row at the same time hits the constraint, it retries.",
          "In the post list, collection fetch join and paging together loaded everything into memory. I solved that with @BatchSize. I solved the N+1 in the reaction list with JOIN FETCH.",
          "Notifications are sent from an async listener after the post transaction commits. So the post response does not wait for notifications.",
        ],
      },
      {
        heading: "Result",
        paras: [
          "I did not keep a script or execution plans that measured response time before and after the change. So I do not give a number for the improvement. The only test was context loading, and I could not verify the concurrent update handling with a load test.",
          "Because the aggregate update is async, the aggregate can drift if even the retry fails. The IN list also grows as the number of friends grows.",
          "Since this experience, I measure before changing in Hufscheer and Vling, and keep the measurement conditions together.",
        ],
      },
      {
        heading: "Role",
        paras: ["I handled both design and implementation alone as the only backend developer."],
      },
      {
        heading: "Tech stack",
        paras: ["Java 21, Spring Boot 3.3, MySQL 8, Redis, Uber H3, Firebase, AWS S3"],
      },
    ],
  },
  {
    id: "pinta",
    title: "Pinta (Lo.ci Redesign)",
    org: "Personal", period: "2026.02 ~ 2026.04",
    summary: "Every request re-read the account status from the DB, and profile statistics were split across 3 queries. I reduced them with a 30-second cache and 1 aggregate query.",
    bullets: [
      "Replaced the per-request account status DB lookup with a Caffeine cache (30 seconds)",
      "Merged 3 profile statistics queries into 1, and changed the N+1 in the feed image list to a batch lookup",
      "Built on-demand image resizing behind CloudFront with Lambda@Edge, then replaced it with imgproxy (EC2)",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Caffeine", "CloudFront", "Lambda@Edge", "imgproxy", "Flyway"],
    sections: [
      {
        heading: "Overview",
        paras: [
          "Pinta is a personal project that redesigns Lo.ci. I wrote all 56 commits myself.",
        ],
      },
      {
        heading: "Problem",
        paras: [
          "The auth filter re-read the account status from the DB on every request. Profile statistics were split across 3 queries. The feed image list had an N+1.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "I replaced the account status lookup with a Caffeine cache (30 seconds). I merged the 3 profile statistics queries into 1 aggregate query. I changed the N+1 in the feed image list to a batch lookup.",
          "For images, I built on-demand resizing behind CloudFront with Lambda@Edge, then replaced it with imgproxy (EC2).",
        ],
      },
      {
        heading: "Result",
        paras: [
          "I confirmed the number of queries from the code change, but did not measure the time before and after. Because of the cache, an account that has left or been deleted can still pass for up to 30 seconds. I did not build the invalidation logic to fix this.",
        ],
      },
      {
        heading: "Role",
        paras: ["I handled backend design and implementation alone."],
      },
      {
        heading: "Tech stack",
        paras: ["Java, Spring Boot, MySQL, Caffeine, CloudFront, imgproxy, Flyway"],
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
          "VitaCheck is a supplement recommendation service. I worked on the backend in a team of 5 and wrote 184 of the 336 total commits. In November 2025, we ran a booth at the Seoul Job Fair, with 100 real users per day.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "I separated the user and auth modules, moved notification code into the user module to clean up module boundaries, and implemented Google login. I added duplicate ingredient validation to the Gemini-based supplement recommendation. I changed the pagination of the purpose-based search from Page to Slice, as a follow-up to a teammate's OOM fix.",
        ],
      },
      {
        heading: "Role",
        paras: ["As a backend developer, I handled module separation, Google login, recommendation validation, and search pagination."],
      },
      {
        heading: "Tech stack",
        paras: ["Java, Spring Boot, MySQL, Redis, QueryDSL, multi-module"],
      },
    ],
  },
  {
    id: "vling-search",
    images: [
      { src: "/vling-channel-search.png", width: 1440, height: 800, alt: "Vling channel search screen", caption: "Channel search screen" },
    ],
    title: "Vling Video Search and Channel Search Redesign",
    org: "Buzz & Beyond internship", period: "2026.07 ~ 09",
    summary: "Adding a category filter made the channel recommendation section disappear entirely for some accounts. I found it before release and added a fallback, and shipped the video search and channel search screens with teammates.",
    bullets: [
      "Video search: 4 curation sections, results grid, related channel recommendations",
      "Channel search: channel cards, 11 qualitative filters, removal of channels unsuitable for ads, URL search, favorites folders",
      "Found before release that adding the category filter made the section disappear entirely for some accounts, and added a fallback",
    ],
    tags: ["TypeScript", "React", "Next.js", "Apollo Client", "Zustand"],
    links: [
      { label: "Video search", href: "https://vling.net/algorithm-score" },
      { label: "Channel search", href: "https://vling.net/search" },
    ],
    sections: [
      {
        heading: "Overview",
        paras: [
          "Vling is a YouTube channel and video data SaaS. Since July 2026, I have worked on the frontend at Buzz & Beyond as an internship for academic credit. I shipped the video search and channel search redesigns with teammates.",
        ],
      },
      {
        heading: "Problem",
        paras: [
          "After I added a category filter to the channel recommendation section, the section disappeared entirely for some accounts. For accounts whose personalized category is Other, there were 0 candidates. I found this before the production release.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "I added a fallback: if no channel is found with the category, it queries again without the category.",
          "In the video search redesign, I built 4 curation sections, the results grid, and related channel recommendations.",
          "In the channel search redesign, I built channel cards, 11 qualitative filters, removal of channels unsuitable for ads, URL search, and favorites folders.",
        ],
      },
      {
        heading: "Role",
        paras: [
          "As a frontend intern, I developed the video search redesign with a teammate by splitting the work on one branch, and built the channel card from scratch.",
        ],
      },
      {
        heading: "Tech stack",
        paras: ["TypeScript, React, Next.js, Apollo Client (GraphQL), Zustand"],
      },
    ],
  },
  {
    id: "vling-perf",
    metric: "CLS 0.246 → 0.003",
    title: "Vling Search Page Performance Measurement and Improvement",
    org: "Buzz & Beyond internship", period: "2026.08 ~ 09",
    summary: "The search page was slow, and the layout shifted while loading. I narrowed the causes with a measurement script and fixed them. All numbers were measured in a sandbox environment.",
    bullets: [
      "Search page CLS 0.246 → 0.003 (changed the skeleton key to the grid slot number)",
      "Sort change response 2,194ms → 40ms (shallow routing)",
      "Thumbnail TTFB 928ms → 154ms (bypassed the image optimizer for thumbnails only)",
    ],
    tags: ["Next.js", "React", "Web Vitals", "Playwright"],
    sections: [
      {
        heading: "Overview",
        paras: [
          "With an AI agent, I built a post-deploy smoke script and a performance measurement script that verify 3 apps in 26 seconds. The CLS defect below was found the first time I ran this script.",
          "All numbers were measured in a sandbox or locally, and are not production numbers.",
        ],
      },
      {
        heading: "Problem",
        paras: [
          "I set a baseline with a script that measures the metrics of the home and search pages on every deploy. The home page had a CLS of 0.002, but only the search page had 0.246. It rarely appeared when logged in, and reproduced as a guest when thumbnail checks were slow.",
          "Collecting the source nodes of layout-shift entries locally, all of them were video card skeletons.",
          "Every time sort or filter changed, the router re-ran the server data function and transferred about 115KB. The screen stayed frozen on the old results meanwhile.",
          "Thumbnails are videos seen for the first time in each search result, so the image optimization cache was always empty. Cards stayed blank while the server fetched the original and re-encoded it.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "The cause of the CLS was that the skeleton key was the array index. Each time a card was settled, the remaining skeletons were pushed to later slots. When several were settled at once they moved together, so a single shift exceeded 0.1.",
          "I changed the key to the absolute slot number in the grid. A settled card takes its place, and the remaining skeletons stay where they are.",
          "The response content for a sort change was the same even when the query changed, so a server round trip was not needed. So I changed 21 routing calls on the search page to shallow routing.",
          "With optimization, thumbnails download about 32KB less each (54.4KB → 22.7KB). Still, I chose to download 32KB more over delaying each grid card by 800ms. So I made only thumbnails skip optimization.",
        ],
      },
      {
        heading: "Result",
        paras: [
          "With a one-line fix, CLS went from 0.161 → 0.001 in the local reproduction and 0.246 → 0.003 in the sandbox. Loading time and search time stayed the same, so this is an improvement in stability, not speed.",
          "The sort change response was 2,194ms → 40ms, and thumbnail TTFB was 928ms → 154ms.",
          "The sample size was 1 to 5 runs, and the same record notes a cold and warm variation of ±30%. So these should be read as direction and magnitude, not exact ratios. I did not measure production numbers because of access rules.",
        ],
      },
      {
        heading: "Role",
        paras: ["I built the measurement script with an AI agent, and handled the cause analysis and the fix."],
      },
      {
        heading: "Tech stack",
        paras: ["TypeScript, React, Next.js, Playwright"],
      },
    ],
  },
  {
    id: "history-mcp",
    metric: "Top 10 recall 0.74 → 0.84",
    title: "Work History Search Server (MCP)",
    org: "Personal", period: "2026.06 ~ present",
    summary:
      "Claude Code deletes conversations older than 30 days, so I could not find past decisions and their reasons. I built a server that collects work records every day and lets agents search them.",
    bullets: [
      "Measured before and after adding semantic search on a gold set of 43 queries: top 10 recall 0.74 → 0.84",
      "Found the cause of the small effect on reworded questions (similarity clustering) and improved it 0.42 → 0.75",
      "Run a regression gate that runs the same queries before every release",
    ],
    tags: ["TypeScript", "Node.js", "SQLite FTS5", "MCP", "ONNX"],
    sections: [
      {
        heading: "Overview",
        paras: [
          "This server collects conversations with Claude Code, Codex, and bots, plus commits and documents in one place, so that agents can search and use them. It runs on a home server and is provided as MCP tools.",
          "It started when I learned that Claude Code deletes conversations older than 30 days. The goal is for agents to find past decisions and their reasons instead of guessing.",
        ],
      },
      {
        heading: "Problem",
        paras: [
          "Exact keyword search is the most reliable for proper nouns, commands, and commit hashes. But keyword search is weak on questions with attached particles or reworded questions.",
          "Even after adding semantic search, reworded questions only went from 0.333 to 0.417, which is 1 more out of 12. Looking at the cause, the embedding cosine similarities clustered at 0.86 to 0.91. So tens of thousands of conversation messages were pushing out the decision records and documents that should have been found.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "I merged the two rankings, keyword search and semantic search (e5-small), with RRF.",
          "Before adding it, I fixed the correct answers for 43 questions by rules from the real DB, and measured the rate at which the answer is in the top 10. I saved the baseline and run the same benchmark every time I change search.",
          "I solved the similarity clustering by collecting the top 100 by cosine, then re-ranking them with a bonus added to documents. I also tried weight tuning, excluding short chunks, and switching to a larger model. The effect was small or none, so I did not include them.",
        ],
      },
      {
        heading: "Result",
        paras: [
          "After adding semantic search, overall recall went from 0.74 to 0.84. After adding the bonus, reworded questions went from 0.42 to 0.75 and the overall figure became 0.93. Other categories did not drop, and response time stayed at a p50 of 27ms.",
          "The benchmark did change a decision. After I added new decision records, the exact keyword search metric dropped and was flagged as a regression. On checking, the problem was in the answer rules, so I fixed the rules.",
          "There are limits. I made the gold set myself and there is no separate held-out evaluation set. So 0.93, tuned and evaluated on the same 43, may be overfitted. The benchmark is a manual step before release and is not connected to CI.",
        ],
      },
      {
        heading: "Role",
        paras: ["I handled design, implementation, writing the evaluation set, and operation alone."],
      },
      {
        heading: "Tech stack",
        paras: ["TypeScript, Node.js, SQLite FTS5, ONNX (multilingual-e5-small), MCP"],
      },
    ],
  },
  {
    id: "agent-env",
    title: "Agent Mobile Web App and Working Rules",
    org: "Personal", period: "2026.06 ~ present",
    summary:
      "In a web app that puts 3 bots and Claude Code on one screen, in-progress work did not show on the kanban board and Claude responses were slow. I fixed it with automatic status sync from Notion and a fix to when a response is marked complete.",
    bullets: [
      "Fixed in-progress work missing from the kanban board with automatic Notion status sync and automatic archiving 3 days after completion",
      "Did not apply the reasoning effort and priority processing options, because measuring showed no confirmed gain",
      "Delegate implementation to sub-agents and re-run the verification myself",
    ],
    tags: ["React", "PWA", "TypeScript", "Node.js", "MCP"],
    sections: [
      {
        heading: "Overview",
        paras: [
          "This is a PWA that moved the 3 bots I used through Discord to a dedicated screen and added a Claude Code channel. The server holds the bot API keys and proxies requests, and only devices on the same Tailscale account can connect. I use it myself and fix what bothers me.",
        ],
      },
      {
        heading: "Problem",
        paras: [
          "In-progress work did not show on the kanban board. Responses on the Claude channel were slow too. Measuring each stage showed that the CLI stayed alive for 0.7 to 1 second after producing its result.",
        ],
      },
      {
        heading: "Solution",
        paras: [
          "For the kanban board, I used a cleanup job that automatically moves cards linked to in-progress tasks in Notion. Cards are archived 3 days after they finish.",
          "For response speed, I changed it to mark the response complete as soon as the result event arrives. This saved about 0.9 seconds per message (1 measurement). I also measured the reasoning effort and priority processing options, but with only 2 to 3 samples I could not confirm a usable gain, so I did not apply them.",
          "I also set and use rules for working with agents. I delegate implementation to sub-agents, and accept only the results I have re-run and confirmed myself. When fixing a bug, I run the new test without the fixed code to check that it actually fails.",
          "Hard-to-reverse or outward-facing actions, such as sending email or deleting data, are done only on targets a person has approved. I limited concurrent sub-agents to 2. I set that rule after 12 ran at once in late September and work could not be tracked.",
        ],
      },
      {
        heading: "Result",
        paras: [
          "I use the PWA every day. The rules run as a set. I have not measured numerically how often the rules are followed or their effect.",
        ],
      },
      {
        heading: "Role",
        paras: ["I handle design, implementation, and operation alone."],
      },
      {
        heading: "Tech stack",
        paras: ["TypeScript, Node.js, React (PWA), Tailscale, MCP, Claude Code, Codex"],
      },
    ],
  },
];

export const resume = {
  title: "Skills",
  pdfLabel: "Resume (PDF, Korean)",
  skills: [
    { group: "Server", items: ["Java", "Spring Boot", "JPA", "QueryDSL"] },
    { group: "Data", items: ["MySQL", "Redis"] },
    {
      group: "Infrastructure",
      items: ["AWS", "Docker", "Terraform", "GitHub Actions", "Prometheus", "Grafana"],
    },
    { group: "Web", items: ["TypeScript", "React", "Next.js"] },
    { group: "AI", items: ["Claude Code", "Codex", "MCP"] },
  ],
};

export const projectGroups: ProjectGroup[] = [
  { name: "Hufscheer", note: "live cheering service for university sports, backend", ids: ["cheer-spam", "llm-masking", "infra-rebuild", "ci-deploy"] },
  { name: "Vling", note: "Buzz & Beyond internship, frontend", ids: ["vling-search", "vling-perf"] },
  { name: "AI Work Environment", note: "personal", ids: ["history-mcp", "agent-env"] },
  { name: "Side Projects", ids: ["loci", "pinta"], showOrg: true },
];

export const ui = {
  lang: "en",
  projectsTitle: "Projects",
  langLinkLabel: "한국어",
  langLinkHref: "/",
  resumeFilename: "Kim_Taewoo_Resume_ko.pdf",
  docTitle: "Kim Taewoo | Software Engineer",
  description: "Portfolio of Kim Taewoo, a software engineer. I like finding and fixing the problems that come up when running a service.",
};
