import { event } from "@/@types/events";
import EventCarousel from "@/components/carousel/EventCarousel";

async function getEvents() {
  const events:event[] = [
    {
      description:"lucas legal",
      name:"joinha",
      slug:"event-1"
    },
    {
      description:"pedro animal",
      name:"portilho de portilho ronzani",
      slug:"event-2"
    },
    {
      description:"henricao semigod.",
      name:"programador de eletrica",
      slug:"event-2"
    }
  ]
  return events
}
async function Events() {
  const events = await getEvents()
  return ( 
    <EventCarousel events={events}/>
   );
}

export default Events;
