import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
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
        <ul className="overflow-hidden rounded-none border border-white/10 bg-[#050505]">
          {events.map((event, i) => (
            <li
              key={event.name}
              className={`flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between ${
                i > 0 ? "border-t border-white/10" : ""
              }`}
            >
              <div className="min-w-0">
                <p>
                  <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-white">
                    {event.name}
                  </span>
                  <span className="mx-2 text-white/30">—</span>
                  <span className="text-[14px] text-white/60">{event.full}</span>
                </p>
                {event.location ? (
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-white/40">
                    {event.location}
                  </p>
                ) : null}
              </div>
              {event.role ? (
                <span className="self-start whitespace-nowrap rounded-none border border-white/15 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.08em] text-white/70 sm:self-auto">
                  {event.role}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
