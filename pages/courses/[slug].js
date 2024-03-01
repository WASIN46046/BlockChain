import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Message, Modal } from "@components/ui/common";
import { useWeb3 } from "@components/providers";
import {
  CourseHero,
  Curriculum,
Keypoints
} from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({course}) {
  const { isLoading } = useWeb3()
  const { account } = useAccount()
  const { ownedCourse } = useOwnedCourse(course, account.data)
  const courseState = ownedCourse.data?.state
  // const courseState = "deactivated"

   const isLocked =
   !courseState ||
   courseState === "purchased" ||
   courseState === "deactivated"
   

  return (
    <>
     
      <div className="py-4">
      <CourseHero
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
          />
      </div>
      <Keypoints
        points={course.wsl}
      />
        { courseState &&
        <div className="max-w-5xl mx-auto">
          { courseState === "purchased" &&
            <Message type="warning">
              หลักสูตรถูกซื้อแล้วและกำลังรอการเปิดใช้งาน. กระบวนการนี้อาจใช้เวลาสูงสุดถึง 24 ชั่วโมง
              <i className="block font-normal">หากมีคำถามใด ๆ กรุณาติดต่อที่ WASIN_JALUSPIKULTHIP@gmail.com</i>
            </Message>
          }
          { courseState === "activated" &&
            <Message type="success">
              เราขอให้คุณมีความสุขในการชมหลักสูตร
            </Message>
          }
          { courseState === "deactivated" &&
            <Message type="danger">
             หลักสูตรได้ถูกปิดการใช้งานเนื่องจากข้อมูลการซื้อที่ไม่ถูกต้อง. 
             ฟังก์ชันการชมหลักสูตรได้ถูกปิดใช้งานชั่วคราว
              <i className="block font-normal">กรุณาติดต่อที่ WASIN_JALUSPIKULTHIP@gmail.com</i>
            </Message>
          }
        </div>
      }
      <Curriculum
                isLoading={isLoading}
               locked={isLocked}
               courseState={courseState}
      />
      <Modal />
    </>
  )
}
export function getStaticPaths() {
    const { data } = getAllCourses()
  
    return {
      paths: data.map(c => ({
        params: {
          slug: c.slug
        }
      })),
      fallback: false
    }
  }
  
  
  export function getStaticProps({params}) {
    const { data } = getAllCourses()
    const course = data.filter(c => c.slug === params.slug)[0]
  
    return {
      props: {
        course
      }
    }
  }
  

Course.Layout = BaseLayout