import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

export default function HotelCard({
  id,
  imageUrl = "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
  title = "Norway Fjord Adventures",
  badge = "On Sale",
  desc = "With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway",
  buttonText = "Book classic tour now",
  buttonFunc,
  price,
  isBooked,
}) {
  function truncateText(text) {
    const size = 200;
    if (text.length <= size) {
      return text;
    } else {
      return text.substring(0, size) + "...";
    }
  }

  console.log(id);

  return (
    <Card
      className="flex flex-col"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image src={imageUrl} height={160} alt="Norway" />
      </Card.Section>

      <Group className="block" position="left" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="green" variant="light">
          {price}
        </Badge>
        <Badge className="ml-1" color="pink" variant="light">
          {badge}
        </Badge>
      </Group>

      <Text className="mb-4" size="sm" color="dimmed">
        {truncateText(desc)}
      </Text>

      {buttonText != "Edit Listing" ? (
        isBooked ? (
          <Button
            disabled
            onClick={() => {
              buttonFunc(id);
            }}
            className="mt-auto bg-blue-100"
            variant="light"
            color="grape"
            fullWidth
            mt="md"
            radius="md"
          >
            Booked
          </Button>
        ) : (
          <Button
            onClick={() => {
              buttonFunc(id);
            }}
            className="mt-auto bg-blue-100"
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
          >
            {buttonText}
          </Button>
        )
      ) : (
        // if "My Listing Page is Shown"
        <></>
      )}
    </Card>
  );
}
