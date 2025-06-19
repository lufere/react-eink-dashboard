import './ProgressBar.scss'

interface Props {
    steps: number
    completed: number
}

interface StepProps {
    isDone: boolean
    isStart: boolean
    isEnd: boolean
}

const Step = ({isDone, isStart, isEnd}: StepProps) => {
    return (
        <div className={`step ${isDone ? 'complete' : 'incomplete'} ${isStart && 'progressStart'} ${isEnd && 'progressEnd'}`}></div>
    )
}

const ProgressBar = ({steps, completed}: Props) => {
    const stepArray = [...Array(steps).keys()]
    return (
        <div className='progressBar'>
            {stepArray.map(step => 
                <Step
                    isStart={step === 0}
                    isEnd={step === steps - 1}
                    isDone={step < completed}
                />
            )}
        </div>
    )
}

export default ProgressBar