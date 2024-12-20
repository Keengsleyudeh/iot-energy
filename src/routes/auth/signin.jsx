// import {
//     Flex,
//     Box,
//     FormControl,
//     FormLabel,
//     Input,
//     Checkbox,
//     Stack,
//     Link,
//     Button,
//     Heading,
//     Text,
//     Alert,
//     useColorModeValue,
//   } from '@chakra-ui/react';
//   import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
// import { useState } from 'react';
  
//   export default function Signin() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const auth = getAuth();

//     async function handleLogin(){
//         setIsLoading(true);
        
//         try{
//             const user = await signInWithEmailAndPassword(auth, email, password);
//         }catch(err){
//             setError(err.message);
//             setIsLoading(false);
//         }
//     }

//     return (
//       <Flex
//         minH={'100vh'}
//         align={'center'}
//         justify={'center'}
//         bg={useColorModeValue('gray.50', 'gray.800')}>
//         <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
//           <Stack align={'center'}>
//             <Heading fontSize={'4xl'}>Sign in to your account</Heading>
//             <Text fontSize={'lg'} color={'gray.600'}>
//               to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
//             </Text>
//           </Stack>
//           <Alert status='error' style={{display: (error) ? 'block' : 'none'}}>
//               {error}
//             </Alert>
//           <Box
//             rounded={'lg'}
//             bg={useColorModeValue('white', 'gray.700')}
//             boxShadow={'lg'}
//             p={8}>
            
//             <Stack spacing={4}>
//               <FormControl id="email">
//                 <FormLabel>Email address</FormLabel>
//                 <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
//               </FormControl>
//               <FormControl id="password">
//                 <FormLabel>Password</FormLabel>
//                 <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
//               </FormControl>
//               <Stack spacing={10}>
//                 <Stack
//                   direction={{ base: 'column', sm: 'row' }}
//                   align={'start'}
//                   justify={'space-between'}>
//                   <Checkbox>Remember me</Checkbox>
//                   <Link href='/auth/signup' color={'blue.400'}>Signup Instead</Link>
//                 </Stack>
//                 <Button
//                   bg={'blue.400'}
//                   color={'white'}
//                   onClick={handleLogin}
//                   isLoading={isLoading}
//                   _hover={{
//                     bg: 'blue.500',
//                   }}>
//                   Sign in
//                 </Button>
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
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Alert,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  async function handleLogin() {
    setIsLoading(true);
    
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

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
        w={['100%', '90%', '600px', '700px']} // Increased width for desktop
        py={[6, 8, 12]} 
        px={[4, 6, 8]}
      >
        <Stack align={'center'} spacing={6}>
          <Heading
            fontSize={['3xl', '4xl', '5xl']} // Larger heading for desktop
            fontFamily="Comfortaa, sans-serif"
            bgGradient="linear(to-r, blue.400, blue.600)"
            bgClip="text"
            letterSpacing="tight"
          >
            Sign in to your account
          </Heading>
          <Text
            fontSize={['md', 'lg', 'xl']} // Larger text for desktop
            color={useColorModeValue('gray.600', 'gray.300')}
            fontFamily="Comfortaa, sans-serif"
            textAlign="center"
          >
            to enjoy all of our cool{' '}
            <Link 
              color={'blue.400'}
              _hover={{
                color: 'blue.500',
                textDecoration: 'none'
              }}
            >
              features
            </Link>{' '}
            ✌️
          </Text>
        </Stack>

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

        <Box
          rounded={'xl'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'xl'}
          p={[6, 8, 10]} // Increased padding for desktop
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.600')}
          transition="all 0.3s ease"
          _hover={{
            boxShadow: '2xl',
            transform: 'translateY(-2px)'
          }}
        >
          <Stack spacing={6}> {/* Increased spacing for desktop */}
            <FormControl id="email">
              <FormLabel 
                fontFamily="Comfortaa, sans-serif"
                fontSize={["sm", "md"]} // Larger label for desktop
                fontWeight="600"
              >
                Email address
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                size="lg"
                height={["40px", "48px", "56px"]} // Taller input for desktop
                fontSize={["md", "lg"]} // Larger font for desktop
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

            <FormControl id="password">
              <FormLabel
                fontFamily="Comfortaa, sans-serif"
                fontSize={["sm", "md"]} // Larger label for desktop
                fontWeight="600"
              >
                Password
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                size="lg"
                height={["40px", "48px", "56px"]} // Taller input for desktop
                fontSize={["md", "lg"]} // Larger font for desktop
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

            <Stack spacing={[4, 5, 6]}> {/* Increased spacing for desktop */}
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
                pt={2}
              >
                <Checkbox
                  fontFamily="Comfortaa, sans-serif"
                  fontSize={["sm", "md"]} // Larger font for desktop
                  colorScheme="blue"
                  size={["md", "lg"]} // Larger checkbox for desktop
                >
                  Remember me
                </Checkbox>
                <Link 
                  href='/auth/signup'
                  color={'blue.400'}
                  fontFamily="Comfortaa, sans-serif"
                  fontSize={["sm", "md"]} // Larger font for desktop
                  _hover={{
                    color: 'blue.500',
                    textDecoration: 'none'
                  }}
                >
                  Signup Instead
                </Link>
              </Stack>

              <Button
                bg={'blue.400'}
                color={'white'}
                onClick={handleLogin}
                isLoading={isLoading}
                size="lg"
                height={["48px", "56px", "64px"]} // Taller button for desktop
                fontSize={["md", "lg", "xl"]} // Larger font for desktop
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
                Sign in
              </Button>

              <Stack pt={2}>
                <Text
                  fontSize={["sm", "md"]} // Larger font for desktop
                  color={useColorModeValue('gray.600', 'gray.400')}
                  textAlign="center"
                  fontFamily="Comfortaa, sans-serif"
                >
                  Forgot your password?{' '}
                  <Link 
                    color={'blue.400'}
                    _hover={{
                      color: 'blue.500',
                      textDecoration: 'none'
                    }}
                  >
                    Reset here
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}