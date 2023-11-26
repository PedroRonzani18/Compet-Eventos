"use client"
import { useRef } from "react"
import { event } from "@/@types/events"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import Image from "next/image"
import Link from "next/link"

const EventItem = ({ event }: { event: event }) => {
    return (
        <Link href={`/events/${event.slug}`}>
            <div
                className="flex justify-center flex-col bg-white rounded-xl overflow-hidden"
                key={event.slug}
            >
                <div className="w-80 h-32 flex items-center justify-center overflow-hidden p-2">
                    <Image src={event.imageSrc} alt={event.name} width={320} height={128} />
                </div>
                <div className="bg-white border-gray-400 border rounded-t-lg p-1">
                    <span className="text-primary-green text-xl font-bold">{event.name}</span>
                    <p className="text-md text-primary-blue font-semibold">{event.description}</p>
                    <span className="text-black">
                        {event.startDate} - {event.endDate}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default function EventCarousel({ events }: { events: event[] }) {
    const eventsContainer = useRef<HTMLDivElement | null>(null)

    const handlePrevClick = () => {
        if (!eventsContainer.current) return

        const currentScroll = eventsContainer.current.scrollLeft
        const scrollOffset = 2 * eventsContainer.current.children[0].getBoundingClientRect().width

        eventsContainer.current.scrollTo({
            top: 0,
            left: currentScroll - scrollOffset,
            behavior: "smooth",
        })
    }

    const handleNextClick = () => {
        if (!eventsContainer.current) return

        const currentScroll = eventsContainer.current.scrollLeft
        const scrollOffset = 2 * eventsContainer.current.children[0].getBoundingClientRect().width

        eventsContainer.current.scrollTo({
            top: 0,
            left: currentScroll + scrollOffset,
            behavior: "smooth",
        })
    }

    return (
        <div className="flex flex-row justify-center">
            <div className="flex align-center mx-2">
                <div className="m-auto">
                    <button className="rounded-full bg-primary-green p-1" onClick={handlePrevClick}>
                        <BiLeftArrow className="w-8 h-8 pr-[10%]" />
                    </button>
                </div>
            </div>
            <div
                ref={eventsContainer}
                className="flex flex-row whitespace-nowrap overflow-auto no-scrollbar"
            >
                {events.map(event => (
                    <EventItem event={event} />
                ))}
            </div>
            <div className="flex align-center mx-2">
                <div className="m-auto">
                    <button className="rounded-full bg-primary-green p-1" onClick={handleNextClick}>
                        <BiRightArrow className="w-8 h-8 pl-[10%]" />
                    </button>
                </div>
            </div>
        </div>
    )
}
