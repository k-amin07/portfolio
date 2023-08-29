"use client";

import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { FaExternalLinkAlt } from 'react-icons/fa'
import 'react-vertical-timeline-component/style.min.css'

import StarIcon from '@mui/icons-material/Star'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import Link from 'next/link';
import { Suspense } from 'react'
import { useEffect, useState } from "react";
import Loading from './loading';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Page() {
    const [isLoading, setLoading] = useState(true)
    const [timeline, settimeline] = useState<Timeline[] | null>(null);
    useEffect(() => {
        fetch(`/api/timeline`, {
            method: 'GET',
            headers: {
                Authentication: API_KEY || ''
            }
        })
            .then((res) => res.json())
            .then((data) => {
                settimeline(data);
                setLoading(false);
            });
    }, []);
    
    if (isLoading) return <Loading />
    if (!timeline) {
        return (
            <section>
                <div>
                    <VerticalTimeline lineColor='#3e497a' className='dark:text-white'>
                        <VerticalTimelineElement
                            className='vertical-timeline-element--no-children'
                            iconStyle={{ background: '#3e497a', color: '#fff' }}
                            icon={<StarIcon />}
                        />
                    </VerticalTimeline>
                </div>
            </section>
        )
    }
    return (
        <section>
            <Suspense fallback={<Loading />}>
                <div>
                    <VerticalTimeline lineColor='#3e497a' className='dark:text-white'>
                        {timeline.map((item: Timeline) => {
                            return <VerticalTimelineElement
                                className={item.type.toLowerCase() === 'work' ? 'vertical-timeline-element--work' : 'vertical-timeline-element--education'}
                                date={item.date}
                                iconStyle={{ background: '#3e497a', color: '#fff' }}
                                icon={item.type === 'work' ? <WorkIcon /> : <SchoolIcon />}
                                key={item.sr.toString()}
                            >
                                <div style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                                    <h2 className={item.type.toLowerCase() === 'work' ? 'vertical-timeline-element--work' : 'vertical-timeline-element--education'}>
                                        <div className='flex flex-row justify-center'>
                                            {item.title}&nbsp;
                                            {item.url ? <Link href={item.url} target='_blank' rel='noreferrer'>
                                                <FaExternalLinkAlt size={8} />
                                            </Link> : null}
                                        </div>
                                    </h2>
                                    <Link href={'/experience/' + item._id}>
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
            </Suspense>
        </section>
    )
}