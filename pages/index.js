import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { useState } from 'react';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
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

  const [comunidades, setComunidades] = useState([{
    id: '123456765432345',
    title: 'Eu odeio acordar cedo',
    image: 'https://i.pinimg.com/originals/27/e4/e6/27e4e623203b9682471e7e0f8ddbec3f.jpg'
  }]);

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
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

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString,
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              };

              const comunidadesAtualizadas = [...comunidades, comunidade];

              setComunidades(comunidadesAtualizadas);
            }}
            >
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div 
          className="profileRelationsArea"
          style={{ 
            gridArea: "profileRelationsArea" 
          }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li key={pessoa}>
                    <a href={`/users/${pessoa}`}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/users/${comunidade.title}`} key={comunidade.title}>
                      {/* <img src={`https://picsum.photos/200/300`} /> */}
                      {/* <img src={`https://source.unsplash.com/random`} /> */}
                      {/* <img src={`https://place-hold.it/300x500`} /> */}
                      <img src={comunidade.image} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
