import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useNominatimSearch } from "../data/addressRequests";
import theme from "../assets/theme";
import { Address } from "../models/responseModels";

type Props = {
  width: string;
  fontSize: number;
  onAddressSelected: (address: Address) => void;
};

export const AddressSearcher = ({
  width,
  fontSize,
  onAddressSelected,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const textField = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const { data, isFetching, refetch } = useNominatimSearch(text);

  const handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSelection = (address: Address) => {
    setText(address.displayText);
    setVisible(false);
    onAddressSelected(address);
  };

  const handleSearch = () => {
    if (!textField.current || text === "") {
      return;
    }

    setVisible(true);
    refetch();
  };

  useEffect(() => {
    if (!isFetching && !data) {
      setVisible(false);
    }
  }, [isFetching]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        container.current &&
        !container.current.contains(event.target as HTMLElement)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box ref={container} sx={{ width: width, position: "relative" }}>
      <FormControl focused ref={textField} sx={{ width: "100%" }}>
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          sx={{ fontSize: fontSize }}
          placeholder="Enter address"
          onChange={handleTextChanged}
          value={text}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon color="primary" sx={{ fontSize: fontSize }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Paper
        elevation={6}
        sx={{
          position: "absolute",
          mt: "5px",
          zIndex: "2",
          overflowY: "auto",
          width: "100%",
          visibility: visible ? "visible" : "hidden",
        }}
      >
        {isFetching ? (
          <CircularProgress />
        ) : (
          <List>
            {data !== undefined &&
              data.map((address: Address, index) => (
                <div key={index.toString()}>
                  <ListItem onClick={() => handleSelection(address)}>
                    <ListItemText
                      sx={{ overflow: "auto", whiteSpace: "nowrap" }}
                      primary={address.displayText}
                    />
                  </ListItem>
                  {index < data.length - 1 && (
                    <Divider
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                      }}
                      variant="middle"
                      component="li"
                    />
                  )}
                </div>
              ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};
