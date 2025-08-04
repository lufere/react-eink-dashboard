import icon from '../assets/hourglass.svg'
import './StopCounter.scss'

interface Props {
    total: number
    today: number
}

const StopCounter = ({total, today}: Props) => {
    return (
    <div className='stopCounterWrapper'>
        <p className='title'>{today}</p>
        <img src={icon} className='stopLogo' />
        {/* <div className='stopCounter'> */}
            <p className='title'>{total}</p>
            {/* <p className=''>{today}</p> */}
        {/* </div> */}
      </div>
    )
}

export default StopCounter