import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { VendingOptions, VendingChange } from "~/app/_components/data";

const VendingOptionsAtom = atomWithStorage("vending-options", VendingOptions);

const VendingChangeAtom = atomWithStorage("vending-change", VendingChange);

export const useVendingOptions = () => {
  const [vendingOption, setVendingOption] = useAtom(VendingOptionsAtom);

  return { vendingOption, setVendingOption };
};

export const useVendingChange = () => {
  const [vendingChange, setVendingChange] = useAtom(VendingChangeAtom);

  return { vendingChange, setVendingChange };
};
