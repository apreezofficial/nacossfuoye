# Contributing to NACOSS Memo

First off, thank you for considering contributing to NACOSS Memo! It's people like you that make this community platform great.

## 🛑 STRICT RULE: Ask Before You Code
**Before writing ANY code, you MUST open an issue first.** 
In the issue, explain exactly what you want to implement and provide full details on how you plan to do it. You may only start working on the code once one of the core maintainers has given you the official "go ahead". This saves everyone time and ensures your work aligns with the project's vision.

## 🤝 How Can I Contribute?

### 1. Student-Facing Interfaces (Priority!)
Our biggest current need is building out the public-facing side of the platform where students can view announcements, published memos, and society updates. If you love frontend development and UI/UX design, this is the perfect place to start!

### 2. Fixing Bugs & Refactoring
Check the issues tab or the `todo.md` file for pending tasks. If you spot a bug in the admin dashboard, feel free to submit a patch.

### 3. New Features
Have an idea for a new module? (e.g., event ticketing, voting systems, etc.) As stated above, please open an issue first to discuss it in full detail before you start writing code.

## 🛠️ Contribution Workflow

1. **Fork the Repository**: Create your own fork of the project.
2. **Create a Branch**: `git checkout -b feature/your-feature-name` or `fix/your-bug-fix`.
3. **Write Code**: Implement your changes. Make sure to follow the existing coding style (TailwindCSS, functional React components).
4. **Test**: Ensure your changes don't break existing RBAC rules or layout responsiveness. Run `pnpm run lint` and `pnpm run build` before committing.
5. **Commit**: Write clear, descriptive commit messages.
6. **Push & Pull Request**: Push your branch to your fork and submit a PR to our `main` branch.

## 🔒 Security & Database Changes
If your feature requires new database tables or columns:
- **Do NOT** just modify your local database.
- You **MUST** update the `supabase_schema.sql` file in your Pull Request to include the new SQL definitions and Row Level Security (RLS) policies.

Welcome to the team! 🎉
