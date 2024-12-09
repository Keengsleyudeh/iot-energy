import React, { useEffect, useState } from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Img,
} from "@chakra-ui/react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiOutlineLogout
} from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {signOut, getAuth, onAuthStateChanged} from 'firebase/auth'
import { getUserMeterStatus, getConfig } from "../../Utils/Firebase";
import Logo from "../../images/logo.svg";

export default function AppRoot(){
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const auth = getAuth();
  const navigator = useNavigate();
  const [loader, setLoader] = useState(true);

  async function handleLogout(){
    try{
        const logout = await signOut(auth);
    }catch(err){
        alert('Ops, something went wrong. Please try again');
    }
  }


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const userMeter = await getUserMeterStatus(user)
        if(userMeter){
          navigator("/dashboard")
        }else{
          // navigator("/dashboard/add-meter");
          navigator("/dashboard");
        }

  
        setLoader(false);
      }
    })
  }, [])
  

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Link to={"/dashboard"}>
                <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                  Dashboard
                </Button>
                </Link>
                
                <Button
                  w="full"
                  variant="solid"
                  colorScheme="brand"
                  leftIcon={<AiOutlineInbox />}
                >
                  Inbox
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  leftIcon={<BsFillCameraVideoFill />}
                >
                  Videos
                </Button>
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Img src={Logo} width={"40px"}/>
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>

            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
                Dashboard
              </Button>
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineSearch />
              </InputLeftElement>
              <Input type="tel" placeholder="Search..." />
            </InputGroup>

            <chakra.a
              p={3}
              color="gray.800"
              _dark={{ color: "inherit" }}
              rounded="sm"
              _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}
              cursor={'pointer'}
              onClick={handleLogout}
            >
              <AiOutlineLogout />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>

            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          </HStack>
        </Flex>

        <Box height="100vh" width="100vw" background="white" position={"fixed"} top={"0"} left={"0"} zIndex={"2"} display={(loader) ? "flex" : "none"} alignItems={"center"} justifyContent={"center"}>
          <Box className="loader"></Box>
        </Box>
      </chakra.header>
      <Outlet/>
    </React.Fragment>
  );
};
