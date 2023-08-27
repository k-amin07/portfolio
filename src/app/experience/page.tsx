"use client";
// import Link from 'next/link'
// import { FaBriefcase as WorkIcon } from 'react-icons/fa'
// import { FaGraduationCap as SchoolIcon } from 'react-icons/fa'

// const timeline = [
//     { id: '1', type: "Work", className: 'vertical-timeline-element--work', date: 'Feb 2022 - Present', subtitle: 'Backend Engineer', title: 'Bridgelinx', description: 'Developed the backend for Bridgelinx, Pakistan\'s first startup to raise $10M in seed funding', url: 'https://www.bridgelinxpk.com', technologies: ['NodeJS', 'GraphQl', 'Neo4j'] },
//     { id: '2', type: "Work", className: 'vertical-timeline-element--work', date: 'Aug 2021 - Jan 2022', subtitle: 'Software Engineer', title: 'Eastman Enterprises', description: 'Developed backend APIs and integrated various payment methods like Paypal and Stripe', url: 'https://www.linkedin.com/company/eastman-enterprises-pk/?originalSubdomain=pk' },
//     { id: '3', type: "Work", className: 'vertical-timeline-element--work', date: 'Mar 2020 - Aug 2020', subtitle: 'Instructor (Basic Math)', title: 'QUVA', description: 'Coached aspiring GRE candidates from non-math background in basic math skills required for the test', url: 'https://quvapro.com/' },
//     { id: '4', type: "Work", className: 'vertical-timeline-element--work', date: 'Feb 2019 - Jul 2021', subtitle: 'Research Assistant', title: 'LUMS', description: 'Worked on Advention, a tool capable of serving ads relevant to the user over low latency Tor circuits', url: 'https://www.lums.edu.pk' },
//     { id: '5', type: "Work", className: 'vertical-timeline-element--work', date: 'Jan 2019 - May 2019', subtitle: 'Teaching Assistant', title: 'National University of Computer and Emerging Sciences', description: 'Served as a teaching assistant for Object Oriented Programming course at my alma mater', url: 'https://lhr.nu.edu.pk/' },
//     { id: '6', type: "Work", className: 'vertical-timeline-element--work', date: 'Sep 2018 - Dec 2018', subtitle: 'Teaching Assistant', title: 'National University of Computer and Emerging Sciences', description: 'Served as a (unofficial) teaching assistant for Programming Fundamentals course', url: 'https://lhr.nu.edu.pk/' },
//     { id: '7', type: "Work", className: 'vertical-timeline-element--work', date: 'Jun 2018 - Aug 2018', subtitle: 'Intern (Game Development)', title: 'Frag Games', description: 'Developed games for various clients using Unity 3D', url: 'https://lhr.nu.edu.pk/' },
//     { id: '8', type: "education", className: 'vertical-timeline-element--education', date: 'Aug 2014 - Dec 2018', subtitle: 'BS (Computer Science)', title: 'National University of Computer and Emerging Sciences', description: '', url: 'https://lhr.nu.edu.pk', GPA: 2.83 }
// ]

import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

import StarIcon from '@mui/icons-material/Star'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import Link from 'next/link';
import { getTimeline } from '@/lib/timeline';

export default async function page() {
    const timeline = await getTimeline();
    return (
        <div className='experience'>
            <VerticalTimeline lineColor='#3e497a' className='dark:text-white'>
                {timeline.map((item:Timeline) => {
                    return <VerticalTimelineElement
                        className={item.type === 'work' ? 'vertical-timeline-element--work' : 'vertical-timeline-element--education'}
                        date={item.date}
                        iconStyle={{ background: '#3e497a', color: '#fff' }}
                        icon={item.type === 'work' ? <WorkIcon /> : <SchoolIcon />}
                        key={item.sr}
                    >
                        <div style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
                            <Link href={item.url} target='_blank' rel='noreferrer'>
                            <h2 className={item.type === 'work' ? 'vertical-timeline-element--work' : 'vertical-timeline-element--education'}>{item.title}</h2>
                            <h4 className={item.type === 'work' ? 'vertical-timeline-element--work' : 'vertical-timeline-element--education'}>{item.subtitle}</h4>
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