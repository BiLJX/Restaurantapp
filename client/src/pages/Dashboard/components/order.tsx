import { Dashboard } from "@shared/Dashboard";
import ElevatedContainer from "components/Container/Elevated";
import { Bar } from "react-chartjs-2"
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
export default function OrdersComponent(){
    const { orders } = useSelector((state: RootState)=>state.dashboard.data as Dashboard)
    return(
        <ElevatedContainer className="flex flex-col card-sdw mt-4 flex-1">
            <div className="font-medium text-gray-700 text-lg mb-2">Orders</div>
            <div className="w-full h-full">
                <Bar 
                height="100%"
                width="100%"
                data={{
                    datasets:[{
                        data: orders.data,
                        backgroundColor: "#5B5F97",
                        barThickness: 10
                    }],
                    labels: orders.labels,
                }}
                options = {{
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                color: "#00000010"
                            },
                            ticks: {
                                precision: 0
                            },
                        },
                    },
                }}
                />
            </div>
        </ElevatedContainer>
    )
}