
import { Box, Flex, SimpleGrid, Stack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, chakra, useRadio } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getUserMeter, getUserMeterReadingCollectionRef, getConfig, computeEnergyUsage, getSortedEnergyUsage, powerToEnergy, db } from "../../Utils/Firebase";
import { Timestamp, collection, doc, limit, onSnapshot, orderBy, query, getDocs } from "firebase/firestore";
import { thousandSeperator } from "../../Utils/Utils";
import Banner from "../../components/banner";
import OverviewSection from "../../components/overview";
import Hero from "../../components/hero";
import DataDisplay from "../../components/dataDisplay";
import "../../index";
import { EnergyLineGraph } from "../../components/EnergyLineGraph";

export default function Home({ globalConfig }) {
  const [user, setUser] = useState({});
  const [userMeter, setUserMeter] = useState(null);
  const [userMeterDateCreated, setUserMeterDateCreated] = useState("");
  const [latestEnergyUsage, setlatestEnergyUsage] = useState(0.00);
  const [datedEneryUsage, setdatedEneryUsage] = useState(null);
  const [tariff, setTariff] = useState(0.00);
  const tariffRate = 200;
  const auth = getAuth();

  //chart
  const [chartIsLoading, setChartIsLoading] = useState(false);
  

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userMeter = await getUserMeter(user.uid);

        if (userMeter) {
          const userMeterCreated = userMeter.data().date_created;
          const ts = userMeterCreated * 1000;
          setUserMeter(userMeter);
          setUserMeterDateCreated(new Date(ts).toDateString());

          const unsub = onSnapshot(await getUserMeterReadingCollectionRef(user.uid), (query_snapshot) => {
            if (!query_snapshot.empty) {
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

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const metersRef = collection(db, 'Meter');
      
      const unsubscribe = onSnapshot(metersRef, async (meterSnapshot) => {
        try {
          const allMetersReadings = [];
          
          // Process meters sequentially to ensure no readings are missed
          for (const meterDoc of meterSnapshot.docs) {
            const readingsRef = collection(db, 'Meter', meterDoc.id, 'MeterReadings');
            const readingsQuery = query(
              readingsRef, 
              orderBy(`${meterDoc.id==="F2BdftS6GpAjEglZrzxf"? 'timestamp': 'uploadedAt'}`, 'desc'), 
              limit(15)
            );
            
            const readingsSnapshot = await getDocs(readingsQuery);
            
            if (!readingsSnapshot.empty) {
              const meterReadings = readingsSnapshot.docs.map(doc => ({
                id: doc.id,
                meterId: meterDoc.id,
                ...doc.data()
              }));
              
              allMetersReadings.push(meterReadings);
            }
          }
          
          console.log('Total meters with readings:', allMetersReadings.length);
          setData(allMetersReadings);
          
        } catch (error) {
          console.error('Error fetching meter readings:', error);
        }
      });
  
      return () => unsubscribe();
    };
  
    fetchData();
  }, []);

  console.log(data);
  if (data.length === 0) return null;


  const {
    active_energy: regionOneEnergy,
  } = data[0][0];

  const {
    active_energy: regionOneEnergy2,
  } = data[0][1];

  const {
    energy: regionTwoEnergy,
  } = data[1][0];

  const {
    energy: regionTwoEnergy2,
  } = data[1][1];

  const {
    energy: regionThreeEnergy,
  } = data[2][0];

  const {
    energy: regionThreeEnergy2,
  } = data[2][1];

  const {
    energy: regionFourEnergy,
  } = data[3][0];

  const {
    energy: regionFourEnergy2,
  } = data[3][1];

  function calculatePercentageChange(oldValue, newValue) {
    // Input validation
    if (typeof oldValue !== 'number' || typeof newValue !== 'number') {
        throw new Error('Both inputs must be numbers');
    }

    // Handle edge cases
    if (oldValue === 0) {
        if (newValue === 0) return 0.00;
        return newValue > 0 ? 100 : -100;
    }

    try {
        // Calculate percentage difference
        const difference = newValue - oldValue;
        const percentageChange = (difference / oldValue) * 100;
        
        // Round to 2 decimal places
        return Math.round(percentageChange * 100) / 100;
    } catch (error) {
        console.error('Error calculating percentage change:', error);
        return 0;
    }
}


const regionOneChange = calculatePercentageChange(regionOneEnergy2, regionOneEnergy);
const regionTwoChange = calculatePercentageChange(regionTwoEnergy2, regionTwoEnergy);
const regionThreeChange = calculatePercentageChange(regionThreeEnergy2, regionThreeEnergy);
const regionFourChange = calculatePercentageChange(regionFourEnergy2, regionFourEnergy);

  async function handleShowData(date) {
    setChartIsLoading(true);
    const energyUsageData = await computeEnergyUsage(getSortedEnergyUsage(date, userMeter.id), tariffRate);
    setdatedEneryUsage(energyUsageData);
    setChartIsLoading(false);
  }

  const StatCard = ({ label, value, unit = "", updateText, change }) => (
    <Stat
      p={["4", "6"]}
      borderRadius="xl"
      bg="white"
      boxShadow="0px 4px 20px rgba(0, 0, 0, 0.05)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
      }}
      fontSize={["sm", "md"]} 
      color="gray.600" 
      fontWeight="medium"
      fontFamily="Comfortaa, sans-serif"
    >
      <StatLabel
        fontSize={["sm", "md"]}
        color="gray.600"
        fontWeight="500"
        mb={2}
        // fontFamily="Comfortaa, sans-serif"
      >
        {label}
      </StatLabel>

      <Flex
        alignItems="flex-end"
        gap={["2", "3"]}
      >
        <Box>
          <StatNumber
            fontSize={["xl", "2xl"]}
            fontWeight="700"
            color="gray.800"
          >
            {value} {unit}
          </StatNumber>
          <StatHelpText
            fontSize={["xs", "sm"]}
            color="gray.500"
            mt={1}
          >
            {updateText}
          </StatHelpText>
        </Box>

        {(change>=0 || change<0) && (
          <StatHelpText
            display="flex"
            alignItems="center"
            color={change >= 0 ? "green.500" : "red.500"}
          >
            <StatArrow type={(Math.floor(change) >= 0) ? "increase" : "decrease"} />
            {Math.abs(change)}%
          </StatHelpText>
        )}
      </Flex>
    </Stat>
  );

  return (
    <Box bg="gray.50" minH="100vh">
      <Hero displayName={user.displayName} />

      {/* Stats Dashboard */}
      <Box
        width="full"
        px={[4, 6, 8]}
        py={[8, 12]}
      >
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={[4, 6, 8]}
          mx="auto"
          maxW="1440px"
        >

          <StatCard
            label="Region 1"
            value={Math.round(regionOneEnergy * 100) / 100}
            unit="W"
            updateText="updated every 1min"
            change={regionOneChange}
          />

          <StatCard
            label="Region 2"
            value={Math.round(regionTwoEnergy * 100) / 100}
            unit="W"
            updateText="updated every 1min"
            change={regionTwoChange}
          />

          <StatCard
            label="Region 3"
            value={Math.round(regionThreeEnergy * 100) / 100}
            unit="W"
            updateText="updated every 1min"
            change={regionThreeChange}
          />

          <StatCard
            label="Region 4"
            value={Math.round(regionFourEnergy * 100) / 100}
            unit="W"
            updateText="updated every 1min"
            change={regionFourChange}
          />

        </SimpleGrid>
      </Box>

      {/* Data Visualization Section */}
      <Box
        width="full"
        px={[4, 6, 8]}
        py={[8, 12]}
      >
        <EnergyLineGraph data={data} />
      </Box>
      <Box
        px={[4, 6, 8]}
        pb={8}
        maxW="1440px"
        mx="auto"
      >
        <Banner
          handleShowData={handleShowData}
          chartIsLoading={chartIsLoading}
        />
        <Box mt={8}>
          <DataDisplay data={datedEneryUsage} />
        </Box>
        <Box mt={8}>
          <OverviewSection />
        </Box>
      </Box>
    </Box>
  );
}