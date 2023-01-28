export interface Dashboard{
    dash_board_overview: {
        total_employees_count: number;
        total_orders_count: number;
        total_revenue_count: number;
        total_revenue_month_count: number;
    }
    revenue: {
        data: number[],
        labels: string[]
    },
    orders: {
        data: number[],
        labels: string[]
    },
    sales_by_food: {
        data: number[],
        labels: string[]
    }
}