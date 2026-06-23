'use client';

import { useCallback, useState } from 'react';
import { CheckCircle2, Loader2, MapPin, Send } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [locating, setLocating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } },
          );
          const data = await res.json();
          const parts = [
            data.address?.city || data.address?.town || data.address?.village,
            data.address?.state,
            data.address?.country,
          ].filter(Boolean);
          setLocation(parts.join(', ') || `${pos.coords.latitude}, ${pos.coords.longitude}`);
        } catch {
          setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        } finally {
          setLocating(false);
        }
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={cn(' bg-white p-8 text-center md:p-12', className)}>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#eef8ff]">
          <CheckCircle2 className="h-7 w-7 text-[#0a0a0a]" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-[#04101f]">Thanks, {name.split(' ')[0]}.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-balance text-[#12304a]/72">
          The Auxify team received your request and will route it to the right person.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName('');
            setEmail('');
            setPhone('');
            setLocation('');
            setDescription('');
          }}
          className="mt-6 text-sm font-medium text-[#0a0a0a] underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn(' bg-white p-6 md:p-8', className)}>
      <div className="mb-6 md:mb-8">
        <h3 className="text-lg font-semibold tracking-tight text-[#04101f]">Send Auxify a message</h3>
        <p className="mt-1 text-sm text-[#12304a]/72">Fill in the details and we&apos;ll reach out shortly.</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-sm font-medium text-[#04101f]">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="contact-name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              required
              className="h-11"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-sm font-medium text-[#04101f]">
              Work email <span className="text-destructive">*</span>
            </label>
            <Input
              id="contact-email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
              className="h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="contact-phone" className="text-sm font-medium text-[#04101f]">
              Phone <span className="text-destructive">*</span>
            </label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              required
              className="h-11"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-location" className="text-sm font-medium text-[#04101f]">
              Company location
            </label>
            <div className="relative">
              <Input
                id="contact-location"
                type="text"
                placeholder="City, State"
                autoComplete="address-level2"
                className="h-11 pr-11"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                type="button"
                onClick={fetchLocation}
                disabled={locating}
                aria-label="Detect my location"
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md p-2 text-[#12304a]/60 transition-colors hover:text-[#0a0a0a] disabled:pointer-events-none"
                title="Detect my location"
              >
                {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-description" className="text-sm font-medium text-[#04101f]">
            How can we help? <span className="text-destructive">*</span>
          </label>
          <textarea
            id="contact-description"
            placeholder="Tell us about your customer channels, workflow, current tools, volume, and where AI should hand off to your team."
            required
            rows={4}
            className={cn(
              'placeholder:text-muted-foreground border-input dark:bg-input/30 w-full resize-none rounded-md border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            )}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="hidden text-xs text-[#12304a]/65 sm:block">We typically respond within the same business day.</p>
        <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto">
          <Send className="mr-2 h-4 w-4" />
          Send Request
        </Button>
      </div>
    </form>
  );
}
