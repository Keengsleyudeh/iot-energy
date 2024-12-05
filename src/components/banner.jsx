import { chakra, Stack, useColorModeValue, Container, Link, Box, Button, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const Banner = ({handleShowData, chartIsLoading}) => {
  const [chosenDate, setChosenDate] = useState(null);
  const toast = useToast();


  return (
    <Box width={"100%"}>
        <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={5}
        alignItems={{ base: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        rounded="lg"
        boxShadow="md"
        width={"80%"}
        p={"20px"}
        margin={"20px auto"}
        >
        <Box >
            <chakra.h1 fontSize="3xl" marginBottom={"20px"} lineHeight={1.2} fontWeight="bold">
            Get more indepth Report!
            </chakra.h1>
            <chakra.h2
            fontSize={"medium"}
            lineHeight={1.2}
            fontWeight="regular"
            >
            Click a period and select the learn more button to see your data.
            </chakra.h2>
        </Box>
        <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: 0, sm: 3 }}
            w={{ base: '100%', sm: 'auto' }}
        >
            <Input type={"date"} height={"50px"} value={chosenDate} onChange={(e) => setChosenDate(e.target.value)}></Input>
            <Button
            onClick={(e) => {
              if(!chosenDate){
                  toast({
                    title: "Invalid Date Input",
                    description: "Please choose a valid date to view your data",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                  });
              }else{
                handleShowData(chosenDate);
              }
              
            }}
            color="white"
            variant="solid"
            size="lg"
            rounded="md"
            mb={{ base: 2, sm: 0 }}
            p={"0px 30px"}
            lineHeight={1}
            bgGradient="linear(to-l, #0ea5e9,#2563eb)"
            _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#2563eb)' }}
            isLoading={chartIsLoading}
            >
            Learn More
            </Button>
        </Stack>
        </Stack>
    </Box>
  );
};

export default Banner;