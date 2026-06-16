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
        <ul className="overflow-hidden rounded-[8px] bg-[#f0eee6]">
          {events.map((event, i) => (
            <li
              key={event.name}
              className={`flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between ${
                i > 0 ? "border-t border-[#d1cfc5]" : ""
              }`}
            >
              <div className="min-w-0">
                <p>
                  <span className="font-mono text-[13px] uppercase tracking-[0.04em] text-[#141413]">
                    {event.name}
                  </span>
                  <span className="mx-2 text-[#b0aea5]">—</span>
                  <span className="text-[14px] text-[#5e5d59]">{event.full}</span>
                </p>
                {event.location ? (
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-[#87867f]">
                    {event.location}
                  </p>
                ) : null}
              </div>
              {event.role ? (
                <span className="self-start whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.08em] text-[#d97757] sm:self-auto">
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
