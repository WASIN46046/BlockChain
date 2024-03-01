import { useAccount } from "@components/hooks/web3";
import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";


const LINKS = [{
    href: "/marketplace",
    value: "ซื้อคอร์สเรียน",
  }, {
    href: "/marketplace/courses/owned",
    value: "คอร์สเรียนของฉัน" 
  }, {
    href: "/marketplace/courses/managed",
    value: "จัดการคอร์สเรียน",
    requireAdmin: true,
  }]
  

export default function Header() {
  const { account } = useAccount()
  return (
    <>
        <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
      <Breadcrumbs
          isAdmin={account.isAdmin}
          items={LINKS}
        />
      </div>
    </>
  )
}