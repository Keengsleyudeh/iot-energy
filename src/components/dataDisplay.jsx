import { Box, Img, Container, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import {LineChart} from "@saas-ui/charts"
import noData from "../images/no-data.svg";

function DataDisplay({ data }) {

  function valueFormatter(value){
    return value + " kwh"
  }

  if (data) {
    return(
    <Box width={"100%"}>
        <Container
            rounded="lg"
            boxShadow="md"
            maxW={"80%"}
            p={"20px"}
            display={"flex"}
            alignItems={{ base: "flex-start", md: "center" }}
            justifyContent="space-between"
            flexDirection={"column"}
            gap={"20px"}
        >
            <Card width={"100%"}>
            <CardHeader pb="0">
                <Heading as="h4" fontWeight="medium" size="md">
                {data.heading}
                </Heading>
            </CardHeader>
            <CardBody>
                <LineChart
                data={data.data}
                categories={["energy"]}
                yAxisWidth={100}
                height="400px"
                colors={["primary"]}
                index="hour"
                valueFormatter={valueFormatter}
                />
            </CardBody>
            </Card>
        </Container>
    </Box>
    )
    
  } else {
    return (
      <Box width={"100%"}>
        <Container
          rounded="lg"
          boxShadow="md"
          maxW={"80%"}
          p={"20px"}
          display={"flex"}
          alignItems={{ base: "flex-start", md: "center" }}
          justifyContent="space-between"
          flexDirection={"column"}
          gap={"20px"}
        >
          <Img src={noData} width={"200px"} />
          <Heading
            fontSize="2xl"
            marginBottom={"20px"}
            lineHeight={1.2}
            fontWeight="bold"
          >
            Ops Nothing to show here!
          </Heading>
        </Container>
      </Box>
    );
  }
}

export default DataDisplay;
