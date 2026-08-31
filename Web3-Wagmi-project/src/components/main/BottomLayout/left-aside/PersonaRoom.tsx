import Room from '../../../pages/Room'
import Collection from '../../../pages/Collection'
import Memories from '../../../pages/Memories'
import Community from '../../../pages/Community'
import Persona from '../../../pages/Persona'

type PersonaRoomProps = {
  currentPage?: string
}

function PersonaRoom({
  currentPage = 'Room',
}: PersonaRoomProps) {
  const renderPage = () => {
    switch (currentPage) {
      case 'Room':
        return <Room />

      case 'Collection':
        return <Collection />

      case 'Persona':
        return <Persona />

      case 'Memories':
        return <Memories />

      case 'Community':
        return <Community />

      default:
        return <Room />
    }
  }

  return (
    <div
      className="
        h-full

        rounded-2xl

        bg-[rgba(255,255,255,0.03)]
        backdrop-blur-md

        border
        border-white/8

        overflow-hidden
      "
    >
      {renderPage()}
    </div>
  )
}

export default PersonaRoom