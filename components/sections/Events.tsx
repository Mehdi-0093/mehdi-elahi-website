import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { events } from "@/data/events";

export function Events() {
  return (
    <Section
      id="events"
      index="07"
      eyebrow="Events"
      title="Events & Talks"
      intro="Conferences and symposia I've presented at or attended."
    >
      <Reveal>
        <ul className="overflow-hidden rounded-xl border border-border bg-surface">
          {events.map((event, i) => (
            <li
              key={event.name}
              className={`flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-ink">
                  <span className="font-mono text-sm text-accent">
                    {event.name}
                  </span>
                  <span className="text-subtle"> — </span>
                  <span className="text-sm">{event.full}</span>
                </p>
                {event.location ? (
                  <p className="mt-0.5 text-sm text-subtle">{event.location}</p>
                ) : null}
              </div>
              {event.role ? (
                <Badge
                  tone={event.role === "Attendee" ? "default" : "accent"}
                  className="self-start whitespace-nowrap sm:self-auto"
                >
                  {event.role}
                </Badge>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
