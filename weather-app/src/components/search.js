import React, { useEffect, useState, useReducer } from "react";
import { Box, Input, Heading, Button, Text } from "@chakra-ui/react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ON_CHANGE": {
      const newValue = action.payload;
      return newValue;
    }
  }
};

const Search = () => {
  const [state, dispatch] = useReducer(reducer, "");
  const [fetchedData, setFetchedData] = useState(null);

  const REACT_APP_API_KEY = "f8b104a6e81f640ff7c2dcf2d7fa59b9";
  const REACT_APP_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${REACT_APP_API_KEY}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        const response = await fetch(REACT_APP_API_URL);
        const data = await response.json();
        const item = data.main;
        setFetchedData(item);
      };
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box textAlign="center" py="20" px="4">
      <Heading mb="8" color="black">
        Weather App!
      </Heading>
      <form type="submit" onSubmit={handleSubmit}>
        <Input
          size="lg"
          maxW="md"
          mr="2"
          type="text"
          placeholder="Enter city"
          onChange={(e) =>
            dispatch({ type: "ON_CHANGE", payload: e.target.value })
          }
          value={state}
        />
        {!fetchedData ? (
          <Text fontSize="xl">Please enter valid city</Text>
        ) : (
          <div>
            <Text fontSize="xl" fontWeight="medium" py="2">
              Temperature:{" "}
              <Text fontWeight="bold">
                {(fetchedData.temp - 273).toFixed(1)}°C
              </Text>
            </Text>
            <Text fontSize="xl" fontWeight="medium" py="2">
              Feels like:{" "}
              <Text fontWeight="bold">
                {(fetchedData.feels_like - 273).toFixed(1)}°C
              </Text>
            </Text>
          </div>
        )}
      </form>
    </Box>
  );
};

export default Search;
