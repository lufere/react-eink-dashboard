import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import ProgressTitle from './components/ProgressTitle'
import TaskList from './components/TaskList'
import ProgressBar from './components/ProgressBar'
import StopCounter from './components/StopCounter'
import quotes from './quotes.json'
import Timeline from './components/Timeline'
import timelineData from './timeline.json'
import html2canvas from 'html2canvas'
import { v4 as uuidv4 } from 'uuid';

const tasksToday = [
  {title: 'Test script to restore S3', completed: false, tags: ['blocker']},
  {title: 'Color coding for calendar', completed: false, tags: ['expired']},
  {title: 'Portabilidad Telcel => ATT GO ', completed: false, tags: []},
  {title: 'Ask Steve for change and when will it be available to test on UAT ', completed: false, tags: ['']},
  {title: 'Corte cabello', completed: false, tags: ['']},
  {title: 'Cita dentista', completed: false, tags: ['']},
  {title: 'Mute walking pad', completed: false, tags: ['']},
]

const tasksDailies = [
  {title: 'Morning Protein', completed: false, tags: []},
  {title: 'Supplements', completed: false, tags: []},
  {title: 'Reading', completed: false, tags: []},
  {title: 'Career learning', completed: false, tags: []},
  {title: 'Gym compound', completed: false, tags: []},
  {title: 'Cardio', completed: false, tags: []},
  {title: 'Floss', completed: false, tags: []},
  {title: 'Shower', completed: false, tags: []},
]

const tasksHabits = [
  {title: '3k steps ', completed: false, tags: []},
  {title: '30 mins Free learning', completed: false, tags: []},
  {title: 'Gym accessories', completed: false, tags: []},
  {title: '10 mins cleaning', completed: false, tags: []},
  {title: '10 mins piano', completed: false, tags: []},
]

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
  });
  // const [test, setTest] = useState(0)

  const exportImage = async () => {
    const element = document.getElementById('export');

    const canvas = await html2canvas(element!, {
      backgroundColor: '#ffffff',
      scale: 1,
    })

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    link.href = dataUrl;
    link.download = 'export.png';
    link.click();
  }

  const sendImage = async (uuid: string) => {
    const element = document.getElementById('export');

    const canvas = await html2canvas(element!, {
      backgroundColor: '#ffffff',
      scale: 1,
    })

    canvas.toBlob(async(blob) => {
      const formData = new FormData();
      formData.append('image', blob!, 'canvas.png');

      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      await fetch('http://localhost:3000/uuid', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ uuid }),
      });
  
      const result = await res.json();
      console.log(result)
    }, 'image/png')
  }

  const getLatestData = useCallback(async () => {
    console.log('getLatestData')
    // console.log(test)
    const response = await fetch('http://localhost:3000/obsidian-data');
    console.log({response})
    const data = await response.json();
    console.log({data})
    const newData = JSON.stringify(data);
    if(newData !== JSON.stringify(latestData)) {
      // setTest(prev => {
      //   console.log("CHANGING TEST INSIDE INTERVAL")
      //   return 777
      // })
      console.log('data changed');
      console.log('endpoint data', newData);
      console.log('previously stored data', latestData)
      setLatestData(data);
      setTimeout(() => {
        const uuid = uuidv4();
        sendImage(uuid);
      }, 1000)
    }
  }, [
    // test,
    latestData])

  useEffect(() => {
    getLatestData();
    // setTimeout(getLatestData, 10000)
    const intervalId = setInterval(getLatestData, 15* 1000);
    return () => {
      if(intervalId) clearInterval(intervalId)
    }
  }, [getLatestData])

  // useEffect(() => {
  //   console.log('test in useEffect', test)
  // }, [test])

  return (
    <>
      <div className="screen screen-no-bleed" id='export'>
        <div className="view view--full">
          <div className="layout">
            <div className='wrapper'>
              <div className='header'>
                <div className='title whiteContainer'>2:14</div>
                <ProgressBar steps={latestData.deepWork.total} completed={latestData.deepWork.completed}/>
                <StopCounter total={102} today={7}/>
                </div>
              <div className='todayContainer tasksContainer'>
                <div className='titleWrapper'>
                  <ProgressTitle title="TODAY'S TASKS" progress={latestData.tasksToday.progress}/>
                  {/* <div className='title date'> April 14 2025</div> */}
                </div>
                <TaskList tasks={latestData.tasksToday.tasks} limit={6} />
              </div>
              <div className='dailiesContainer tasksContainer'>
                <ProgressTitle title='DAILIES' progress={latestData.tasksDailies.progress}/>
                <TaskList tasks={latestData.tasksDailies.tasks}  limit={5}/>
                <div className='shortBorder' />
              </div>
              <div className='habitsContainer tasksContainer'>
                <ProgressTitle title='HABITS' progress={latestData.tasksHabits.progress}/>
                <TaskList tasks={latestData.tasksHabits.tasks} limit={5}/>

              </div>
              <div className='calendarContainer'>
                <Timeline data={latestData.calendarTasks}/>
              </div>
              <div className='extraContainer'>
                <p className='quote'>
                  {quotes[Math.floor(Math.random()*quotes.length)]}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="title_bar">
            <img className="image" src="https://usetrmnl.com/images/plugins/trmnl--render.svg" />
            <span className="title">Plugin Title</span>
            <span className="instance">Instance Title</span>
          </div> */}
        </div>
      </div>
      <button onClick={exportImage}>EXPORT</button>
      <button onClick={() => sendImage('manualUUID')}>SEND</button>
      {/* <button onClick={() => setTest(prev => {
        const newValue = prev + 1;
        console.log({newValue})
        return newValue
      })}>{`Change ${test}`}</button> */}
      {/* <button onClick={() => setTest(prev => prev+1)}>{`Change ${test}`}</button> */}
      <button onClick={getLatestData}>{`Get Data`}</button>
      <div>{JSON.stringify(latestData)}</div>
    </>
  )
}

export default App
