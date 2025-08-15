import { addMinutes, differenceInMinutes, format } from 'date-fns'
import './Timeline.scss'
import { useEffect } from 'react'

interface TimelineItem {
    message: string
    start: string
    end: string
}

interface Props {
    data: TimelineItem[]
}

interface CalendarItemProps {
    message: string
    isCurrent: boolean
    start: string
    end: string
}

const compareMinutes = (a: string, b: string) => {
    const aHours = parseInt(a.split(':')[0])
    const aMins = parseInt(a.split(':')[1])
    const bHours = parseInt(b.split(':')[0])
    const bMins = parseInt(b.split(':')[1])

    return differenceInMinutes(
        new Date(new Date().setHours(aHours, aMins)),
        new Date(new Date().setHours(bHours, bMins))
    )
}

const CalendarItem = ({message, isCurrent, start, end}: CalendarItemProps) => {
    const startingHours = new Date().getHours()
    const startingMinutes = Math.floor(new Date().getMinutes()/10)*10
    // const calendarStart = '8:00'
    // const calendarStart = '22:00'
    const calendarStart = `${startingHours}:${startingMinutes}`
    console.log({calendarStart})
    const startH = parseInt(start.split(':')[0])
    const startM = parseInt(start.split(':')[1])
    const endH = parseInt(end.split(':')[0])
    const endM = parseInt(end.split(':')[1])
    const calendarH = parseInt(calendarStart.split(':')[0])
    const calendarM = parseInt(calendarStart.split(':')[1])

    const duration = differenceInMinutes(
        new Date(new Date().setHours(endH, endM)),
        new Date(new Date().setHours(startH, startM))
    )

    const startOffset = (differenceInMinutes(
        new Date(new Date().setHours(startH, startM)),
        new Date(new Date().setHours(calendarH, calendarM))
    )/10)+1

    const size = Math.ceil(duration/10);

    if(!message) return <div 
        className='emptyCalendarItem'
        style={{ 
            height: `${24*size}px`,
            gridRow: ` ${startOffset} / ${startOffset+size}`
        }}
    />

    return (
        <div 
            className={`calendarItem ${isCurrent && 'current'}`}
            style={{ 
                height: `${24*size}px`,
                gridRow: ` ${startOffset} / ${startOffset+size}`
            }}
        >
            <p className='timeLabel'>{start}</p>
            <p>{message}</p>
            <p className='timeLabelEnd'>{end}</p>
        </div>
    )
}

const MOCK_TASKS = [
    {
        message: 'Morning Routine',
        start: '8:10',
        end: '8:30',
    },
    // {
    //     message: 'Night routine',
    //     start: '23:40',
    //     end: '23:50',
    // },
    {
        message: 'Midnight',
        start: '0:10',
        end: '0:30',
    },
    {
        message: '22:00 test test test test',
        start: '22:00',
        end: '22:30',
    },
    {
        message: '22:30',
        start: '22:30',
        end: '23:00',
    },
    {
        message: '23:00',
        start: '23:00',
        end: '23:20',
    },
    {
        message: '23:30',
        start: '23:30',
        end: '24:00',
    },
        {
        message: '24:00',
        start: '24:00',
        end: '24:30',
    },
    // {
    //     message: '24:30',
    //     start: '24:30',
    //     end: '01:00',
    // },
]

const Timeline = ({data}: Props) => {
    const visibleTasks = data
    .map(task => {
        const [ hours, minutes ] = task.start.split(':')
        const taskStart = new Date(new Date().setHours(parseInt(hours), parseInt(minutes)))
        const calendarStartH = new Date().getHours()
        const calendarStartM = Math.floor(new Date().getMinutes()/10)*10
        const calendarStart = new Date(new Date().setHours(calendarStartH, calendarStartM))
        // const calendarStart = new Date(new Date().setHours(22, 0))
        // const calendarEndH = calendarStartH +2
        // const calendarEndM = calendarStartM
        // const calendarEnd = new Date(new Date().setHours(calendarEndH, calendarEndM))
        const calendarEnd = addMinutes(calendarStart, 150);
        if(
            // +taskStart >= +calendarStart && 
            +taskStart <= +calendarEnd
        ) {
            const [ endHours, endMinutes ] = task.end.split(':')
            const taskEnd = new Date(new Date().setHours(parseInt(endHours), parseInt(endMinutes)))
            if (+taskEnd > +calendarEnd) {
                return {
                    ...task,
                    end: format(calendarEnd, 'H:mm'),
                    isVisible: +taskStart < +calendarEnd,
                }
            } 
            if(+taskEnd > +calendarStart) {
                if(+taskStart < +calendarStart) {
                    return {
                        ...task,
                        start: format(calendarStart, 'H:mm'),
                        isVisible: true,
                    }
                }
                return {
                    ...task,
                    isVisible: true,
                }
            }
            // if(+taskStart >= +calendarStart) {
            //     return {
            //         ...task,
            //         isVisible: true,
            //     }
            // }
        }
        return {
            ...task,
            isVisible: false,
        }
    })
    .filter(a => a.isVisible)

    useEffect(() => console.log(visibleTasks), [visibleTasks])

    return (
        <div className='timelineContainer'>
            {
                visibleTasks.map(task => <CalendarItem message={task.message} start={task.start} end={task.end} isCurrent={false}/>)
            }
            {/* <CalendarItem message={''} start={'8:00'} end={'8:10'} isCurrent={false}/> */}
            {/* <CalendarItem message={'Morning Routine'} start={'8:10'} end={'8:30'} isCurrent={false}/> */}
            {/* <CalendarItem message={'Daily Meeting'} isCurrent={true} start={'8:30'} end={'9:00'} /> */}
            {/* <CalendarItem message={''} isCurrent={false} start={'9:00'} end={'9:10'} /> */}
            {/* <CalendarItem message={'Write Daily Note'} isCurrent={false} start={'9:00'} end={'9:20'} /> */}
            {/* <CalendarItem message={''} isCurrent={false} start={'9:20'} end={'9:40'} /> */}
            {/* <CalendarItem message={'Meditation'} isCurrent={false} start={'9:40'} end={'9:50'} /> */}
            {/* <CalendarItem message={''} isCurrent={false} start={'9:50'} end={'10:00'} /> */}
            {/* <CalendarItem message={'Late Night'} isCurrent={false} start={'23:50'} end={'24:20'} /> */}

            {/* <CalendarItem message={''} isCurrent={false} start={'10:50'} end={'11:00'} /> */}
            {/* <CalendarItem message={'Item 5'} isCurrent={false}/> */}
        </div>
    )
}

export default Timeline