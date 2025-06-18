import './ProgressTitle.scss'

interface Props {
    title: string
    progress: number
}

const ProgressTitle = ({ title, progress }: Props) => {

    return (
        <div className='progressTitleWrapper'>
            <div className='title progressTitle'>{title}</div>
            <div className='progressTitleBar' style={{width: `${progress}%`}}></div>
        </div>
    )
 }

 export default ProgressTitle