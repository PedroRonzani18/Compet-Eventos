import { event } from "@/@types/events"
import EventCarousel from "@/components/carousel/EventCarousel"

async function getEvents() {
    const events: event[] = [
        {
            description: "Description of Event 1",
            name: "Event 1",
            slug: "event-1",
            imageSrc: "/logoInterpet.png",
            startDate: "15/11/2023",
            endDate: "25/11/2023",
        },
        {
            description: "Description of Event 2",
            name: "Event 2",
            slug: "event-2",
            imageSrc: "/kirby-inhale-png-clipart.jpg",
            startDate: "15/11/2023",
            endDate: "25/11/2023",
        },
    ]
    return events
}
async function Events() {
    const events = await getEvents()
    return <EventCarousel events={events} />
}

export default Events
