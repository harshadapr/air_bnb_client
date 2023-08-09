import { Tabs, TextInput, Button, RangeSlider } from "@mantine/core";
import {
  IconBuildingPavilion,
  IconRadar,
  IconCoinRupee,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HotelCard from "./Card";

export default function SearchBar() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [hotels, setHotels] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([0, 100]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const isLoggedIn = localStorage.getItem("token") != null;
  const toast = useToast();
  const navigate = useNavigate();

  function fetchBookedListing() {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      // If there's no token, it might be better to redirect to login or handle it appropriately
      if (!token) {
        toast({
          title: "Token not found",
          description: "Please login again.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      // if logged in then call the booking endpoint
      axios
        .get(`https://orange-red-hare-belt.cyclic.app/listings/booked`, {
          headers: {
            Authorization: `Bearer ${token}`, // Sending the token in the header
          },
        })
        .then((res) => {
          console.log(res.data);
          setBookings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleButtonClick(id) {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      // If there's no token, it might be better to redirect to login or handle it appropriately
      if (!token) {
        toast({
          title: "Token not found",
          description: "Please login again.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      // if logged in then call the booking endpoint
      axios
        .post(
          `https://orange-red-hare-belt.cyclic.app/listings/book/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Sending the token in the header
            },
          }
        )
        .then((res) => {
            fetchBookedListing();
          toast({
            title: "Hurray!! Listing booked",
            description: "Thanks for booking with us",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error booking this listing",
            description: "Some error occured!.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    } else {
      // ask to login
      toast({
        title: "You are not logged in",
        description: "Redirecting to login.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  useEffect(() => {
    fetchBookedListing();
    fetch("https://orange-red-hare-belt.cyclic.app/listings/prices")
      .then((response) => response.json())
      .then((data) => setPriceRange(data))
      .catch((error) => console.error("Failed fetching price range:", error));
  }, []);

  const fetchHotels = async (searchType) => {
    setIsLoading(true);
    let endpoint = "";
    switch (searchType) {
      case "name":
        endpoint = `https://orange-red-hare-belt.cyclic.app/listings/search?title=${title}`;
        break;
      case "location":
        endpoint = `https://orange-red-hare-belt.cyclic.app/listings/search?location=${location}`;
        break;
      case "price":
        endpoint = `https://orange-red-hare-belt.cyclic.app/listings/search?minPrice=${selectedPrice[0]}&maxPrice=${selectedPrice[1]}`;
        break;
      default:
        break;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Failed fetching hotels:", error);
    } finally {
      setIsLoading(false); // End loading when fetching completes
    }
  };

  //   fetch some hotels when the component is loaded
  useEffect(() => {
    fetchHotels("name");
  }, []);

  return (
    <Tabs radius="xl" variant="pills" color="teal" defaultValue="name">
      <Tabs.List className="mb-10">
        <Tabs.Tab value="name" icon={<IconBuildingPavilion size="0.8rem" />}>
          Name
        </Tabs.Tab>
        <Tabs.Tab value="location" icon={<IconRadar size="0.8rem" />}>
          Location
        </Tabs.Tab>
        <Tabs.Tab value="price" icon={<IconCoinRupee size="0.8rem" />}>
          Price
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="name" pt="xs" className="">
        <div className="flex gap-3">
          <TextInput
            className="flex-1"
            placeholder="Enter hotel name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            radius="xl"
            size="lg"
          />
          <Button
            variant="outline"
            color="teal"
            radius="xl"
            size="lg"
            loading={isLoading}
            onClick={() => fetchHotels("name")}
          >
            Search Hotels
          </Button>
        </div>
        <h2 className="my-10 text-2xl text-gray-400">Results</h2>
        <div className="grid grid-cols-4 gap-2">
          {hotels.map((hotel) => {
            const isBooked = bookings.some(
              (booking) => booking._id === hotel._id
            );

            return (
              <HotelCard
                key={hotel._id}
                id={hotel._id}
                title={hotel.title}
                desc={hotel.description}
                buttonText="Book Now"
                badge={hotel.location}
                price={hotel.price}
                imageUrl={hotel.image}
                buttonFunc={handleButtonClick}
                isBooked={isBooked}
              />
            );
          })}
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="location" pt="xs">
        <div className="flex gap-3">
          <TextInput
            className="flex-1"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            radius="xl"
            size="lg"
          />
          <Button
            variant="outline"
            color="teal"
            radius="xl"
            size="lg"
            loading={isLoading}
            onClick={() => fetchHotels("location")}
          >
            Search Hotels
          </Button>
        </div>
        <h2 className="my-10 text-2xl text-gray-400">Results</h2>
        <div className="grid grid-cols-4 gap-2">
          {hotels.map((hotel) => {
            const isBooked = bookings.some(
              (booking) => booking._id === hotel._id
            );

            return (
              <HotelCard
                key={hotel._id}
                id={hotel._id}
                title={hotel.title}
                desc={hotel.description}
                buttonText="Book Now"
                badge={hotel.location}
                price={hotel.price}
                imageUrl={hotel.image}
                buttonFunc={handleButtonClick}
                isBooked={isBooked}
              />
            );
          })}
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="price" pt="xs">
        <div className="flex gap-3 items-center">
          <div className="flex-1 py-1">
            <h2 className="text-lg">Select price range</h2>
            <RangeSlider
              thumbSize={14}
              mt="xl"
              min={priceRange.min}
              max={priceRange.max}
              defaultValue={[priceRange.min, priceRange.max]}
              onChange={setSelectedPrice}
            />
          </div>
          <Button
            variant="outline"
            color="teal"
            radius="xl"
            size="lg"
            loading={isLoading}
            onClick={() => fetchHotels("price")}
          >
            Search Hotels
          </Button>
        </div>
        <h2 className="my-10 text-2xl text-gray-400">Results</h2>
        <div className="grid grid-cols-4 gap-2">
          {hotels.map((hotel) => {
            const isBooked = bookings.some(
              (booking) => booking._id === hotel._id
            );

            return (
              <HotelCard
                key={hotel._id}
                id={hotel._id}
                title={hotel.title}
                desc={hotel.description}
                buttonText="Book Now"
                badge={hotel.location}
                price={hotel.price}
                imageUrl={hotel.image}
                buttonFunc={handleButtonClick}
                isBooked={isBooked}
              />
            );
          })}
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}
