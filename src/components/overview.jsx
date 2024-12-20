import {
  chakra,
  Container,
  Stack,
  HStack,
  VStack,
  Flex,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import EducativeImage from "../images/educative.png";

const overviewList = [
  {
    id: 1,
    label: "Unplug Idle Electronics",
    subLabel: "Stops phantom power drain.",
  },
  {
    id: 2,
    label: "Switch to LED Lights",
    subLabel: "Brighter light, less energy used.",
  },
  {
    id: 3,
    label: "Adjust Thermostat Strategically",
    subLabel: "Small changes save on heating/cooling.",
  },
  {
    id: 4,
    label: "Take Shorter Showers",
    subLabel: "Saves hot water & energy.",
  },
  {
    id: 5,
    label: "Air Dry Clothes (when possible)",
    subLabel: "Skip the energy-guzzling dryer.",
  },
];
const OverviewSection = () => {
  return (
    <Container maxW="6xl" py={10} mt={"100px"} fontSize={["sm", "md"]} 
    color="gray.600" 
    fontWeight="medium"
    fontFamily="Comfortaa, sans-serif">
      <chakra.h2 fontSize="4xl" fontWeight="bold" textAlign="center" mb={10}>
        How to manage your energy usage
      </chakra.h2>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 3 }}
        justifyContent="space-around"
        alignItems="center"
      >
        <VStack
          spacing={4}
          alignItems="flex-start"
          mb={{ base: 5, md: 0 }}
          maxW="md"
        >
          {overviewList.map((data) => (
            <Box key={data.id}>
              <HStack spacing={2}>
                <Flex
                  fontWeight="bold"
                  boxShadow="md"
                  color="white"
                  bg="blue.400"
                  rounded="full"
                  justifyContent="center"
                  alignItems="center"
                  w={10}
                  h={10}
                >
                  {data.id}
                </Flex>
                <Text fontSize="xl">{data.label}</Text>
              </HStack>
              <Text fontSize="md" color="gray.500" ml={12}>
                {data.subLabel}
              </Text>
            </Box>
          ))}
        </VStack>
        <Image
          boxSize={{ base: "auto", md: "lg" }}
          objectFit="contain"
          src={EducativeImage}
          rounded="lg"
        />
      </Stack>
    </Container>
  );
};

export default OverviewSection;
