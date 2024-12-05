import { useRouteError } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Box, Link } from '@chakra-ui/react'


export default function ErrorPage() {
    const error = useRouteError();
  console.error(error);

    return (
      <>
      <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyItems='center'>
        <Card align='center' size='sm' maxWidth='400px' margin='auto' p='4'>
            <CardHeader>
                <Text textAlign='center' margin='0 0 1rem' fontSize='4rem' lineHeight='1' color='#6c7a91' fontWeight='300'>404</Text>
                <Heading size='md' textAlign='center'> Oops… You just found an error page </Heading>
            </CardHeader>
            <CardBody>
                <Text textAlign='center'>We are sorry but the page you are looking for was not found</Text>
                <Text textAlign='center'>{error.statusText || error.message}</Text>
            </CardBody>
            <CardFooter>
                <Button colorScheme='blue' fontSize='0.875rem' gap='4px' verticalAlign='middle'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l14 0"></path><path d="M5 12l6 6"></path><path d="M5 12l6 -6"></path></svg>
                    Take me Home
                </Button>
            </CardFooter>
        </Card>
      </Box>
      </>
    );
  }