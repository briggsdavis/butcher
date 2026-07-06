import { Metadata } from "next"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { MenuForm } from "../../menu/menu-form"

export const metadata: Metadata = { title: "Edit item · Food · Admin" }

export default async function EditFoodItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <MenuForm
      mode="edit"
      kind="food"
      basePath="/admin/food"
      titleLabel="Food"
      id={id as Id<"menuItems">}
    />
  )
}
