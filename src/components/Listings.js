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

export default function Listings() {
  const isLoggedIn = localStorage.getItem("token") != null;
  const toast = useToast();
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);

  function fetchUserListings() {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      
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

      axios
        .get(`https://orange-red-hare-belt.cyclic.app/listings/my-listings?page=1&limit=100`, {
          headers: {
            Authorization: `Bearer ${token}`, // Sending the token in the header
          },
        })
        .then((res) => {
          console.log(res.data);
          setMyListings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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
    fetchUserListings();
  }, []);

  return (
    <div className=" p-10">
      <h1 className="text-2xl font-semibold mb-5 text-gray-500">My Listings</h1>
      <div className="grid grid-cols-4 gap-2">
        {myListings.map((listing) => {
          return (
            <HotelCard
              key={listing._id}
              id={listing._id}
              title={listing.title}
              desc={listing.description}
              buttonText="Edit Listing"
              badge={listing.location}
              price={listing.price}
              imageUrl={listing.image}
              isBooked={false} // Assuming user's listings don't have a booked status. Modify if necessary.
            />
          );
        })}
      </div>
    </div>
  );
}
