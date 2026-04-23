"use client"

import { useState } from "react"
import { Login } from "~/components/admin/login"
import { Sidebar, type AdminTab } from "~/components/admin/sidebar"
import { AboutEditor } from "~/components/admin/editors/about-editor"
import { BeveragesEditor } from "~/components/admin/editors/beverages-editor"
import { FoodEditor } from "~/components/admin/editors/food-editor"
import { GlobalEditor } from "~/components/admin/editors/global-editor"
import { HomeEditor } from "~/components/admin/editors/home-editor"
import { SpiritsEditor } from "~/components/admin/editors/spirits-editor"
import { StaffEditor } from "~/components/admin/editors/staff-editor"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>("home")

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />
  }

  return (
    // Fixed overlay covers the restaurant site's Nav + Footer
    <div className="fixed inset-0 z-[500] flex overflow-hidden bg-[#f2e8d8] font-sans">
      <Sidebar
        active={activeTab}
        onChange={setActiveTab}
        onSignOut={() => setAuthenticated(false)}
      />

      {/* Main content area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {activeTab === "home" && <HomeEditor />}
          {activeTab === "about" && <AboutEditor />}
          {activeTab === "staff" && <StaffEditor />}
          {activeTab === "food" && <FoodEditor />}
          {activeTab === "beverages" && <BeveragesEditor />}
          {activeTab === "spirits" && <SpiritsEditor />}
          {activeTab === "global" && <GlobalEditor />}
        </div>
      </main>
    </div>
  )
}
