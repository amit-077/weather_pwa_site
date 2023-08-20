import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search2Icon } from "@chakra-ui/icons";

const App = () => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");

  const fetchWeather = async (search) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=315229f20acc3a478f784d60efae5b02&units=metric`
      );
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        document.getElementById("searchIcon").click();
      }
    });
  }, []);

  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      bgImage={"url(https://cdn.wallpapersafari.com/4/36/hQqfLv.jpg)"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      display={"flex"}
      justifyContent={"center"}
      fontFamily={"Work Sans"}
    >
      <Box w={"100%"}>
        <Box w={"100%"} textAlign={"center"} mt={"3rem"}>
          <InputGroup w={{ lg: "25%", md: "40%", base: "70%" }} margin={"auto"}>
            <Input
              bgColor={"#D5D8D6"}
              w={"100%"}
              pl={"2rem"}
              pr={"2rem"}
              pt={"1.6rem"}
              pb={"1.6rem"}
              id="inputCity"
              placeholder="Search..."
              _focusVisible={{ outline: "none", border: "none" }}
              border={"none"}
              borderRadius={"1rem"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
            <InputRightElement
              h={"100%"}
              id="searchIcon"
              cursor={"pointer"}
              onClick={() => {
                fetchWeather(search);
              }}
            >
              <Search2Icon />
            </InputRightElement>
          </InputGroup>
          {/* display weather box */}
          {data && (
            <Box
              w={"100%"}
              mt={"3rem"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Box
                w={{ lg: "25%", md: "40%", base: "70%" }}
                bgColor={"#D5D7DB"}
                borderRadius={"1rem"}
                pt={"3rem"}
                pb={"3rem"}
              >
                <Box>
                  <Text fontSize={"1.5rem"} fontWeight={"600"}>
                    {data?.name}
                    <sup
                      style={{
                        paddingLeft: "0.4rem",
                        paddingRight: "0.4rem",
                        marginLeft: "0.2rem",
                        backgroundColor: "orange",
                        color: "#f5f5f5",
                        fontSize: "0.9rem",
                        borderRadius: "1rem",
                      }}
                    >
                      {data?.sys?.country}
                    </sup>
                  </Text>
                </Box>
                <Box mt={"1.5rem"}>
                  <Text fontSize={"4rem"} fontWeight={"700"}>
                    {Math.round(data?.main?.temp)}&deg;c
                  </Text>
                </Box>
                <Box mt={"1rem"} display={"flex"} justifyContent={"center"}>
                  <Image
                    src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                  />
                </Box>
                <Box mt={"1rem"}>
                  <Text textTransform={"uppercase"}>
                    {data?.weather[0]?.main}
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
