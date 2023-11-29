"use client"
import { useRef } from "react"
import { event } from "@/@types/events"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import Image from "next/image"
import Link from "next/link"

const EventItem = ({ event }: { event: event }) => {
    return (
        <div className="w-1/2 sm:w-1/2 lg:w-1/3 2xl:w-1/4 aspect-9/6" key={event.slug}>
            <Link href={`/events/${event.slug}`}>
                <div
                    className="aspect-9/6 h-48 bg-white relative hover:[* > div]:translate-y-0
                                group bg-no-repeat bg-contain bg-center"
                    style={{ backgroundImage: `url(${event.imageSrc})` }}
                >
                    <div
                        className="absolute bg-white border-gray-400 border group-hover:rounded-t-lg
                                   p-1 pb-2 bottom-0 w-full opacity-80 hover:opacity-100
                                   transition-all duration-300 translate-y-14 group-hover:translate-y-0"
                    >
                        <span className="text-primary-green text-xl font-bold">{event.name}</span>
                        <p className="text-md text-primary-blue font-semibold">
                            {event.description}
                        </p>
                        <span className="text-black">
                            {event.startDate} - {event.endDate}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )

    //return (
    //    <Link href={`/events/${event.slug}`}>
    //        <div
    //            className="flex justify-center flex-col bg-white rounded-xl overflow-hidden"
    //            key={event.slug}
    //        >
    //            <div className="w-80 h-32 flex items-center justify-center overflow-hidden p-2">
    //                <Image src={event.imageSrc} alt={event.name} width={320} height={128} />
    //            </div>
    //            <div className="bg-white border-gray-400 border rounded-t-lg p-1">
    //                <span className="text-primary-green text-xl font-bold">{event.name}</span>
    //                <p className="text-md text-primary-blue font-semibold">{event.description}</p>
    //                <span className="text-black">
    //                    {event.startDate} - {event.endDate}
    //                </span>
    //            </div>
    //        </div>
    //    </Link>
    //)
}

export default function EventCarousel({ events }: { events: event[] }) {
    const eventsContainer = useRef<HTMLDivElement | null>(null)

    const handlePrevClick = () => {
        if (!eventsContainer.current) return

        const currentScroll = eventsContainer.current.scrollLeft
        const scrollOffset =
            2 * (eventsContainer.current.children[0].getBoundingClientRect().width + 8)

        eventsContainer.current.scrollTo({
            top: 0,
            left: currentScroll - scrollOffset,
            behavior: "smooth",
        })
    }

    const handleNextClick = () => {
        if (!eventsContainer.current) return

        const currentScroll = eventsContainer.current.scrollLeft
        const scrollOffset =
            2 * (eventsContainer.current.children[0].getBoundingClientRect().width + 8)

        eventsContainer.current.scrollTo({
            top: 0,
            left: currentScroll + scrollOffset,
            behavior: "smooth",
        })
    }

    return (
        <div className="flex flex-row justify-center mt-16">
            <div className="flex align-center mx-2">
                <div className="m-auto">
                    <button className="rounded-full bg-primary-green p-1" onClick={handlePrevClick}>
                        <BiLeftArrow className="w-8 h-8 pr-[10%]" />
                    </button>
                </div>
            </div>
            <div
                ref={eventsContainer}
                className="flex flex-row whitespace-nowrap overflow-auto no-scrollbar gap-2"
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
