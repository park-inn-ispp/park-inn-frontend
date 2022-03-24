import { TailSpin } from "react-loader-spinner";
import { colors } from "../theme";

export default function Loading(){
    return (
        <TailSpin heigth="100%" width="100%" color={colors.fivth} ariaLabel="loading" />
    )
}