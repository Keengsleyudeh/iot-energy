
import { chakra, Link, Stack, Box, Button, useColorModeValue, Text, Flex } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { BsDiscord } from 'react-icons/bs';

const Hero = ({displayName}) => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  
  // Determine greeting based on time of day
  const greeting = hours < 12 ? "Good morning" : 
                  hours < 17 ? "Good afternoon" : 
                  "Good evening";

  return (
    <Box pb={[4, 6, 8]}>
      <Stack
        pos="relative"
        bgGradient={`linear(to-l, purple.600, indigo.500, violet.400)`}
        height={["200px", "250px", "300px"]}
        w="100%"
        transition="all 0.3s ease"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)",
        }}
      >
        {/* Optional: Add animated background elements */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.1}
          backgroundImage="radial-gradient(circle at center, white 1px, transparent 1px)"
          backgroundSize="20px 20px"
        />
      </Stack>

      <Box 
        maxW={["94%", "85%", "3xl"]} 
        p={[4, 6]} 
        isolation="isolate" 
        zIndex={3} 
        mt={["-8rem", "-10rem"]} 
        marginInline="auto"
      >
        <Box
          boxShadow={useColorModeValue(
            '0 10px 25px -5px rgba(160, 174, 192, 0.4)',
            '0 10px 25px -5px rgba(9, 17, 28, 0.7)'
          )}
          bg={useColorModeValue('white', 'gray.800')}
          p={{ base: 6, sm: 8 }}
          overflow="hidden"
          rounded="2xl"
          borderWidth="1px"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          transition="all 0.3s ease"
          _hover={{
            boxShadow: useColorModeValue(
              '0 15px 30px -5px rgba(160, 174, 192, 0.5)',
              '0 15px 30px -5px rgba(9, 17, 28, 0.8)'
            ),
            transform: 'translateY(-2px)'
          }}
        >
          <Stack 
            pos="relative" 
            zIndex={1} 
            direction="column" 
            spacing={[4, 5]} 
            textAlign="left"
          >
            <Flex direction="column" gap={2}>
              <chakra.h1 
                fontSize={["3xl", "4xl"]} 
                lineHeight={1.2} 
                fontWeight="800"
                fontFamily="Nunito, sans-serif"
                bgGradient="linear(to-l, blue.500, cyan.400)"
                bgClip="text"
              >
                IoT Model for Exact Characterisation and Monitoring of Energy
                Consumption in a Heterogeneous Hybrid Environment.
              </chakra.h1>
            </Flex>

            <chakra.h2 
              color="gray.500" 
              fontSize={["lg", "xl"]} 
              maxW="600px" 
              lineHeight={1.4}
              fontFamily="Nunito, sans-serif"
              fontWeight="500"
            >
              Designed and Implemented by Eke, Rosaline Ashinedu Henry; January, 2025.
            </chakra.h2>
            <chakra.h2 
              color="gray.500" 
              fontSize={["lg", "xl"]} 
              maxW="600px" 
              lineHeight={1.4}
              fontFamily="Nunito, sans-serif"
              fontWeight="500"
            >
              School: University of Port Harcourt,  Center for Information and Telecommunication Engineering
            </chakra.h2>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;