import { Box, Paper, Typography } from "@mui/material";
import { useFetchWeather } from "../data/weatherRequests";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";
import theme from "../assets/theme";
import { WeatherCard } from "../components/WeatherCard";
import { AddressSearcher } from "../components/AddressSearcher";
import { useState } from "react";
import { Address } from "../models/responseModels";

export const Home = () => {
  const [address, setAddress] = useState<Address | undefined>();
  const { data } = useFetchWeather(address);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "calc(100% - 40px)",
          margin: "20px 20px 5px 20px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "2",
            mr: "5px",
          }}
        >
          <Box ml={4}>
            <Typography variant="h2">Address</Typography>
            <AddressSearcher
              width="95%"
              fontSize={36}
              onAddressSelected={(e) => setAddress(e)}
            />
          </Box>
        </Paper>
        <WeatherCard
          temperature={data?.current.temperature}
          wind={data?.current.windSpeed}
          rain={data?.current.rain}
          humidity={data?.current.humidity}
          weatherCode={data?.current.weatherCode}
          sx={{
            flex: "1",
            ml: "5px",
          }}
        />
      </Box>
      <Paper
        sx={{
          flex: "1",
          width: "calc(100% - 40px)",
          marginTop: "5px",
          marginBottom: "20px",
        }}
      >
        <Box ml={4}>
          <Typography variant="h2">Temperature</Typography>
          {data && (
            <LineChart
              height={350}
              xAxis={[
                {
                  data: data?.hourly.time,
                  scaleType: "time",
                  valueFormatter: (value) => {
                    const time = dayjs(value);
                    const formatted = time.format("HH:mm");
                    return `${
                      formatted === "00:00" ? time.format("DD.MM") : formatted
                    }`;
                  },
                },
              ]}
              yAxis={[{ valueFormatter: (value) => `${value}°C` }]}
              series={[
                {
                  data: data.hourly.temperature,
                  color: theme.palette.primary.main,
                  showMark: false,
                  valueFormatter: (v) =>
                    v != null
                      ? `${new Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 2,
                        }).format(v)}°C`
                      : "",
                },
              ]}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};
