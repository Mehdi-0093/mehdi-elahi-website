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
        <ul className="overflow-hidden rounded-lg border border-[#333333] bg-white">
          {events.map((event, i) => (
            <li
              key={event.name}
              className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${
                i > 0 ? "border-t border-[#e5e6e1]" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-[#151515]">
                  <span className="font-mono text-[13px] font-medium text-[#65451d]">
                    {event.name}
                  </span>
                  <span className="mx-2 text-[#808080]">—</span>
                  <span className="text-[14px] text-[#3a4444]">{event.full}</span>
                </p>
                {event.location ? (
                  <p className="mt-0.5 text-[13px] text-[#808080]">
                    {event.location}
                  </p>
                ) : null}
              </div>
              {event.role ? (
                <span
                  className={`self-start whitespace-nowrap rounded-[100px] border px-3 py-1 font-sans text-[12px] font-medium sm:self-auto ${
                    event.role === "Attendee"
                      ? "border-[#65451d] text-[#65451d]"
                      : "border-[#453b60] text-[#453b60]"
                  }`}
                >
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
