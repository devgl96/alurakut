import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { useEffect, useState } from 'react';

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
};

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>

      <ul>
          {props.items.map((pessoa, index) => {
            if(index <= 5) {
              return (
                <li key={`${index}+${pessoa.login}`}>
                  <a href={pessoa.html_url}>
                    <img src={pessoa.avatar_url} />
                    <span>{pessoa.login}</span>
                  </a>
                </li>
              )
            }
          })}
      </ul>
    </ProfileRelationsBoxWrapper>
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

  const [comunidades, setComunidades] = useState([]);

  const [seguidores, setSeguidores] = useState([]);

  // Catch the array of data from github
  useEffect(() => {
    // GET
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((resServer) => {
        return resServer.json();
      })
      .then((resComplete) => {
        setSeguidores(resComplete);
      });

      // API GraphQL
      fetch(`https://graphql.datocms.com/`, {
        method: 'POST',
        headers: {
          'Authorization': 'e0a3d123c30e0e6dbac9d0d772465d',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "query": `query {
            allCommunities {
              id
              title
              imageUrl
              creatorSlug
            }
          }`
        })
      }).then((res) => res.json())
      .then((resComplete) => {
        const allCommunities = resComplete.data.allCommunities;
        setComunidades(allCommunities);
      });
  }, [])

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
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser
              };

              // POST 
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade),
              }).then(async (response) => {
                const dados = await response.json();
                // console.log(dados);
                const comunidade = dados.registroCriado;

                const comunidadesAtualizadas = [...comunidades, comunidade];
  
                setComunidades(comunidadesAtualizadas);
              })

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
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>
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
                    <a href={`/comunidades/${comunidade.id}`}>
                      {/* <img src={`https://picsum.photos/200/300`} /> */}
                      {/* <img src={`https://source.unsplash.com/random`} /> */}
                      {/* <img src={`https://place-hold.it/300x500`} /> */}
                      <img src={comunidade.imageUrl} />
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
