import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Group, TextInput, Textarea } from '@mantine/core';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

export default function AddListingModal({ opened, close }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (token==null){
      // user is not logged in
      // ask to login
      toast({
        title: "You are not logged in",
        description: "Redirecting to login.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      close();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {


    try {
      await axios.post("https://orange-red-hare-belt.cyclic.app/listings", {
        title,
        description,
        location,
        price,
        image
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast({
        title: "Success",
        description: "Listing added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      close();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error adding listing. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
    }
  };
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Add a new listing">
        <div className="space-y-4">
          <TextInput
            className="w-full"
            label="Title"
            placeholder="Enter property title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            className="w-full"
            label="Description"
            placeholder="Enter property description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            className="w-full"
            label="Location"
            placeholder="Enter property location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextInput
            className="w-full"
            label="Price"
            placeholder="Enter property price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
          <TextInput
            className="w-full"
            label="Image URL"
            placeholder="Enter property image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <Group position="right" className="mt-4">
          <Button 
            className="mt-auto bg-blue-100"
            variant="light"
            color="blue"
            mt="md"
            radius="md" 
            onClick={close}
          >Cancel</Button>
          <Button 
            className="mt-auto bg-blue-100"
            variant="light"
            color="blue"
            mt="md"
            radius="md" 
            onClick={handleSubmit}
            isLoading={isLoading}  // Set this prop to show the loading state
          >{isLoading ? 'Adding...' : 'Add Listing'}</Button>
        </Group>
      </Modal>
    </div>
  );
}
