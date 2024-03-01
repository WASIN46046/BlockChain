
import { useEthPrice } from "@components/hooks/useEthPrice";
import { Modal, Button } from "@components/ui/common";
import { useEffect, useState } from "react";

const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: ""
}

const _createFormState = (isDisabled = false, message =  "") => ({isDisabled, message})

const createFormState = ({price, email, confirmationEmail}, hasAgreedTOS, isNewPurchase) => {
  if (!price || Number(price) <= 0) {
    return _createFormState(true, "ราคาไม่ถูกต้อง")
  }
  if (isNewPurchase) {
    if (confirmationEmail.length === 0 || email.length === 0) {
      return _createFormState(true)
    }
    else if (email !== confirmationEmail) {
      return _createFormState(true, "Email ไม่ตรงกัน")
    }
  }
  if (!hasAgreedTOS) {
        return _createFormState(true, "คุณต้องยอมรับเงื่อนไขในการให้บริการเพื่อส่งแบบฟอร์ม")
  }

  return _createFormState()
}


export default function OrderModal({course, onClose, onSubmit, isNewPurchase}) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState(defaultOrder)
  const [enablePrice, setEnablePrice] = useState(false)
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false)
  const { eth } = useEthPrice()

  useEffect(() => {
    if (!!course) {
      setIsOpen(true)
      setOrder({
        ...defaultOrder,
        price: eth.perItem
      })
    }
  }, [course])
  const closeModal = () => {
    setIsOpen(false)
    setOrder(defaultOrder)
    setEnablePrice(false)
    setHasAgreedTOS(false)
    onClose()
  }

  const formState = createFormState(order, hasAgreedTOS, isNewPurchase)

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="mb-7 text-lg font-bold leading-6 text-gray-900" id="modal-title">
                {course.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enablePrice}
                        onChange={({target: {checked}}) => {
                          setOrder({
                            ...order,
                            price: checked ? order.price : eth.perItem
                          })
                          setEnablePrice(checked)
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>ต้องปรับราคา - เฉพาะเมื่อราคาไม่ถูกต้อง</span>
                  </div>
                </div>
                <input
                  disabled={!enablePrice}
                  value={order.price}
                  onChange={({target: {value}}) => {
                    if (isNaN(value)) { return; }
                    setOrder({
                      ...order,
                      price: value
                    })
                  }}
                  type="text"
                  name="price"
                  id="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-red-500 shadow-md focus:border-red-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-700">
                "ราคาจะถูกตรวจสอบในขณะทำการสั่งซื้อ. หากราคาต่ำกว่าอาจถูกปฏิเสธคำสั่งซื้อได้ (ยอมรับการเบี่ยงเบนของราคาได้ +- 2%)
                </p>
              </div>
              { isNewPurchase &&
                <>
                  <div className="mt-2 relative rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Email</label>
                    </div>
                    <input
                      onChange={({target: {value}}) => {
                        setOrder({
                          ...order,
                          email: value.trim()
                        })
                      }}
                      type="email"
                      name="email"
                      id="email"
                      className="w-80 focus:ring-red-500 shadow-md focus:border-red-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                      placeholder="x@y.com"
                    />
                    <p className="text-xs text-gray-700 mt-1">
                     กรุณากรอก Email ไม่เช่นนั้น คำสั่งซื้อจะไม่ถูกอนุมัติ เพราะพวกเราไม่ได้เก็บข้อมูลใดๆเอาไว้
                    </p>
                  </div>
                  <div className="my-2 relative rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">ใส่ Email อีกครั้ง </label>
                    </div>
                    <input
                      onChange={({target: {value}}) => {
                        setOrder({
                          ...order,
                          confirmationEmail: value.trim()
                        })
                      }}
                      type="email"
                      name="confirmationEmail"
                      id="confirmationEmail"
                      className="w-80 focus:ring-red-500 shadow-md focus:border-red-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md" placeholder="x@y.com" />
                  </div>
                </>
              }
              <div className="text-xs text-gray-700 flex mt-5">
                <label className="flex items-center mr-2">
                  <input
                    checked={hasAgreedTOS}
                    onChange={({target: {checked}}) => {
                      setHasAgreedTOS(checked)
                    }}
                    type="checkbox"
                    className="form-checkbox " />

                </label>
                <span>ฉันยอมรับ  &apos;เงื่อนไขการบริการ&apos; ฉันยอมรับว่าคำสั่งซื้อของฉันอาจถูกปฏิเสธในกรณีที่ข้อมูลที่ให้ไว้ข้างต้นไม่ถูกต้อง"</span>
              </div>
              { formState.message &&
                <div className="p-4 my-3 text-yellow-700 bg-yellow-200 rounded-lg text-sm">
                  { formState.message }
                </div>
              }
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <Button
            disabled={formState.isDisabled}
            onClick={() => {
              onSubmit(order)
          }}>
            Submit
          </Button>
          <Button
            onClick={closeModal}
            variant="red">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}