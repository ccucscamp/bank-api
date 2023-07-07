
import { Flex, Box, Container, Heading } from '@chakra-ui/react';
import FlipMove from 'react-flip-move';
import TeamCard from '../components/TeamCard';
import useTeams from '../hooks/useTeams';

function App() {
  const { teams, diff } = useTeams(5000);

  // Object.entries(diff)

  return (
    <Container marginTop={10}>
      <Flex direction='column' justify='space-betweens'>
        <Box marginBottom={10}>
          <Heading textAlign='center'>找尋我的200億 - 小隊存款</Heading>
        </Box>
        <Box>
          <Flex direction='column'>
            <FlipMove>
              {teams.sort((a, b) => b.money - a.money).map((v, i) => {
                return <TeamCard
                  key={v.id} name={v.name} money={v.money} diff={0}
                  marginBottom={2} size='sm'
                />
              })}
            </FlipMove>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
