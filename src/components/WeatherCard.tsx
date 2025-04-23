import { Theme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterIcon from "@mui/icons-material/Water";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { WeatherIcon } from "./weatherIcon/WeatherIcon";

type Props = {
  day?: string;
  temperature?: number;
  wind?: number;
  humidity?: number;
  rain?: number;
  weatherCode?: number;
  sx?: SxProps<Theme>;
};

export const WeatherCard = ({
  day,
  temperature,
  wind,
  humidity,
  rain,
  weatherCode,
  sx,
}: Props) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <CardContent sx={{ ml: 4 }}>
        <Typography align="center" variant="h2" gutterBottom>
          {day ?? "Now"}
        </Typography>
        <Grid container spacing={2} fontSize={36}>
          <Grid size={{ xs: 5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <ThermostatIcon fontSize="inherit" />
              <Typography fontSize="inherit">
                {temperature ?? "N/D"} °C
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <AirIcon fontSize="inherit" />
              <Typography fontSize="inherit">{wind ?? "N/D"} m/s</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <WaterIcon fontSize="inherit" />
              <Typography fontSize="inherit">{rain ?? "N/D"} mm</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <WaterDropIcon fontSize="inherit" />
              <Typography fontSize="inherit">{humidity ?? "N/D"} %</Typography>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 7 }}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {weatherCode != undefined && (
              <WeatherIcon weatherCode={weatherCode} fontSize={"150px"} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
