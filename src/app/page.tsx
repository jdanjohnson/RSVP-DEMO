
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/hooks/use-event-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GuestPage() {
  const { event, guests, addGuest, hydrated } = useEventStore();
  const [name, setName] = useState('');
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const coverImg = PlaceHolderImages.find(img => img.id === 'event-cover');

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addGuest(name);
      setHasRSVPed(true);
      setName('');
    }
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        {coverImg?.imageUrl ? (
          <Image 
            src={coverImg.imageUrl} 
            alt="Event Cover"
            fill
            className="object-cover brightness-50"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="max-w-xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-2 leading-tight">
              {event.title}
            </h1>
            <div className="flex items-center gap-2 text-primary font-medium">
              <Sparkles size={18} />
              <p className="tracking-wide uppercase text-sm">{event.venue}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-xl mx-auto px-6 mt-8 space-y-10">
        {/* RSVP Stats */}
        <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-white/5 glow-primary">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Joined the hype</p>
            <p className="text-3xl font-headline font-bold">{guests.length}</p>
          </div>
          <div className="flex -space-x-2">
            {[...Array(Math.min(guests.length, 5))].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {guests.length > 5 && (
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                +{guests.length - 5}
              </div>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card border-white/5">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Date</p>
                <p className="text-sm font-medium">{event.date}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-white/5">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Time</p>
                <p className="text-sm font-medium">{event.time}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-headline font-semibold flex items-center gap-2">
            <Sparkles className="text-secondary" size={20} />
            The Vibe
          </h2>
          <p className="text-muted-foreground leading-relaxed italic">
            &ldquo;{event.description}&rdquo;
          </p>
        </div>

        {/* RSVP Interaction */}
        <section className="pt-8 pb-12">
          {!event.isOpen ? (
            <div className="text-center p-8 border-2 border-dashed border-white/10 rounded-3xl">
              <p className="text-xl font-headline font-bold text-muted-foreground mb-2">Sorry, this event is full</p>
              <p className="text-sm text-muted-foreground">Catch us at the next one! ✨</p>
            </div>
          ) : hasRSVPed ? (
            <div className="text-center p-8 bg-secondary/10 border border-secondary/20 rounded-3xl animate-in zoom-in-95 duration-500">
              <p className="text-2xl font-headline font-bold text-secondary mb-2">You're on the list 🎉</p>
              <p className="text-sm text-muted-foreground">See you at {event.venue}!</p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground ml-1">Your Name</label>
                <Input 
                  placeholder="What should we call you?" 
                  className="h-14 bg-card border-white/10 rounded-2xl text-lg focus:ring-secondary focus:border-secondary transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white text-lg font-headline font-bold glow-secondary"
              >
                RSVP Now
              </Button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
