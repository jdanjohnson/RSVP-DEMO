# **App Name**: ShowUp

## Core Features:

- Guest Event Details Display: Displays event name, date, time, venue, a vibe description, and a cover photo placeholder to potential attendees.
- Guest RSVP Interaction: Allows guests to enter their first name to RSVP. Upon successful submission, a confirmation message 'You're on the list 🎉' is displayed. This feature handles updating the local guest list.
- Dynamic RSVP Status Display: Shows a live count of how many people have RSVP'd and dynamically updates the interface to display either an 'RSVP' button or a 'Sorry, this event is full' message based on the host's toggle.
- Host Event Configuration: Provides the host with an interface to inline edit key event details such as title, date, and venue, which are saved to local storage.
- Host Guest List View: Presents a live, dynamically updated list of RSVP'd guests in card format, displaying each person's name and the time they joined.
- Host RSVP Control & Headcount: Displays a running headcount of total RSVPs and includes a toggle switch for the host to open or close RSVPs, which instantly affects the guest view.
- Local Data Management: Manages all event details, guest lists, and RSVP statuses exclusively within the browser's local storage, adhering to the 'no real database' constraint.

## Style Guidelines:

- Primary color: Vibrant 'blure') to embody a bold and hyped atmosphere, providing strong contrast against the dark background.
- Background color: A subtle 'Near-Black' (#17141A) with a hint of violet, providing a deep canvas for the energetic primary and accent colors.
- Accent color: 'Hot Pink' (#FF0080) for calls to action, festive highlights, and to enhance the hyped aesthetic, offering striking contrast and flair.
- Headlines and prominent text for the guest page will use 'Space Grotesk' (sans-serif) for a modern, techy, and bold feel. Body text, especially on the Host Dashboard for its clean command center aesthetic, will utilize 'Inter' (sans-serif).
- Modern and expressive icons to reinforce the 'real event app' feel on the guest page and clear, functional icons for the 'clean command centre' of the Host Dashboard.
- A 'mobile-first' design approach will be strictly adhered to. The Guest View will feature an immersive, event-focused layout, while the Host Dashboard will present a clean and organized 'command center' interface.
- Subtle yet energetic animations will be incorporated for interactions such as RSVP confirmation (e.g., 'You're on the list 🎉') and toggle changes, contributing to the 'bold and hype' user experience.