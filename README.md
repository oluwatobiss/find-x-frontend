# Find X Website

This is the official website of the Find X game. Find X is a photo tagging game ([Where's Wally?](https://en.wikipedia.org/wiki/Where%27s_Wally%3F)) that presents users with a busy and crowded illustration containing many different people, objects, or places. The User's task is to find specified characters hidden in the illustration.

## Pages

- **Homepage:**
  - Welcome user
  - User login/signup/logout UI
  - Game configuration
  - Play UI
  - Dashboard navigation (admin-only)
- **Game page:**
  - No navbar
  - Image only
- **Signup:**
  - First name
  - Last name
  - Username (unique)
  - Email (unique)
  - Password
  - Admin confirmation
- **Login:**
  - Email
  - Password
- **Dashboard (admin-only):**
  - Images link
  - Leaderboard link
  - Users link
- **Images (admin-only):**
  - List all images
  - UI to add new image
  - UI to edit each image
  - UI to delete each item
- **Add Image (admin-only):**
  - Name (unique)
  - URL (unique)
  - Sample image confirmation
  - Item to find information: Name, Image's URL and Position (center-x, center-y, start-x, start-y, end-x, end-y)
  - UI to add more items
  - UI to delete each item
  - UI to submit image
- **Update Image (admin-only):**
  - Name (unique)
  - URL (unique)
  - Sample image confirmation
  - Item to find information: Name, Image's URL and Position (center-x, center-y, start-x, start-y, end-x, end-y)
  - UI to add more items
  - UI to delete each item
  - UI to submit image
- **Leaderboard:**
  - Top 10 records
  - Play Game UI
- **Users (admin-only):**
  - List all users
  - UI to edit each user's data
  - UI to delete each user's data
- **Update User (admin-only):**
  - First name
  - Last name
  - Username (unique)
  - Email (unique)
  - Admin confirmation

## Users and privileges

- **Guest:** Unauthenticated user (Low-level privileges)
- **Gamer:** Authenticated user (Mid-level privileges)
- **Admin:** An administrator (All privileges)

| Privilege                | Guest | Gamer | Admin |
| ------------------------ | ----- | ----- | ----- |
| Create an account        | Yes   | Yes   | Yes   |
| Play game                | Yes   | Yes   | Yes   |
| Add image                | No    | No    | Yes   |
| Update images            | No    | No    | Yes   |
| Access all images        | No    | Yes   | Yes   |
| Access leaderboard       | No    | Yes   | Yes   |
| Access dashboard         | No    | No    | Yes   |
| Add name to leaderboard  | No    | Yes   | Yes   |
| Add score to leaderboard | Yes   | Yes   | Yes   |
| Manage users             | No    | No    | Yes   |
| Delete accounts          | No    | No    | Yes   |

## Technologies used

- Astro
- React
- Tailwind CSS
- React timer hook

## Usage

> **Note:** [The backend](https://github.com/oluwatobiss/find-x-backend) must be running for this website to function appropriately.

1. Clone the project

```bash
git clone https://github.com/oluwatobiss/find-x-frontend.git
```

2. Navigate into the project repo

```bash
cd find-x-frontend
```

3. Install dependencies

```bash
npm install
```

4. Create an environment variable file

```bash
touch .env
```

5. Define the project's environment variables

```
PUBLIC_BACKEND_URI="http://localhost:3000"
```

6. Start the server

```bash
npm run dev
```

## Live Demo

- https://find-x.netlify.app/

## Related Repos

- [Find X Rest API](https://github.com/oluwatobiss/find-x-backend)
