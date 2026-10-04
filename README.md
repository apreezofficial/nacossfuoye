# NACOSS Memo & Executive Dashboard 🚀

A comprehensive full-stack platform built for the National Association of Computing Students (NACOSS) to digitize and streamline executive workflows, memo generation, financial ledgers, and official communications.

Built with **Next.js 14**, **TailwindCSS**, and **Supabase**.

## 🌟 Features
- **Official Memo Generation**: Create beautifully formatted, printable memos for the Executive, SRC, Electoral Committee, and President.
- **Financial Ledger & Treasury**: Secure, role-based tracking of income, expenses, and society funds.
- **Design Templates**: Auto-generate "Do You Know", "Invest Friday", and Executive Birthday flyers.
- **Strict Role-Based Access Control (RBAC)**: Fine-grained security ensuring executives only see and manage what they are authorized to.

## 🛠️ Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, Lucide Icons
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security)
- **Deployment**: Vercel

## 🚀 Getting Started (For Contributors)

To run this project locally, you will need Node.js and a free Supabase account.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/NACOSS-Memo.git
cd NACOSS-Memo
```

### 2. Install dependencies
We use `pnpm` as our package manager.
```bash
pnpm install
```

### 3. Setup Supabase (Database)
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the entire contents of the `supabase_schema.sql` file from this repository and run it. This will instantly build the database tables and apply all our security rules.
4. **(Optional but Recommended)**: Copy and run the `supabase_seed.sql` file to populate your database with dummy memos, financial records, and quotes so you have data to test with!

### 4. Setup Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and paste your Supabase Project URL and Anon Key.

### 5. Run the Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🆘 We Need Your Help! (Student-Facing Interfaces)
While the Executive Admin Dashboard is fully functional and highly secure, **we currently need massive help building the public, student-facing interfaces!** 

If you are a student or frontend developer looking to contribute, we need:
- A beautiful public landing page for students to view published memos and announcements.
- A public directory for students to view the executive team and stakeholders.
- General UI/UX improvements to make the platform feel alive and engaging for the student body.

Please check the `todo.md` and issues tab, read our [CONTRIBUTING.md](CONTRIBUTING.md), or just fork the repo and submit a PR!

## 📜 License
This project is open-source and available under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.


## Games Hub
Play weekly single-player mini-games built by contributors! Track your high scores on the leaderboard. Check src/app/games/README.md to learn how to add your own.


### Games Hub Environment Variables
To run the Games Hub properly, ensure you have the following in your .env.local:
- `NEXT_PUBLIC_GAME_SECRET` (for hashing scores)
- `SUPABASE_SERVICE_ROLE_KEY` (required by the backend action to securely submit scores and bypass RLS)
Refer to .env.example for the format.
