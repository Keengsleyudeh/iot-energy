// import {
//     Flex,
//     Box,
//     FormControl,
//     FormLabel,
//     Input,
//     InputGroup,
//     HStack,
//     Stack,
//     Button,
//     Heading,
//     Text,
//     useColorModeValue,
//     Link,
//     Alert
//   } from '@chakra-ui/react';
//   import React, { useState } from 'react';
// import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
// import { addMeterToUser, createUser, getFirstMeterId } from '../../Utils/Firebase';
// import { useNavigate } from 'react-router-dom';
  
  
//   export default function Signup() {
//     const flexBg = useColorModeValue('gray.50', 'gray.800');
//     const boxBg = useColorModeValue('white', 'gray.700');
//     const auth = getAuth();
//     const navigator = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [fName, setfName] = useState('');
//     const [lName, setlName] = useState('');
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setIsLoading(true);
  
//       try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const newUser = await createUser(fName, lName, userCredential.user.uid);
//         const meterId = await getFirstMeterId("Meter");
        
//         userCredential.user.displayName = fName;
        
//         await addMeterToUser(meterId.id, userCredential.user.uid);
        
//         console.log(meterId.id)

//         navigator("/dashboard");
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };
  


//     return (
//       <Flex
//         minH={'100vh'}
//         align={'center'}
//         justify={'center'}
//         bg={flexBg}>
//         <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
//           <Stack align={'center'}>
//             <Heading fontSize={'4xl'} textAlign={'center'}>
//               Sign up
//             </Heading>
//             <Text fontSize={'lg'} color={'gray.600'}>
//               to enjoy all of our cool features ✌️
//             </Text>
//           </Stack>
//           <Box
//             rounded={'lg'}
//             bg={boxBg}
//             boxShadow={'lg'}
//             p={8}>
            
//             <Stack spacing={4}>
//             <Alert status='error' style={{display: (error) ? 'block' : 'none'}}>
//               {error}
//             </Alert>
//               <HStack>
//                 <Box>
//                   <FormControl id="firstName" isRequired>
//                     <FormLabel>First Name</FormLabel>
//                     <Input type="text" value={fName} onChange={(e) => setfName(e.target.value)}/>
//                   </FormControl>
//                 </Box>
//                 <Box>
//                   <FormControl id="lastName">
//                     <FormLabel>Last Name</FormLabel>
//                     <Input type="text" value={lName} onChange={(e) => setlName(e.target.value)}/>
//                   </FormControl>
//                 </Box>
//               </HStack>
//               <FormControl id="email" isRequired>
//                 <FormLabel>Email address</FormLabel>
//                 <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
//               </FormControl>
//               <FormControl id="password" isRequired>
//                 <FormLabel>Password</FormLabel>
//                 <InputGroup>
//                   <Input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </InputGroup>
//               </FormControl>
//               <Stack spacing={10} pt={2}>
//                 <Button
//                   isLoading={isLoading}
//                   size="lg"
//                   bg={'blue.400'}
//                   color={'white'}
//                   onClick={handleSubmit}
//                   _hover={{
//                     bg: 'blue.500',
//                   }}>
//                   Sign up
//                 </Button>
//               </Stack>
//               <Stack pt={6}>
//                 <Text align={'center'}>
//                   Already a user? <Link href='/auth/signin' color={'blue.400'}>Login</Link>
//                 </Text>
//               </Stack>
//             </Stack>
//           </Box>
//         </Stack>
//       </Flex>
//     );
//   }





import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { addMeterToUser, createUser, getFirstMeterId } from '../../Utils/Firebase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const auth = getAuth();
  const navigator = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = await createUser(fName, lName, userCredential.user.uid);
      const meterId = await getFirstMeterId("Meter");
      
      userCredential.user.displayName = fName;
      
      await addMeterToUser(meterId.id, userCredential.user.uid);
      
      navigator("/dashboard");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      bgGradient={useColorModeValue(
        'linear(to-br, blue.50, gray.50)',
        'linear(to-br, gray.800, blue.900)'
      )}
    >
      <Stack 
        spacing={8} 
        mx={'auto'} 
        w={['100%', '90%', '600px', '700px']}
        py={[6, 8, 12]} 
        px={[4, 6, 8]}
      >
        <Stack align={'center'} spacing={6}>
          <Heading
            fontSize={['3xl', '4xl', '5xl']}
            fontFamily="Comfortaa, sans-serif"
            bgGradient="linear(to-r, blue.400, blue.600)"
            bgClip="text"
            letterSpacing="tight"
          >
            Create your account
          </Heading>
          <Text
            fontSize={['md', 'lg', 'xl']}
            color={useColorModeValue('gray.600', 'gray.300')}
            fontFamily="Comfortaa, sans-serif"
            textAlign="center"
          >
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>

        <Box
          rounded={'xl'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'xl'}
          p={[6, 8, 10]}
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.600')}
          transition="all 0.3s ease"
          _hover={{
            boxShadow: '2xl',
            transform: 'translateY(-2px)'
          }}
        >
          <Stack spacing={6}>
            {error && (
              <Alert 
                status='error' 
                borderRadius="md"
                fontFamily="Comfortaa, sans-serif"
                fontSize={["sm", "md"]}
              >
                {error}
              </Alert>
            )}

            <HStack spacing={4}>
              <FormControl id="firstName" isRequired>
                <FormLabel
                  fontFamily="Comfortaa, sans-serif"
                  fontSize={["sm", "md"]}
                  fontWeight="600"
                >
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  value={fName}
                  onChange={(e) => setfName(e.target.value)}
                  height={["40px", "48px", "56px"]}
                  fontSize={["md", "lg"]}
                  fontFamily="Comfortaa, sans-serif"
                  borderRadius="md"
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 1px blue.400'
                  }}
                  sx={{
                    '&::placeholder': {
                      fontFamily: 'Comfortaa, sans-serif',
                    }
                  }}
                />
              </FormControl>

              <FormControl id="lastName">
                <FormLabel
                  fontFamily="Comfortaa, sans-serif"
                  fontSize={["sm", "md"]}
                  fontWeight="600"
                >
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  value={lName}
                  onChange={(e) => setlName(e.target.value)}
                  height={["40px", "48px", "56px"]}
                  fontSize={["md", "lg"]}
                  fontFamily="Comfortaa, sans-serif"
                  borderRadius="md"
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 1px blue.400'
                  }}
                  sx={{
                    '&::placeholder': {
                      fontFamily: 'Comfortaa, sans-serif',
                    }
                  }}
                />
              </FormControl>
            </HStack>

            <FormControl id="email" isRequired>
              <FormLabel
                fontFamily="Comfortaa, sans-serif"
                fontSize={["sm", "md"]}
                fontWeight="600"
              >
                Email address
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                height={["40px", "48px", "56px"]}
                fontSize={["md", "lg"]}
                fontFamily="Comfortaa, sans-serif"
                borderRadius="md"
                _focus={{
                  borderColor: 'blue.400',
                  boxShadow: '0 0 0 1px blue.400'
                }}
                sx={{
                  '&::placeholder': {
                    fontFamily: 'Comfortaa, sans-serif',
                  }
                }}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel
                fontFamily="Comfortaa, sans-serif"
                fontSize={["sm", "md"]}
                fontWeight="600"
              >
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  height={["40px", "48px", "56px"]}
                  fontSize={["md", "lg"]}
                  fontFamily="Comfortaa, sans-serif"
                  borderRadius="md"
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 1px blue.400'
                  }}
                  sx={{
                    '&::placeholder': {
                      fontFamily: 'Comfortaa, sans-serif',
                    }
                  }}
                />
              </InputGroup>
            </FormControl>

            <Stack spacing={[4, 5, 6]}>
              <Button
                isLoading={isLoading}
                height={["48px", "56px", "64px"]}
                fontSize={["md", "lg", "xl"]}
                bg={'blue.400'}
                color={'white'}
                onClick={handleSubmit}
                fontFamily="Comfortaa, sans-serif"
                fontWeight="600"
                boxShadow="md"
                _hover={{
                  bg: 'blue.500',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                _active={{
                  bg: 'blue.600',
                  transform: 'translateY(0)',
                }}
                transition="all 0.3s ease"
              >
                Sign up
              </Button>

              <Text 
                align={'center'}
                fontSize={["sm", "md"]}
                color={useColorModeValue('gray.600', 'gray.400')}
                fontFamily="Comfortaa, sans-serif"
              >
                Already a user?{' '}
                <Link 
                  href='/auth/signin' 
                  color={'blue.400'}
                  _hover={{
                    color: 'blue.500',
                    textDecoration: 'none'
                  }}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}