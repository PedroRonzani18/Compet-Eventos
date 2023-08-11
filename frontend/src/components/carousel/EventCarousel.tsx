'use client'
import { event } from "@/@types/events";
import { Carousel,TItemComponent } from "@codelife-ui/react";
import Link from "next/link";

const EventItem: TItemComponent<event> = ({ description, name, slug }) => {
  return (
    <Link href={`/events/${slug}`}>
      <div key={slug}>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default function EventCarousel({ events }: { events: event[] }) {
  return (
    <div>
      <Carousel<event> ItemComponent={EventItem} items={events} resourceName="events" />
      <Link href="/add-event">
        Adicionar evento
      </Link>
    </div>
  );
}