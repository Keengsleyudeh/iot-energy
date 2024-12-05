import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    Alert,
    useColorModeValue,
  } from '@chakra-ui/react';
import { addMeterToUser, deleteActivationCode, getActivationCodeInfo, getUserMeter } from '../../Utils/Firebase';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

  
  export default function AddMeter() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const auth = getAuth();
    const navigator = useNavigate();

    async function handleClick(){
      setIsLoading(true);
      onAuthStateChanged(auth, async (user) => {
        if(user){
          const meterActivationCode = await getActivationCodeInfo(code);

          if(user.uid === meterActivationCode.user_id){
            //Do Meter Activation operation
            const userMeter = await addMeterToUser(meterActivationCode.meter_id, meterActivationCode.user_id);
            await deleteActivationCode(code);

            
            alert("Meter added successfully");
            navigator("/dashboard");
          }else{
            setIsLoading(false);
            setError("The activation key you provided is invalid");
          }

        }
      })
    }

    return (
      <Flex
        minH={'60vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Add Meter to Proceed
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You must have been given an activation code for your meter, kindly add it below to continue.
          </Text>
          <Alert status='error' style={{display: (error) ? 'block' : 'none'}}>
              {error}
            </Alert>
          <FormControl id="text">
            <Input
              placeholder="ACT-XXX"
              _placeholder={{ color: 'gray.500' }}
              type={"text"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              isLoading={isLoading}
              onClick={handleClick}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Add Meter
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }