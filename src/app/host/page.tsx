
"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/hooks/use-event-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Settings, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function HostDashboard() {
  const { event, guests, updateEvent, removeGuest, toggleRSVPStatus, hydrated } = useEventStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!hydrated) return null;

  return (
    <div className="min-h-screen pb-20 pt-20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-headline font-bold text-primary">Host Dashboard</h1>
            <p className="text-muted-foreground mt-1">Command centre for {event.title}</p>
          </div>
          
          <div className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-white/5">
            <div className="flex flex-col items-center border-r border-white/10 pr-4">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Guests</p>
              <p className="text-2xl font-headline font-bold text-secondary">{guests.length}</p>
            </div>
            <div className="flex items-center gap-3 pl-2">
              <div className="flex flex-col items-end">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">RSVPs Open</p>
                <p className="text-sm font-medium">{event.isOpen ? 'Active' : 'Closed'}</p>
              </div>
              <Switch checked={event.isOpen} onCheckedChange={toggleRSVPStatus} />
            </div>
          </div>
        </div>

        {/* Inline Editing */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold flex items-center gap-2">
              <Settings className="text-primary" size={20} />
              Event Details
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-full border-white/10 hover:bg-white/5"
            >
              {isEditing ? 'Finish Editing' : 'Edit Details'}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold ml-1">Event Title</label>
                {isEditing ? (
                  <Input 
                    value={event.title} 
                    onChange={(e) => updateEvent({ title: e.target.value })}
                    className="bg-card border-white/10 rounded-xl"
                  />
                ) : (
                  <p className="text-lg font-semibold bg-white/5 p-3 rounded-xl">{event.title}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground uppercase font-bold ml-1">Date</label>
                  {isEditing ? (
                    <Input 
                      type="date"
                      value={event.date} 
                      onChange={(e) => updateEvent({ date: e.target.value })}
                      className="bg-card border-white/10 rounded-xl"
                    />
                  ) : (
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                      <Calendar size={14} className="text-primary" />
                      <p className="text-sm">{event.date}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground uppercase font-bold ml-1">Time</label>
                  {isEditing ? (
                    <Input 
                      type="time"
                      value={event.time} 
                      onChange={(e) => updateEvent({ time: e.target.value })}
                      className="bg-card border-white/10 rounded-xl"
                    />
                  ) : (
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                      <Clock size={14} className="text-primary" />
                      <p className="text-sm">{event.time}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold ml-1">Venue</label>
                {isEditing ? (
                  <Input 
                    value={event.venue} 
                    onChange={(e) => updateEvent({ venue: e.target.value })}
                    className="bg-card border-white/10 rounded-xl"
                  />
                ) : (
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                    <MapPin size={14} className="text-primary" />
                    <p className="text-sm font-medium">{event.venue}</p>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold ml-1">Description / Vibe</label>
                {isEditing ? (
                  <Textarea 
                    value={event.description} 
                    onChange={(e) => updateEvent({ description: e.target.value })}
                    className="bg-card border-white/10 rounded-xl h-24"
                  />
                ) : (
                  <div className="flex gap-2 bg-white/5 p-3 rounded-xl min-h-[5.5rem]">
                    <FileText size={14} className="text-primary mt-1 shrink-0" />
                    <p className="text-sm italic line-clamp-3">{event.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Guest List */}
        <section className="space-y-4">
          <h2 className="text-xl font-headline font-bold flex items-center gap-2">
            <Users className="text-primary" size={20} />
            Live Guest List
          </h2>

          {guests.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-3xl">
              <Users size={40} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Waiting for the first RSVP...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guests.map((guest) => (
                <Card key={guest.id} className="bg-card border-white/5 hover:border-primary/30 transition-all group overflow-hidden">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold">
                        {guest.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{guest.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          Joined {formatDistanceToNow(guest.timestamp)} ago
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeGuest(guest.id)}
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
