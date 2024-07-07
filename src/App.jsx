import { useEffect, useState } from "react"
import styled from "styled-components"
import GlobalStyles from "./components/GlobalStyles"
import Cabecera from "./components/Cabecera"
import BarraLateral from "./components/BarraLateral"
import Banner from "./components/Banner"
import banner from "./assets/banner.png"
import Galeria from "./components/Galeria"
import ModalZoom from "./components/ModalZoom"
import Pie from "./components/Pie"
import Cargando from "./components/Cargando"

const FondoGradiente = styled.div`
background: linear-gradient(175deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
width:100%;
min-height:100vh;
`
const AppContainer = styled.div`
  width:1280px;
  max-width:100%;
margin: 0 auto;
`
const MainContainer = styled.main`
  display: flex;
  gap:24px;
`
const ContenidoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`


const App = () => {

  const [consulta, setConsulta] = useState('')
  const [fotosDeGaleria, setFotosDeGaleria] = useState([])
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null)
  const [cargando, setCargando] = useState(true)

  const alAlternarFavorito = (foto) => {

    if (foto.id === fotoSeleccionada?.id) {
      setFotoSeleccionada({
        ...fotoSeleccionada,
        favorita: !fotoSeleccionada.favorita
      })

    }

    setFotosDeGaleria(fotosDeGaleria.map(fotoDeGaleria => {
      return {
        ...fotoDeGaleria,
        favorita: fotoDeGaleria.id === foto.id ? !foto.favorita : fotoDeGaleria.favorita
      }
    }))
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:3000/fotos")
        .then((response) => response.json())
        .then((data) => {
          setFotosDeGaleria(data);
          setCargando(false);
        });
    }, 5000);
  }, []);

  if (cargando) {
    return <Cargando />;
  }

  return (
    <>
      <FondoGradiente>
        <GlobalStyles />
        <AppContainer>
          <Cabecera setConsulta={setConsulta} />
          <MainContainer>
            <BarraLateral />
            <ContenidoGaleria>
              <Banner texto="La galería más completa de fotos del espacio" backgroundImage={banner} />
              {
                <Galeria alSeleccionarFoto={foto => setFotoSeleccionada(foto)}
                fotos={fotosDeGaleria}
                alAlternarFavorito={alAlternarFavorito} 
                consulta={consulta}/>
              }
            </ContenidoGaleria>
          </MainContainer>
        </AppContainer>
        <ModalZoom foto={fotoSeleccionada}
          alCerrar={() => setFotoSeleccionada(null)}
          alAlternarFavorito={alAlternarFavorito} />
        <Pie/>
      </FondoGradiente>
    </>
  )
}

export default App