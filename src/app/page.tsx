import Vending from "./_components/organisms/Vending";

export default function Home() {
  return (
    <main className="grid h-screen w-full grid-cols-2">
      <div className="grid place-items-center bg-black/70">
        <div>
          <h1 className="mb-4 text-center text-2xl font-bold">
            Application Interface
          </h1>
          <Vending />
        </div>
      </div>
    </main>
  );
}
