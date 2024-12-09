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
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { addMeterToUser, createUser, getFirstMeterId } from '../../Utils/Firebase';
import { useNavigate } from 'react-router-dom';
  
  
  export default function Signup() {
    const flexBg = useColorModeValue('gray.50', 'gray.800');
    const boxBg = useColorModeValue('white', 'gray.700');
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
        
        console.log(meterId.id)

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
        bg={flexBg}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={boxBg}
            boxShadow={'lg'}
            p={8}>
            
            <Stack spacing={4}>
            <Alert status='error' style={{display: (error) ? 'block' : 'none'}}>
              {error}
            </Alert>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={fName} onChange={(e) => setfName(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={lName} onChange={(e) => setlName(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  onClick={handleSubmit}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link href='/auth/signin' color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }