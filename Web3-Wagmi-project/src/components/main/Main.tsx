import AICompanion from './AvatarCore/AICompanion'
import PersonaRoom from './BottomLayout/left-aside/PersonaRoom'
import SoulPanel from './BottomLayout/right-aside/SoulPanel'
import Collection from '../pages/Collection'
import Persona from '../pages/Persona'
import Memories from '../pages/Memories'
import Community from '../pages/Community'


type Props = {
  currentPage: string
}
function Main({ currentPage }: Props) {
  if (currentPage === 'Collection') return <Collection />
  if (currentPage === 'Persona') return <Persona />
  if (currentPage === 'Memories') return <Memories />
  if (currentPage === 'Community') return <Community />
  
  return (
    <div
      className="
        w-full
        h-full
        flex
        flex-col
        gap-5
        overflow-hidden
      "
    >
      {/* LUMI SPACE */}
      <div
        className="
          h-[55vh]
          shrink-0
        "
      >
        <AICompanion />
      </div>

      {/* BOTTOM */}
      <div
        className="
          flex-1
          grid
          grid-cols-[280px_1fr]
          gap-5
          min-h-0
        "
      >
        {/* LEFT */}
        <div className="min-h-0">
          <SoulPanel />
        </div>

        {/* RIGHT */}
        <div className="min-h-0">
          <PersonaRoom />
        </div>
      </div>
    </div>
  )
}

export default Main