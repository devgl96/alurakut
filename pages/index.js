import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
    </Box>
  );
}

export default function Home() {
  const githubUser = 'devgl96';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div 
          className="profileArea"
          style={{ 
            gridArea: "profileArea" 
          }}
        >
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div 
          className="welcomeArea"
          style={{ 
            gridArea: "welcomeArea" 
          }}
        >
          <Box>
            <h1 className="title">
              Bem-vindo(a)

              <OrkutNostalgicIconSet />
            </h1>
          </Box>
        </div>
        <div 
          className="profileRelationsArea"
          style={{ 
            gridArea: "profileRelationsArea" 
          }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 class="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            <h2 className="smallTitle">
              Comunidades
            </h2>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
