import ElevatedContainer from "components/Container/Elevated";
type Props = {
    icon: JSX.Element,
    data: number | string,
    caption: string
}
export default function DashboardPreviewCard({
    icon,
    data,
    caption
}: Props){
    return(
        <ElevatedContainer className="flex flex-col card-sdw space-y-1">
            <div>
                {icon}
            </div>
            <div className="text-xl font-bold">{data}</div>
            <div className="text-xs font-medium">{caption}</div>
        </ElevatedContainer>
    )
}