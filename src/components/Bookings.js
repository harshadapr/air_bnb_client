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
import HotelCard from "./HomePage/Card";

export default function Bookings() {
  const isLoggedIn = localStorage.getItem("token") != null;
  const toast = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

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
        .get(`http://localhost:3000/listings/booked`, {
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
  }, []);

  return (
    <div className=" p-10">
        <h1 className="text-2xl font-semibold mb-5 text-gray-500">My Bookings</h1>
        <div className="grid grid-cols-4 gap-2">
      {bookings.map((hotel) => {
        const isBooked = bookings.some((booking) => booking._id === hotel._id);

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
            isBooked={isBooked}
          />
        );
      })}
    </div>
    </div>
  );
}
