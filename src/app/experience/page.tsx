"use client";

import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

import StarIcon from '@mui/icons-material/Star'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import Link from 'next/link';
import { notFound } from "next/navigation"

export default async function page() {
    const timelineData = await fetch('http://localhost:3000/api/timeline')
    const timelinePromise: Promise<Timeline[]|undefined> = timelineData.json()
    const timeline: Timeline[] | undefined = await timelinePromise
    if(!timeline) return notFound()
    return (
        <div>
            <VerticalTimeline lineColor='#3e497a' className='dark:text-white'>
                {timeline.map((item:Timeline) => {
                    return <VerticalTimelineElement
                        className={item.type.toLowerCase() === 'work' ? 'vertical-timeline-element--work' : 'vertical-timeline-element--education'}
                        date={item.date}
                        iconStyle={{ background: '#3e497a', color: '#fff' }}
                        icon={item.type === 'work' ? <WorkIcon /> : <SchoolIcon />}
                        key={item.sr.toString()}
                    >
                        <div style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                            <Link href={item.url} target='_blank' rel='noreferrer'>
                            <h2 className={item.type.toLowerCase() === 'work' ? 'vertical-timeline-element--work' : 'vertical-timeline-element--education'}>{item.title}</h2>
                            <h4 className={item.type.toLowerCase() === 'work' ? 'vertical-timeline-element--work' : 'vertical-timeline-element--education'}>{item.subtitle}</h4>
                            <p>{item.description}</p>
                            </Link>
                        </div>
                    </VerticalTimelineElement>

                })}
                <VerticalTimelineElement
                    className='vertical-timeline-element--no-children'
                    iconStyle={{ background: '#3e497a', color: '#fff' }}
                    icon={<StarIcon />}
                />
            </VerticalTimeline>
        </div>
    )
}