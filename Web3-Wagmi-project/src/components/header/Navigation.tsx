type Props = {
  vertical?: boolean
  onNavigate?: (page: string) => void
  onMobileNavigate?: () => void
}

const LINKS = ['Room', 'Collection', 'Persona', 'Memories', 'Community']

function Navigation({ vertical = false, onNavigate, onMobileNavigate }: Props) {
  const handleClick = (label: string) => {
    onNavigate?.(label)
    onMobileNavigate?.()
  }

  return (
    <nav className={`${vertical ? 'flex flex-col gap-3' : 'flex items-center gap-6'}`}>
      {LINKS.map((label) => (
        <button
          key={label}
          onClick={() => handleClick(label)}
          className="text-[#b8b8d0] hover:text-[#f9a8d4] text-sm md:text-base px-2 transition font-semibold"
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

export default Navigation