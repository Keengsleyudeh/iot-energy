import { Box, Flex, SimpleGrid, Stack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, chakra, useRadio } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getUserMeter, getUserMeterReadingCollectionRef,getConfig, computeEnergyUsage, getSortedEnergyUsage, powerToEnergy } from "../../Utils/Firebase";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { thousandSeperator } from "../../Utils/Utils";
import Banner from "../../components/banner";
import OverviewSection from "../../components/overview";
import Hero from "../../components/hero";
import DataDisplay from "../../components/dataDisplay";

export default function Home({globalConfig}){
  const [user, setUser] = useState({});
  const [userMeter, setUserMeter] = useState(null);
  const [userMeterDateCreated, setUserMeterDateCreated] = useState("");
  const [latestEnergyUsage, setlatestEnergyUsage] = useState(0.00);
  const [datedEneryUsage, setdatedEneryUsage] = useState(null);
  const [tariff, setTariff] = useState(0.00);
  const tariffRate = 50
  const auth = getAuth();

  //chart
  const [chartIsLoading, setChartIsLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        setUser(user);
        const userMeter = await getUserMeter(user.uid);

        if(userMeter){
          const userMeterCreated = userMeter.data().date_created;
          const ts = userMeterCreated * 1000;
          setUserMeter(userMeter);
          setUserMeterDateCreated(new Date(ts).toDateString());
        

          const unsub = onSnapshot(await getUserMeterReadingCollectionRef(user.uid), (query_snapshot) => {
            if(!query_snapshot.empty){
              let latest_data = query_snapshot.docs.at(-1).data();
              computeEnergyUsage(getSortedEnergyUsage(null, userMeter.id), tariffRate)
              .then((finalSortedData) => {
                console.log(finalSortedData, tariffRate);
                setlatestEnergyUsage(Number(finalSortedData.totalEnergy).toFixed(2));
                setTariff(Number(finalSortedData.totalTariff).toFixed(2));
              })
            }
          });          
        }

      }
    })
  }, [])

  async function handleShowData(date){
    setChartIsLoading(true);
    const energyUsageData = await computeEnergyUsage(getSortedEnergyUsage(date, userMeter.id), tariffRate);
    setdatedEneryUsage(energyUsageData);
    setChartIsLoading(false);
  }


    return (
        <>


          <Hero displayName={user.displayName} />

          {/* Stats */}
          <Box
            width={"100%"}
          >
            <Flex
              m={"auto"}
              w={"80%"}
              p={"50px 0px"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"20px"}
            >

<Stat
                boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
                p={"4"}
                borderRadius={"10px"}
                gap={"20px"}
              >
                <StatLabel fontSize={""}>Meter No</StatLabel>
                
                <Flex
                  alignItems={"flex-end"}
                  gap={"10px"}
                >
                  <Box>
                    <StatNumber fontSize={"x-large"}>{userMeter ? userMeter.data().meter_no : "Meter"}</StatNumber>
                    <StatHelpText>{userMeterDateCreated}</StatHelpText>
                  </Box>
                  

                  <StatHelpText>
                    <StatArrow type={"increase"} />
                    Activated
                  </StatHelpText>
                </Flex>
                
              </Stat>


              <Stat
                boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
                p={"4"}
                borderRadius={"10px"}
                gap={"20px"}
              >
                <StatLabel fontSize={""}>Current Rate</StatLabel>
                
                <Flex
                  alignItems={"flex-end"}
                  gap={"10px"}
                >
                  <Box>
                    <StatNumber fontSize={"x-large"}>₦ 50/kwh</StatNumber>
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                  </Box>
                  

                  <StatHelpText>
                    <StatArrow type={"increase"} />
                    23.36%
                  </StatHelpText>
                </Flex>
                
              </Stat>

              <Stat
                boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
                p={"4"}
                borderRadius={"10px"}
                gap={"20px"}
              >
                <StatLabel fontSize={""}>Energy Usage</StatLabel>
                
                <Flex
                  alignItems={"flex-end"}
                  gap={"10px"}
                >
                  <Box>
                    <StatNumber fontSize={"x-large"}>{latestEnergyUsage} KWh</StatNumber>
                    <StatHelpText>updated every 1min</StatHelpText>
                  </Box>
                  

                  <StatHelpText>
                    <StatArrow type={"decrease"} />
                    23.36%
                  </StatHelpText>
                </Flex>
                
              </Stat>

              <Stat
                boxShadow={"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"}
                p={"4"}
                borderRadius={"10px"}
                gap={"20px"}
              >
                <StatLabel fontSize={""}>Tariff</StatLabel>
                
                <Flex
                  alignItems={"flex-end"}
                  gap={"10px"}
                >
                  <Box>
                    <StatNumber fontSize={"x-large"}>₦ {tariff}</StatNumber>
                    <StatHelpText>Updated every 1min</StatHelpText>
                  </Box>
                  

                  <StatHelpText>
                    <StatArrow type={"decrease"} />
                    23.36%
                  </StatHelpText>
                </Flex>
                
              </Stat>
            </Flex>
          </Box>
          

          <Banner handleShowData={handleShowData} chartIsLoading={chartIsLoading}/>
          <DataDisplay data={datedEneryUsage}/>
          <OverviewSection />
        </>
    )
}