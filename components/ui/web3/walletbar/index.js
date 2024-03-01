import { useWalletInfo } from "@components/hooks/web3"
import { useWeb3 } from "@components/providers"
import { Button } from "@components/ui/common"



export default function WalletBar() {
  const { requireInstall } = useWeb3()
  const { account, network } = useWalletInfo()



    return (
      <section className="text-white bg-red-600 rounded-lg">
      <div className="p-8">
      <h1 className="text-base xs:text-xl break-words">สวัสดี บัญชีของคุณคือ {account.data}</h1>
        <h2 className="subtitle mb-5 text-sm xs:text-base">ฉันหวังวา่าคุณจะยินดีกับคอร์สเรียนของเรา</h2>
          <div className="flex justify-between items-center">
            <div className="sm:flex sm:justify-center lg:justify-start">
            <Button
              className="mr-2 text-sm xs:text-lg p-2"
              variant="white">
              เรียนรู้วิธีการสั่งซื้อ
            </Button>
            </div>
            <div>
            { network.hasInitialResponse && !network.isSupported &&
              <div className="bg-red-400 p-4 rounded-lg">
                <div>เชื่อมต่อผิดพลาด</div>
                <div>
                  Connect to: {` `}
                  <strong className="text-2xl">
                    {network.target}
                  </strong>
                </div>
              </div>
            }
              { requireInstall &&
              <div className="bg-yellow-500 p-4 rounded-lg">
                ไม่สามารถเชื่อมต่อผ่านเครือข่ายได้. กรุณาติดตั้ง Metamask.
              </div>
            }
            {network.data &&
              <div>
                <span>กำลังใช้งาน </span>
                <strong className="text-2xl">{network.data}</strong>
              </div>
            }            </div>
          </div>
        </div>
      </section>
    )
  }
  