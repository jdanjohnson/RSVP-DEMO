
"use client";

import { useState, useEffect } from 'react';
import { Guest, EventDetails } from '@/lib/types';

const STORAGE_KEY_EVENT = 'showup_event_details';
const STORAGE_KEY_GUESTS = 'showup_guest_list';

const DEFAULT_EVENT: EventDetails = {
  title: "Electric Nights: The Launch",
  date: "2024-12-31",
  time: "21:00",
  venue: "The Violet Vault",
  description: "Join us for an immersive audio-visual experience where the beat never stops and the vibes are unmatched. Dress code: Neon Hype.",
  isOpen: true,
};

export function useEventStore() {
  const [event, setEvent] = useState<EventDetails>(DEFAULT_EVENT);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedEvent = localStorage.getItem(STORAGE_KEY_EVENT);
    const savedGuests = localStorage.getItem(STORAGE_KEY_GUESTS);

    if (savedEvent) {
      setEvent(JSON.parse(savedEvent));
    }
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY_EVENT, JSON.stringify(event));
    }
  }, [event, hydrated]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY_GUESTS, JSON.stringify(guests));
    }
  }, [guests, hydrated]);

  const updateEvent = (updates: Partial<EventDetails>) => {
    setEvent(prev => ({ ...prev, ...updates }));
  };

  const addGuest = (name: string) => {
    const newGuest: Guest = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      timestamp: Date.now(),
    };
    setGuests(prev => [newGuest, ...prev]);
  };

  const removeGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const toggleRSVPStatus = () => {
    setEvent(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return {
    event,
    guests,
    updateEvent,
    addGuest,
    removeGuest,
    toggleRSVPStatus,
    hydrated
  };
}
