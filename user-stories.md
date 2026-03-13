# THE COMMONS IDE: USER STORIES FOR A SHARED WORKSHOP

These stories capture the experiences of the people who make up our learning community. They focus on how "The Commons" provides a safe, free, and open space for coding without the interference of corporate gatekeepers.

---

## 1. THE STUDENT EXPERIENCE

*As a student in an introductory coding class...*

- **The Instant Start:** I want to open my assignment in Google Classroom and have the editor appear instantly, so I can start making my Turtle draw without waiting for a server to "wake up" or logging into a separate website.
- **The Internal Voice:** I want to select a block of code I'm proud of and write a short note explaining my logic, so my teacher knows I understand *why* the code works, not just that I got it to run.
- **The Check-In:** I want to ask the built-in helper (Gemini) if my reflections match the class standards, so I can improve my thinking before I officially turn in my work.
- **The Gallery Walk:** I want to post my Pygame project to the "Exhibition Hall" and look at what my friends built, so we can learn from each other's "remixes" and leave encouraging notes based on our rubric.
- **The Local Power:** I want my code to run smoothly even if the school's internet is acting up, because I know the "engine" is running right on my own laptop and not on a server miles away.

> ⚠️ **Note on "The Local Power":** Code execution via Pyodide is local, but Pyodide itself must be loaded from a CDN (or self-hosted bundle) on first load. If a school self-hosts the Pyodide bundle, this story holds fully. Otherwise, an initial internet connection is required. See [blueprint.md §8.4](blueprint.md) for the mitigation plan.

---

## 2. THE TEACHER EXPERIENCE

*As a high school or community college instructor...*

- **The Simple Setup:** I want to "Make a Copy" of the entire IDE script into my school account once, so I can provide my students with a professional-grade workshop that I own and control for the rest of the year.
- **The Living Rubric:** I want to define my learning goals (like "Loop Logic" or "Variable Naming") directly in the script, so they appear as a guide for my students while they are actually typing.
- **The Reflection Review:** I want to see a student's code alongside their personal notes, so I can grade their understanding of the material rather than just checking if their program didn't crash.
- **The Longevity:** I want to know that if the project maintainers move on, my class isn't affected, because the code lives in my school account and doesn't rely on a company's subscription service.

---

## 3. THE IT ADMIN EXPERIENCE

*As a guardian of the school's network and safety...*

- **The Firewall Integrity:** I want the students' code to execute only in their own browser, so that our existing internet filters can see and block any restricted traffic just like they would for any other website.
- **The Zero-Tunnel Promise:** I want to be sure this tool doesn't create a "server-side tunnel" that lets students bypass CIPA filters or anonymize their activity.
- **The FERPA Playground:** I want to know that no student data (names, emails, or code) is ever stored in a database outside of our school's Google Workspace, ensuring we are always in compliance with privacy laws.
- **Low Maintenance:** I want a tool that requires zero server management on my end, because it leverages the Google infrastructure we are already paying for and managing.

---

## 4. THE ADMINISTRATOR EXPERIENCE

*As a Principal or Dean...*

- **The Budget Freedom:** I want to eliminate the thousands of dollars we spend on yearly coding platform subscriptions, so I can reallocate those funds to hardware or other classroom needs.
- **The Sustainability:** I want a solution that doesn't risk "vanishing" if a startup gets bought or changes its business model, providing our computer science program with long-term stability.
- **The Quality Standard:** I want to ensure our students are using tools that reflect real-world development environments, preparing them for the workforce or higher education.

---

## 5. THE PARENT EXPERIENCE

*As a parent of a student in the program...*

- **The Data Privacy:** I want to know that my child's intellectual property and personal information aren't being "harvested" or used to train corporate models without my consent.
- **The Ownership:** I want my child to be able to access their code even after the class is over, because it's saved directly in their school Drive account, allowing them to keep a portfolio of their growth.
- **The Equal Access:** I want to know that my child isn't being pushed to "upgrade" to a premium tier just to use the same tools as their classmates.

---

## 6. THE SUBSTITUTE TEACHER EXPERIENCE

*As a guest teacher stepping into the classroom...*

- **The Continuity:** I want a tool that requires zero setup or specialized training for me to supervise, so that the students can stay productive and "on-task" even when their regular teacher is absent.
- **The Stability:** I want to be confident that the students won't get "stuck" on a login screen or a server error, preventing the kind of classroom management issues that occur when technology fails.

---

## 7. THE PROJECT STEWARD EXPERIENCE

*As a volunteer or teacher helping to maintain the "Common Table" code...*

- **The Open Contribution:** I want to contribute a new feature (like a specific Turtle library) to the master script, so that every teacher in the community can benefit from the improvement without paying for an "upgrade."
- **The Transparency:** I want the code to be easy to read and document, so that the next steward can take over the maintenance whenever I am ready to step back.

---

## 8. THE ALUMNI EXPERIENCE

*As a former student now in college or the workforce...*

- **The Portfolio:** I want to open my old Google Drive from high school and still find my Pygame projects in a readable format, so I can show my progress to a potential employer or use it as a reference for my current classes.
- **The Knowledge Transfer:** I want to know that the skills I learned weren't tied to a proprietary "wrapper," but were real Python skills I can use in any professional editor.

---

## 9. THE TEACHER-AS-SYSADMIN EXPERIENCE

*As a CS teacher in a school where IT is one overwhelmed person managing 500 devices...*

- **The Decision Tree:** I want a single guide that tells me — based on my Google Workspace role — whether I can complete setup myself or need to open an IT ticket, so I don't spend a day attempting steps that require admin permissions I don't have.
- **The IT Email:** I want a pre-written email template I can paste and send to IT that explains exactly what I'm asking for, why it's safe, and what specific permissions or allowlists I need, so my ticket isn't misrouted or ignored.
- **The One-Pager for IT:** I want a single document I can attach to that email — a concise technical brief covering what data this tool touches, which CDN domains need to be reachable, and what Google APIs are enabled — so IT can make a decision in one sitting instead of playing email tag with me for two weeks.
- **The Setup Script:** I want a script (or a step-by-step checklist with screenshots) that handles Google Cloud Project creation and API enabling, so I don't have to navigate eight different Google admin consoles and hope I clicked the right things.
- **The Smoke Test:** I want a simple post-setup checklist I can run in 10 minutes to confirm everything is working before my students show up on Monday, including a test on an actual school Chromebook and a test account, so surprises stay out of classroom time.
- **The Known-Bad List:** I want a list of the most common setup failures (wrong deployment scope, OAuth screen not published, API quota not enabled) with exact error messages and fixes, so I can self-rescue without opening a new IT ticket for every stumble.

> **Why this persona exists separately:** "The Simple Setup" in §2 describes the ideal — one "Make a Copy" and done. This section captures reality: in most K-12 schools that ideal requires 1-3 humans, 2-10 business days, and institutional knowledge that no one person has. The tool is only as good as its worst-case onboarding path.

---

## 10. THE CURRICULUM DEVELOPER EXPERIENCE

*As a designer of computer science lessons and pathways...*

- **The Unbound Template:** I want to create "Starter Projects" that include a predefined rubric and reflection prompts, so that teachers can distribute a complete learning experience without needing to build the infrastructure themselves.
- **The Platform Neutrality:** I want to write curriculum that focuses on the core concepts of computer science rather than the "quirks" of a specific commercial website, ensuring my lessons are portable across different school years.
- **The Shared Update:** I want to be able to update a master lesson or a custom Python library and have it become available to the community instantly, without waiting for a corporate "release cycle."
- **The Open Pedagogy:** I want to see how students are interacting with my reflection prompts, so I can refine my curriculum based on where they are actually getting stuck or showing deep insight.
