import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export type Dayjs = dayjs.Dayjs;
export default dayjs;
