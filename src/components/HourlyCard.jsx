//MUI
import { Box } from "@mui/material";
//Icons
import { TbDropletFilled } from "react-icons/tb";
// Redux
import { useSelector } from "react-redux";

export default function HourlyCard({ data }) {
  const unit = useSelector((state) => state.global.unit);
  return (
    <Box className="hourlyCard">
      <img src={data.condition.icon} alt={data.condition.text} />
      <span className="temp">{unit === "C" ? data.temp_c : data.temp_f} °</span>
      <span className="desc">{data.condition.text}</span>
      <Box mt="auto" display="flex" alignItems="center">
        <TbDropletFilled />
        <span className="desc">{data.humidity}%</span>
      </Box>
      <hr className="divider" />
      <span className="time">{data.time.slice(11, 17)}</span>
    </Box>
  );
}
