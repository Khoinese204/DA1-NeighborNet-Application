import index from "@/app";
import BackButton from "../icons/BackButton"
import { SvgProps } from "react-native-svg";

const icons = {
    backButton: BackButton
}
type IconName = keyof typeof icons; // 'backButton'
type IconProps = {
    name: IconName,
} & SvgProps

const Icon = ({name, ...props}: IconProps) => {
    const IconComponent = icons[name];
    return (
        <IconComponent
            strokeWidth={props.strokeWidth}
            
            {...props}
        ></IconComponent>
    )
    
}

export default Icon