<!-- @format -->

# NACOSS MEMO Generator

## Overview

The **NACOSS MEMO Generator** is a web application designed to help NACOSS (Nigeria Association of Computer Science Students) executives and members easily create, preview, and manage official memos. The app provides a simple editor for composing memos, generates a formatted letterhead, and allows users to view and manage previously created memos.

## Features

- **Memo Editor:** Compose memos with date, reference number, heading, and content.
- **Live Preview:** Instantly see how your memo will look on the official NACOSS letterhead.
- **Save & Manage Memos:** Store memos in a Supabase database and view them in a list.
- **Admin Authentication:** Secure admin login for editing and generating memos.
- **Protected Routes:** Only authenticated admins can access memo creation and editing features.
- **Responsive Design:** Works well on both desktop and mobile devices.

## Technologies Used

- **React** – Frontend UI
- **React Router** – Routing and protected pages
- **Supabase** – Database and authentication
- **Vite** – Fast development server and build tool

## Getting Started

1. **Clone the repository:**

   ```
   git clone https://github.com/yourusername/nacoss-memo-generator.git
   cd nacoss-memo-generator
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Configure Supabase:**
   - Create a project on [Supabase](https://supabase.com/).
   - Copy your Supabase URL and public anon key into `src/supabaseClient.js`.

4. **Run the development server:**

   ```
   npm run dev
   ```

5. **Access the app:**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Admins:** Log in via `/admin/login` to access memo creation and editing.
- **View Memos:** Go to `/memos` to see all memos.
- **View Individual Memo:** Click a memo to view its details at `/memos/:reference`.

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

## License

NACOSS

---

**Aim:**
To provide NACOSS with a simple, secure, and efficient tool for generating and managing official memos online.

**Author:**
[Nick Frøst ❄️](https://github.com/nickfrostech "Github Profile")
