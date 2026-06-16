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
        <ul className="overflow-hidden rounded-[40px] bg-[#cfdaf5] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
          {events.map((event, i) => (
            <li
              key={event.name}
              className={`flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between ${
                i > 0 ? "border-t border-[#000000]/15" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-[#000000]">
                  <span className="font-mono text-[13px] font-medium text-[#000000]">
                    {event.name}
                  </span>
                  <span className="mx-2 text-[#797776]">—</span>
                  <span className="text-[14px] tracking-[-0.28px] text-[#4e4d4d]">{event.full}</span>
                </p>
                {event.location ? (
                  <p className="mt-0.5 font-mono text-[12px] text-[#797776]">
                    {event.location}
                  </p>
                ) : null}
              </div>
              {event.role ? (
                <span className="self-start whitespace-nowrap rounded-[100px] border border-[#000000] px-3 py-1 font-mono text-[12px] font-medium text-[#000000] sm:self-auto">
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
