"use client"

export type AdminTab =
  | "home"
  | "about"
  | "staff"
  | "food"
  | "beverages"
  | "spirits"
  | "global"

const TABS: { id: AdminTab; label: string; description: string }[] = [
  { id: "home", label: "Home", description: "Hero, story, menu, gallery" },
  { id: "about", label: "About", description: "Story, values, team" },
  { id: "staff", label: "Staff", description: "Add, edit, remove members" },
  { id: "food", label: "Food", description: "Menu sections & items" },
  { id: "beverages", label: "Beverages", description: "Cocktails, wine, more" },
  { id: "spirits", label: "Spirits", description: "Whiskey, gin, rum & more" },
  { id: "global", label: "Global", description: "Nav, footer, site identity" },
]

interface Props {
  active: AdminTab
  onChange: (tab: AdminTab) => void
  onSignOut: () => void
}

export function Sidebar({ active, onChange, onSignOut }: Props) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-black/[0.08] bg-white">
      {/* Header */}
      <div className="border-b border-black/[0.08] px-5 py-5">
        <p className="text-[9px] font-semibold tracking-[0.3em] text-black/30 uppercase">
          Admin
        </p>
        <p className="mt-1 text-sm leading-tight font-semibold text-black">
          Butcher & the Rye
        </p>
      </div>

      {/* Nav label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[9px] font-semibold tracking-[0.25em] text-black/25 uppercase">
          Pages
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-4">
        {TABS.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex w-full flex-col items-start px-3 py-3 text-left transition-colors ${
                isActive
                  ? "bg-black text-white"
                  : "text-black/60 hover:bg-black/[0.04] hover:text-black"
              }`}
            >
              <span className="text-sm leading-none font-medium">
                {tab.label}
              </span>
              <span
                className={`mt-1 text-[10px] leading-none transition-colors ${
                  isActive ? "text-white/50" : "text-black/30"
                }`}
              >
                {tab.description}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-black/[0.08] p-4">
        <button
          onClick={onSignOut}
          className="w-full py-2 text-[10px] tracking-widest text-black/30 uppercase transition-colors hover:text-black"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
