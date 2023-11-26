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
        {
            description: "Description of Event 3",
            name: "Event 3",
            slug: "event-3",
            imageSrc: "/logoInterpet.png",
            startDate: "15/11/2023",
            endDate: "25/11/2023",
        },
        {
            description: "Description of Event 4",
            name: "Event 4",
            slug: "event-4",
            imageSrc: "/kirby-inhale-png-clipart.jpg",
            startDate: "15/11/2023",
            endDate: "25/11/2023",
        },
        {
            description: "Description of Event 5",
            name: "Event 5",
            slug: "event-5",
            imageSrc: "/logoInterpet.png",
            startDate: "15/11/2023",
            endDate: "25/11/2023",
        },
        {
            description: "Description of Event 6",
            name: "Event 6",
            slug: "event-6",
            imageSrc: "/kirby-inhale-png-clipart.jpg",
            startDate: "15/11/2023",
            endDate: "25/11/2023",
        },
        {
            description: "Description of Event 7",
            name: "Event 7",
            slug: "event-7",
            imageSrc: "/logoInterpet.png",
            startDate: "15/11/2023",
            endDate: "25/11/2023",
        },
        {
            description: "Description of Event 8",
            name: "Event 8",
            slug: "event-8",
            imageSrc: "/kirby-inhale-png-clipart.jpg",
            startDate: "15/11/2023",
            endDate: "25/11/2023",
        },
        {
            description: "Description of Event 9",
            name: "Event 9",
            slug: "event-9",
            imageSrc: "/logoInterpet.png",
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
