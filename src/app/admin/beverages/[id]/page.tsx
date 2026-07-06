import { Metadata } from "next"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { MenuForm } from "../../menu/menu-form"

export const metadata: Metadata = { title: "Edit item · Beverages · Admin" }

export default async function EditBeverageItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <MenuForm
      mode="edit"
      kind="beverage"
      basePath="/admin/beverages"
      titleLabel="Beverages"
      id={id as Id<"menuItems">}
    />
  )
}
