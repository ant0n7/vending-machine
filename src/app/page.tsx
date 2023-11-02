import { H1Header } from "./_components/atom/H1.Heading";
import InventoryView from "./_components/organisms/InventoryView";
import Vending from "./_components/organisms/Vending";

export default function Home() {
  return (
    <main className="grid h-screen w-full grid-cols-2">
      <div className="grid place-items-center bg-black/70">
        <div>
          <H1Header>Application Interface</H1Header>
          <Vending />
        </div>
      </div>
      <div className="grid place-items-center">
        <div>
          <H1Header>Inventory Interface</H1Header>
          <InventoryView />
        </div>
      </div>
    </main>
  );
}
