"use client"

import { useState } from "react"
import type { SitePageDefinition } from "~/lib/site-content"
import { EditorShell } from "./editor-shell"
import {
  AboutPreview,
  ContactPreview,
  HomePreview,
  PageCanvas,
  StaffContentPreview,
} from "./page-previews"
import { StaffManager } from "./staff-manager"

export function PageContentEditor({ definition }: { definition: SitePageDefinition }) {
  return (
    <EditorShell definition={definition}>
      {definition.key === "our-staff" ? (
        <StaffEditor />
      ) : (
        <PageCanvas>
          {definition.key === "home" ? (
            <HomePreview />
          ) : definition.key === "about" ? (
            <AboutPreview />
          ) : (
            <ContactPreview />
          )}
        </PageCanvas>
      )}
    </EditorShell>
  )
}

function StaffEditor() {
  const [tab, setTab] = useState<"content" | "staff">("content")

  return (
    <div>
      <div className="sticky top-0 z-10 flex justify-center border-b border-amber/15 bg-charcoal/95 py-3 backdrop-blur">
        <div className="inline-flex rounded-full border border-amber/25 p-1">
          <TabButton active={tab === "content"} onClick={() => setTab("content")}>
            Page content
          </TabButton>
          <TabButton active={tab === "staff"} onClick={() => setTab("staff")}>
            Staff members
          </TabButton>
        </div>
      </div>

      {tab === "content" ? (
        <PageCanvas>
          <StaffContentPreview />
        </PageCanvas>
      ) : (
        <StaffManager />
      )}
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm transition-colors ${
        active ? "bg-amber text-charcoal" : "text-tan/70 hover:text-cream"
      }`}
    >
      {children}
    </button>
  )
}
