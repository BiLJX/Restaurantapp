import { Dashboard } from "@shared/Dashboard";
import ElevatedContainer from "components/Container/Elevated";
import { Pie } from "react-chartjs-2"
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
export default function PieComponent(){
    const { sales_by_food } = useSelector((state: RootState)=>state.dashboard.data as Dashboard)
    return(
        <ElevatedContainer className="flex flex-1 flex-col card-sdw mt-4 flex-3 ml-4">
            <div className="font-medium text-gray-700 text-lg mb-2">Sales by food</div>
            <div className="w-full flex-1 flex">
                <Pie 
                height="100%"
                width="100%"
                data={{
                    datasets:[{
                        data: sales_by_food.data,
                        backgroundColor: ["#ED254E", "#5B5F97", "#FFC859"],
                    }],
                    labels: sales_by_food.labels,
                }}
                options = {{
                    plugins: {
                        legend: {
                            position: "bottom"
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }}
                />
            </div>
        </ElevatedContainer>
    )
}