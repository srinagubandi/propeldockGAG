# Propeldock — Clean-Slate Platform

> **"A clearer way to work together."**  
> **"Move work forward."**

Propeldock is a collaborative operating system designed specifically for agencies and their clients. It combines agency/client workspace governance with social content operations, change updates, issue tracking, SOP checklists, and a unified cross-module work board.

---

## 🚀 Key Highlights & Parity Modules

1. **Two-Sided Human Approval Quorum (SocialFlow)**
   - Every social post strictly requires **one valid agency-side human approval** and **one valid client-side human approval** before any dispatch can proceed.
   - Machine agents, API keys, and single-party actors cannot self-approve or bypass governance.

2. **Open-Weight AI Intelligence via OpenRouter**
   - Strictly utilizes premier open-weight models:
     - **DeepSeek-V3 (`deepseek/deepseek-chat`)**: Real-time caption drafting, release notes generation, and SOP checklist creation.
     - **Meta Llama 3.3 70B (`meta-llama/llama-3.3-70b-instruct`)**: Automated bug triaging, severity recommendation, and executive weekly digest synthesis.

3. **Multi-Tenant Agency & Workspace Isolation**
   - Supports multi-agency workspace links with role ceilings.
   - Governed visibility semantics: `workspace_shared`, `agency_shared`, and `private_internal`.
   - Immutable audit logging on every permission, mutation, and support session.

4. **Unified Work Board**
   - Real-time cross-module projection combining Bugs, Updates, SocialFlow, and Checklists into a unified Kanban pipeline.

5. **Permanent Demo Lab**
   - Pre-configured with two demo agencies (*Demo Agency North* and *Demo Agency South*) and two workspaces (*Shared Collaboration Workspace* and *North Single-Agency Workspace*).
   - Built-in persona switcher across all 10 required human role accounts + Super Admin (`sri@srinagubandi.com`).

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router, Server-side & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with the Warm Momentum enterprise palette (Deep Teal `#123F49`, Momentum Orange `#F58A2B`, Seafoam `#A9D3C5`, Warm Ivory `#F8F5ED`)
- **Icons:** Lucide React
- **Database:** PostgreSQL 18 managed on Railway
- **AI Engine:** OpenRouter with open-weight models (`deepseek/deepseek-chat` and `meta-llama/llama-3.3-70b-instruct`)
- **Hosting & CI/CD:** GitHub + Railway continuous automated deployment

---

## 🌐 Live Deployments & Endpoints

- **Live Production URL:** [https://propeldockgag-production.up.railway.app](https://propeldockgag-production.up.railway.app)
- **Public Health Endpoint:** `https://propeldockgag-production.up.railway.app/api/health`
- **GitHub Repository:** [https://github.com/srinagubandi/propeldockGAG](https://github.com/srinagubandi/propeldockGAG)

---

## 💻 Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure your environment variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key.
   - `DATABASE_URL`: Connection string to PostgreSQL.
3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```
4. Access the portal at `http://localhost:3000`.
