import './TaskList.scss'
import expiredLogo from '../assets/warning.svg'
import blockerLogo from '../assets/block.svg'
import exclamationLogo from '../assets/exclamation.svg'
import sunLogo from '../assets/sun.svg'
import nightLogo from '../assets/moon.svg'
import recursLogo from '../assets/repeat.svg'

interface TaskItemProps {
    message: string
    tags: string[]
}

interface Task {
    title: string
    completed: boolean
    tags?: string[]
}

interface Props {
    tasks: Task[]
    limit?: number
}

const TaskItem = ({message, tags}: TaskItemProps) => {
    const getIcon = () => {
        if (tags.includes('#blocker')) return <img src={blockerLogo} className='taskItemIcon'/>
        if (tags.includes('important')) return <img src={exclamationLogo} className='taskItemIcon'/>
        if (tags.includes('morning')) return <img src={sunLogo} className='taskItemIcon'/>
        if (tags.includes('night')) return <img src={nightLogo} className='taskItemIcon'/>
        if (tags.includes('recurs')) return <img src={recursLogo} className='taskItemIcon'/>
        if (tags.includes('expired')) return <img src={expiredLogo} className='taskItemIcon'/>
        return <div className='circle'/>
    }
    
    return (
        <div className='taskItemWrapper'>
            <div className='taskIconWrapper'>
                {getIcon()}
            </div>
            <p>{message}</p>
        </div>
    )
}

const TaskList = ({tasks, limit}: Props) => {
    const hasOverflow = limit ? tasks.length > limit : false

    const filteredTasks = tasks.filter((task, item) => {
        return !task.completed && (limit ? item < limit : true)
    })

    return (
        <div className='taskListWrapper'>
            {filteredTasks.map((task) => (
                <TaskItem message={task.title} tags={task?.tags || []}/>
            ))}
            {hasOverflow && <p>{`...${tasks.length - (limit || 0)} more tasks`}</p>}
        </div>
    )
}

export default TaskList