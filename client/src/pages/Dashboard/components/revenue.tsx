import { Dashboard } from "@shared/Dashboard";
import ElevatedContainer from "components/Container/Elevated";
import { Line } from "react-chartjs-2"
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
export default function RevenueComponent(){
    const { revenue } = useSelector((state: RootState)=>state.dashboard.data as Dashboard)
    return(
        <ElevatedContainer className="flex flex-1 flex-col card-sdw ml-4">
            <div className="font-medium text-gray-700 text-lg mb-2">Revenue</div>
            <div className="w-full">
                <Line 
                height="200px"
                width="100%"
                data={{
                    datasets:[{
                        data: revenue.data,
                        tension: 0.3,
                        borderColor: "#ED254E",
                        backgroundColor: (context)=>{
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                            gradient.addColorStop(0, "#ED254E4b");
                            gradient.addColorStop(1, "#FFFFFF00");
                            return gradient;
                        },
                        fill: true,
                    }],
                    labels: revenue.labels,
                    // datasets: [{
                    //     data: [1200, 1300, 1400, 1100, 1000, 900],
                    //     tension: 0.3,
                    //     borderColor: "#ED254E"
                    // }],
                    // labels: ["Jul 1", "Jul 2", "Jul 3", "Jul 4", "Jul 5", "Jul 6",]
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
                        y: {
                            ticks: {
                                // stepSize: 1,
                                precision: 0
                            },
                            grid: {
                                display: false
                            }
                        },
                    },
        
                    
                }}
                
                
                />
            </div>
        </ElevatedContainer>
    )
}