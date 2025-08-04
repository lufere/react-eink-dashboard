import { useEffect, useState } from 'react'
import './App.scss'
import ProgressTitle from './components/ProgressTitle'
import TaskList from './components/TaskList'
import ProgressBar from './components/ProgressBar'
import Timeline from './components/Timeline'
import StopCounter from './components/StopCounter'
import { format } from 'date-fns'

function App() {
  const [latestData, setLatestData] = useState({
    tasksToday: {
      tasks: [],
      progress: 0,
    },
    tasksDailies: {
      tasks: [],
      progress: 0,
    },
    tasksHabits: {
      tasks: [],
      progress: 0,
    },
    deepWork: {
      total: 6,
      completed: 0,
    },
    calendarTasks: [],
    quote: '',
  });

	const getLatestData = async () => {
		const response = await fetch('http://192.168.1.12:3000/obsidian-data');
		const data = await response.json();
    setLatestData(data);
	}


	useEffect(() => {
		getLatestData();
	}, [])

  return (
    <>
      <div className='wrapper' id='export'>
        <div className='header'>
          <div className='title whiteContainer'>{format(new Date(), 'h:mm')}</div>
          <ProgressBar steps={latestData.deepWork.total} completed={latestData.deepWork.completed}/>
          <StopCounter total={102} today={7}/>
          </div>
        <div className='todayContainer tasksContainer'>
          <div className='titleWrapper'>
            <ProgressTitle title="TODAY'S TASKS" progress={latestData.tasksToday.progress}/>
            {/* <div className='title date'> April 14 2025</div> */}
          </div>
          <TaskList tasks={latestData.tasksToday.tasks} limit={7} />
        </div>
        <div className='dailiesContainer tasksContainer'>
          <ProgressTitle title='DAILIES' progress={latestData.tasksDailies.progress}/>
          <TaskList tasks={latestData.tasksDailies.tasks}  limit={6}/>
          <div className='shortBorder' />
        </div>
        <div className='habitsContainer tasksContainer'>
          <ProgressTitle title='HABITS' progress={latestData.tasksHabits.progress}/>
          <TaskList tasks={latestData.tasksHabits.tasks} limit={6}/>

        </div>
        <div className='calendarContainer'>
          <Timeline data={latestData.calendarTasks}/>
        </div>
        <div className='extraContainer'>
          <p className='quote'>
            {/* {quotes[Math.floor(Math.random()*quotes.length)]} */}
            {latestData.quote}
          </p>
        </div>
      </div>
    </>
  )
}

export default App
