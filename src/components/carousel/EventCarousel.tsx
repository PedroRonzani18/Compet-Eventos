"use client"
import { event } from "@/@types/events"
import { Carousel, TItemComponent } from "@codelife-ui/react"
import Image from "next/image"
import Link from "next/link"

const EventItem: TItemComponent<event> = ({
    description,
    name,
    slug,
    imageSrc,
    startDate,
    endDate,
}) => {
    return (
        <Link href={`/events/${slug}`}>
            <div
                className="flex justify-center flex-col bg-white rounded-xl overflow-hidden"
                key={slug}
            >
                <div className="w-80 h-32 flex items-center justify-center overflow-hidden p-2">
                    <Image src={imageSrc} alt={name} width={320} height={128} />
                </div>
                <div className="bg-white border-gray-400 border rounded-t-lg p-1">
                    <span className="text-primary-green text-xl font-bold">{name}</span>
                    <p className="text-md text-primary-blue font-semibold">{description}</p>
                    <span className="text-black">
                        {startDate} - {endDate}
                    </span>
                </div>
            </div>
        </Link>
    )
}
export default function EventCarousel({ events }: { events: event[] }) {
    return <Carousel<event> ItemComponent={EventItem} items={events} resourceName="events" />
}
