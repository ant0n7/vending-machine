import { H1Header } from "./_components/atom/H1.Heading";
import ChangeManagement from "./_components/organisms/ChangeManagement";
import InventoryView from "./_components/organisms/InventoryView";
import Vending from "./_components/organisms/Vending";

export default function Home() {
  return (
    <main className="grid min-h-screen w-full grid-cols-2 [&>*]:py-10">
      <div className="grid place-items-center bg-black/70">
        <div className="w-full max-w-md">
          <H1Header>Vending Machine</H1Header>
          <Vending />
        </div>
      </div>
      <div className="grid place-items-center">
        <div className="w-full">
          <H1Header className="text-base">Manage Inventory</H1Header>
          <div className="mx-auto w-full max-w-md space-y-4 text-sm">
            <InventoryView />
            <div>
              <H1Header className="text-base">Manage Change</H1Header>
              <ChangeManagement />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
