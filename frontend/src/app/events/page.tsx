import { event } from "@/@types/events";
import EventCarousel from "@/components/carousel/EventCarousel";

async function getEvents() {
  const events:event[] = [
    {
      description:"akjsdhalisdhads",
      name:"event 1",
      slug:"event-1"
    },
    {
      description:"akjsdhalisdhads",
      name:"event 2",
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
