import { Box } from "@mui/material";
import theme from "../../assets/theme";
import "./weather-icons.css";
import { weatherCodeToIconMapper } from "./weatherCodeToIconMapper";

type Props = {
  weatherCode: number;
  fontSize: string;
};

export const WeatherIcon = ({ weatherCode, fontSize }: Props) => {
  return (
    <Box
      component="i"
      className={`wi ${weatherCodeToIconMapper(weatherCode)}`}
      sx={{
        color: theme.palette.primary.main,
        fontSize: fontSize,
      }}
    />
  );
};
