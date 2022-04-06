import { TailSpin } from "react-loader-spinner";
import { colors } from "../theme";

export default function Loading(){
    return (
        <div className="loading-div">
            <div className="loading-gif">
                <TailSpin  heigth="100vh" width="100vw" color={colors.fivth} ariaLabel="loading" />
            </div>
        </div>
    )
}