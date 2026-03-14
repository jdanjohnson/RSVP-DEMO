# ShowUp | Vision Hack LA AI Workshop

ShowUp is a modern, high-energy RSVP application designed for exclusive events. This instance is specifically tailored for the **Vision Hack LA AI Workshop**, providing a seamless experience for both organizers and attendees.

## 🚀 Features

- **Guest RSVP**: A sleek, mobile-responsive interface for guests to register their attendance and see the growing hype.
- **Host Dashboard**: A dedicated command center at `/host` to manage event details (title, date, venue, description) and toggle RSVP status.
- **Live Guest List**: Real-time tracking of attendees with the ability for hosts to manage the list.
- **Premium UI**: Built with a "Deep Space" glassmorphism aesthetic using Tailwind CSS and ShadCN UI.
- **Persistence**: Event data and guest lists are persisted locally, ensuring your setup survives page refreshes.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Ready**: Integrated with [Genkit](https://firebase.google.com/docs/genkit) for future AI-driven features like automated event descriptions or image generation.

## 🏁 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the App**:
   - **Guest RSVP Page**: [http://localhost:9002/](http://localhost:9002/)
   - **Host Dashboard**: [http://localhost:9002/host](http://localhost:9002/host)

## 📁 Project Structure

- `src/app/page.tsx`: The main RSVP landing page for guests.
- `src/app/host/page.tsx`: The administrative dashboard for the event host.
- `src/hooks/use-event-store.ts`: The core state logic managing event data and guest lists.
- `src/components/layout/Navbar.tsx`: Shared navigation between the guest and host views.
