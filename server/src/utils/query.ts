import moment from "moment";
export const getToday = () => {
    const now = moment();
    const start = now.startOf("day").toDate();
    const end = now.endOf("day").toDate();
    return {
        $gte: start,
        $lt: end
    }
}

export const getLast30Day = () => {
   return {
    $gte: moment().subtract(30, "days").toDate(),
    
   }
}