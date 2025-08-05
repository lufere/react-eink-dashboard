import "./CircleProgress.scss";
import exerciseLogo from "../assets/exercise.svg";
import workLogo from "../assets/work.svg";
import pendingLogo from "../assets/pending_tasks.svg";

const graydark = "rgb(85, 85, 85)";
const graylight = "rgb(170, 170, 170)";

interface Props {
  icon: string;
  total: number;
  completed: number;
  isTest?: boolean;
}

const getIcon = (name: string) => {
  if (name === "work") return workLogo;
  if (name === "pending") return pendingLogo;
  if (name === "exercise") return exerciseLogo;
};

const buildGradientString = (total: number, completed: number) => {
  let gradientString = `conic-gradient(`;
  const stepSize = 360 / total;
  for (let index = 0; index < total; index++) {
    if (index === 0) {
      gradientString += completed === 0 ? `${graylight} 0deg, ` : `${graydark} 0deg, `;
    } else {
      const deg = stepSize * index;
      if (completed < index)
        gradientString += `${graylight} ${deg}deg, ${graylight} ${deg}deg, `;
      if (completed === index)
        gradientString += `${graydark} ${deg}deg, ${graylight} ${deg}deg, `;
      if (completed > index)
        gradientString += `${graydark} ${deg}deg, ${graydark} ${deg}deg, `;
    }
  }
  const endColor = total === completed ? graydark : graylight;
  gradientString += `${endColor} 360deg)`;
  return gradientString;
};

const CircleProgress = ({ icon, total, completed }: Props) => {
  return (
    <div
      className="circleWrapper"
      style={{
        background: buildGradientString(total, completed),
      }}
    >
      <div className="circleProgressIconWrapper">
        <img src={getIcon(icon)} />
      </div>
    </div>
  );
};

export default CircleProgress;
